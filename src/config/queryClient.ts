import { QueryCache, QueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { getErrorCode, getErrorMessage } from 'utils/getErrorCode';
import { ErrorCodes } from 'utils/errorCodes';
import { Store } from 'react-notifications-component';

const errorNotificationHandler = (error: AxiosError) => {
  const errors = Object.values(ErrorCodes).filter(
    (value) => typeof value === 'number'
  ) as number[];
  const message = getErrorMessage(error);

  const statusCode = getErrorCode(error);
  if (statusCode && errors.includes(statusCode)) {
    return;
  }
  Store.addNotification({
    title: 'Something went wrong!',
    message,
    type: 'danger',
    insert: 'bottom',
    container: 'bottom-center',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 5000,
      onScreen: true
    }
  });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  },
  queryCache: new QueryCache({
    onError: (error) => errorNotificationHandler(error as AxiosError)
  })
});
