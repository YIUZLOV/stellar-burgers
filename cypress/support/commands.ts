/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

declare global {
  namespace Cypress {
    interface Chainable {
      openModalByText(text: string): Chainable<Element>;
      closeModalByIcon(): Chainable<Element>;
      closeModalByOverlay(): Chainable<Element>;
    }
  }
}

// Команда для открытия модального окна
Cypress.Commands.add('openModalByText', (text: string) => {
  cy.contains(text).click();
  cy.contains('Детали ингредиента').should('exist');
});

// Команда для закрытия модального окна через иконку закрыть
Cypress.Commands.add('closeModalByIcon', () => {
  cy.get('[data-cy=modal-close]').click();
  cy.contains('Детали ингредиента').should('not.exist');
});

// Команда для закрытия модального окна через клик на overlay
Cypress.Commands.add('closeModalByOverlay', () => {
  cy.get('[data-cy=modal-overlay]').click('left', { force: true });
  cy.contains('Детали ингредиента').should('not.exist');
});

//Модальное окно заказа

Cypress.Commands.add('setupIntercepts', () => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'fetchIngredients'
  );
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');
});

Cypress.Commands.add('prepareEnvironment', () => {
  window.localStorage.setItem(
    'refreshToken',
    JSON.stringify('testRefreshToken')
  );
  cy.setCookie('accessToken', 'testAccessToken');
  cy.visit('/');
  cy.wait('@fetchIngredients');
});

Cypress.Commands.add('setAliasForIngredients', () => {
  cy.get('[data-cy=bun-ingredients]').as('bunIngredients');
  cy.get('[data-cy=mains-ingredients]').as('mainsIngredients');
  cy.get('[data-cy=constructor-ingredients]').as('constructorIngredients');
  cy.get('[data-cy=sauces-ingredients]').as('saucesIngredients');
  cy.get('[data-cy=constructor]').as('constructor');
});

Cypress.Commands.add('placeOrder', () => {
  cy.get('@bunIngredients').contains('Добавить').click();
  cy.get('@mainsIngredients').contains('Добавить').click();
  cy.get('@saucesIngredients').contains('Добавить').click();
  cy.get('[data-cy=price] button').click();
});

Cypress.Commands.add('validateOrderAndCloseModal', () => {
  cy.wait('@postOrder').then(() => {
    cy.get('@postOrder')
      .its('response.body.order.ingredients')
      .should('deep.equal', [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0940',
        '643d69a5c3f7b9001cfa0947',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0948',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa094a',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ]);
    cy.get('[data-cy=order-number]').contains('45197').should('exist');
  });

  cy.get('[data-cy=modal-close]').click();
  cy.get('[data-cy=order-number]').should('not.exist');
});

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  originalFn(url, {
    ...options,
    onBeforeLoad: (win) => {
      win.localStorage.setItem(
        'refreshToken',
        JSON.stringify('testRefreshToken')
      );
      win.document.cookie = 'accessToken=testAccessToken';
    }
  });
});