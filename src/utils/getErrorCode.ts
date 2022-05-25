import { AxiosError } from 'axios';

type Data = {
  message: string;
};

export const getErrorCode = (error?: AxiosError) => error?.response?.status;
export const getErrorMessage = (error?: AxiosError) => {
  return (error?.response?.data as Data).message;
};
