import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getFeedData, getFeedOrders, getLoading } from '../../slices/feedSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(getFeedData()).then((result) => {});
  }, [dispatch]);

  const orders: TOrder[] = useSelector(getFeedOrders);

  if (!orders.length || loading) {
    return <Preloader />;
  }

  const handleGetAllOrders = () => {
    dispatch(getFeedData());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetAllOrders} />;
};
