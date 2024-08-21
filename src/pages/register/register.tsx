import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import {
  selectloginUserRequest,
  toRegisterUser
} from '../../slices/userDataSlice';
import { TRegisterData } from '@api';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const loading = useSelector(selectloginUserRequest);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const newUserData: TRegisterData = {
      name: userName,
      email: email,
      password: password
    };
    dispatch(toRegisterUser(newUserData));
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
