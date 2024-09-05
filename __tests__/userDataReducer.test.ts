import {
  TStateUser,
  toRegisterUser,
  logInUser,
  logOutUser,
  updateUser,
  userDataSlice,
  authChecked
} from '../src/slices/userDataSlice';

const initialState: TStateUser = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loginUserError: null,
  loginUserRequest: false
};

const testUser = {
  success: true,
  user: {
    email: 'test35@mail.ru',
    name: 'test'
  },
  accessToken: 'test',
  refreshToken: 'test'
};

const testLogIn = {
  email: 'test35@mail.ru',
  password: 'password'
};

const testRegisterUser = {
  email: 'test35@mail.ru',
  name: 'test',
  password: 'password'
};

const updatedUser = {
  success: true,
  user: {
    email: 'test35@mail.ru',
    name: 'test35'
  }
};

describe('Тестирование слайса userDataSlice', () => {
  it('Тест проверки аутентификации', () => {
    const previousState = {
      ...initialState,
      isAuthChecked: false
    };

    const actualState = userDataSlice.reducer(previousState, authChecked());

    const expectedState = {
      ...previousState,
      isAuthChecked: true
    };

    expect(actualState).toEqual(expectedState);
  });
  it('Тест загрузки регистации', () => {
    const actualState = userDataSlice.reducer(
      initialState,
      toRegisterUser.pending('', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: false,
      user: null,
      loginUserRequest: true
    });
  });

  it('Тест успешно пройденной регистрации', () => {
    const actualState = userDataSlice.reducer(
      initialState,
      toRegisterUser.fulfilled(testUser.user, '', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: true,
      user: testUser.user,
      loginUserRequest: false
    });
  });

  it('Тест получения ошибки при регистрации', () => {
    const error = new Error('User register error');
    const actualState = userDataSlice.reducer(
      initialState,
      toRegisterUser.rejected(error, '', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: false,
      loginUserError: 'User register error',
      loginUserRequest: false
    });
  });

  it('Тест загрузки авторизации', () => {
    const actualState = userDataSlice.reducer(
      initialState,
      logInUser.pending('', testLogIn)
    );

    expect(actualState).toEqual({
      ...initialState,
      loginUserError: null,
      loginUserRequest: true
    });
  });

  it('Тест успешной авторизации', () => {
    const actualState = userDataSlice.reducer(
      initialState,
      logInUser.fulfilled(testUser.user, '', testRegisterUser)
    );

    expect(actualState).toEqual({
      ...initialState,
      user: testUser.user,
      isAuthenticated: true,
      isAuthChecked: true,
      loginUserRequest: false
    });
  });

  it('Тест получения ошибки при авторизации', () => {
    const error = new Error('User Log in Error');
    const actualState = userDataSlice.reducer(
      initialState,
      logInUser.rejected(error, '', testLogIn)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserRequest: false,
      isAuthenticated: false,
      loginUserError: 'User Log in Error'
    });
  });

  it('Тест загрузки выхода из профиля', () => {
    const previousState = {
      ...initialState,
      isAuthenticated: true,
      user: testUser.user
    };

    const actualState = userDataSlice.reducer(
      previousState,
      logOutUser.pending('')
    );

    expect(actualState).toEqual({
      ...previousState,
      loginUserRequest: true
    });
  });

  it('Тест успешного выхода из профиля', () => {
    const actualState = userDataSlice.reducer(
      initialState,
      logOutUser.fulfilled(undefined, '')
    );

    expect(actualState).toEqual({
      isAuthenticated: false,
      user: null,
      loginUserRequest: false,
      isAuthChecked: false,
      loginUserError: null
    });
  });

  it('Тест получения ошибки при выходе из профиля', () => {
    const error = new Error('Failed to log out');
    const previousState = {
      ...initialState,
      isAuthenticated: true,
      user: testUser.user
    };

    const actualState = userDataSlice.reducer(
      previousState,
      logOutUser.rejected(error, '')
    );

    expect(actualState).toEqual({
      ...previousState,
      isAuthenticated: false,
      loginUserError: 'Failed to log out',
      loginUserRequest: false
    });
  });

  it('Тест загрузки обновления данных', () => {
    const actualState = userDataSlice.reducer(
      initialState,
      updateUser.pending('', updatedUser.user)
    );

    expect(actualState).toEqual({
      ...initialState,
      isAuthenticated: true,
      loginUserRequest: true
    });
  });

  it('Тест успешного обновления данных', () => {
    const actualState = userDataSlice.reducer(
      initialState,
      updateUser.fulfilled(updatedUser, '', testUser.user)
    );
    expect(actualState).toEqual({
      isAuthenticated: true,
      user: updatedUser.user,
      loginUserRequest: false,
      isAuthChecked: false,
      loginUserError: null
    });
  });

  it('Тест получения ошибки при обновлении данных', () => {
    const error = new Error('Failed to fetch update user');
    const actualState = userDataSlice.reducer(
      initialState,
      updateUser.rejected(error, '', testUser.user)
    );

    expect(actualState).toEqual({
      ...initialState,
      loginUserError: error.message,
      loginUserRequest: false
    });
  });
});
