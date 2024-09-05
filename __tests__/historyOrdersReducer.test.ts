import {
  TStateOrdersHistory,
  ordersHistory,
  historyOrdersSlice
} from '../src/slices/historyOrders';

const initialState: TStateOrdersHistory = {
  orders: [],
  loading: false,
  error: null
};

const testOrders = {
  success: true,
  orders: [
    {
      _id: '1',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa093e'
      ],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-09-02T13:46:25.234Z',
      updatedAt: '2024-09-02T13:46:25.914Z',
      number: 1
    },
    {
      _id: '2',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093f',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0949',
        '643d69a5c3f7b9001cfa0945',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Антарианский краторный бессмертный минеральный экзо-плантаго био-марсианский бургер',
      createdAt: '2024-09-02T07:36:55.648Z',
      updatedAt: '2024-09-02T07:36:56.126Z',
      number: 2
    },
    {
      _id: '3',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa093c'
      ],
      status: 'done',
      name: 'Краторный space бургер',
      createdAt: '2024-09-02T07:34:44.831Z',
      updatedAt: '2024-09-02T07:34:45.280Z',
      number: 3
    }
  ],
  total: 3,
  totalToday: 3
};

describe('Тестирование слайса historyOrdersSlice', () => {
  it('Тест состояния загрузки', () => {
    const actualState = historyOrdersSlice.reducer(
      {
        ...initialState,
        error: 'Test err'
      },
      ordersHistory.pending('')
    );
    expect(actualState).toEqual({
      orders: [],
      error: null,
      loading: true
    });
  });

  it('Тест получения истории заказов', () => {
    const actualState = historyOrdersSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      ordersHistory.fulfilled(testOrders.orders, '')
    );

    expect(actualState).toEqual({
      orders: testOrders.orders,
      error: null,
      loading: false
    });
  });

  it('Тест получения ошибки', () => {
    const testErr = new Error('Test err');
    const actualState = historyOrdersSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      ordersHistory.rejected(testErr, '')
    );

    expect(actualState).toEqual({
      orders: [],
      loading: false,
      error: 'Test err'
    });
  });
});
