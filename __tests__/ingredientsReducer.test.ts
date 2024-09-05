import { error } from 'console';
import ingredientsSlice, {
  getIngredients,
  TStateIngredients
} from '../src/slices/ingredientsSlice';

const initialState: TStateIngredients = {
  ingredients: [],
  loading: false,
  error: null
};

const testIngredient = [
  {
    _id: '1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  }
];

describe('Тестирование слайса ingredientsSlice', () => {
  it('Тест состояния загрузки', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        error: 'Test err'
      },
      getIngredients.pending('')
    );

    expect(actualState).toEqual({
      ingredients: [],
      loading: true,
      error: null
    });
  });

  it('Тест получения ингредиентов и отключения загрузки', () => {
    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getIngredients.fulfilled(testIngredient, '')
    );

    expect(actualState).toEqual({
      ingredients: testIngredient,
      loading: false,
      error: null
    });
  });

  it('Тест получения ошибки', () => {
    const testErr = new Error('Test err');

    const actualState = ingredientsSlice.reducer(
      {
        ...initialState,
        loading: true
      },
      getIngredients.rejected(testErr, '')
    );

    expect(actualState).toEqual({
      ingredients: [],
      loading: false,
      error: 'Test err'
    });
  });
});
