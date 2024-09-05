import { expect, test } from '@jest/globals';
import { rootReducer } from '../src/services/store';
import store from '../src/services/store';

describe('Тестирование rootReducer', () => {
  test('Тест инициализации стора', () => {
    const testAction = { type: 'UNKNOWN_ACTION' };
    const initialState = rootReducer(undefined, testAction);
    expect(initialState).toEqual(store.getState());
  });
});
