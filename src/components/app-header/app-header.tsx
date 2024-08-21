import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectUser } from '../../slices/userDataSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(selectUser);
  return <AppHeaderUI userName={userName?.name} />;
};
