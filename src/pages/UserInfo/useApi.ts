import { getUserApi, getUserReposApi } from 'api/userController';
import { useQuery } from 'react-query';
import { QueryKeys } from 'config/queryKeys';
import { queryClient } from 'config/queryClient';
import { RepoDto } from 'models/repoDto';
import { UserDto } from 'models/userDto';
import { getErrorCode } from 'utils/getErrorCode';
import { AxiosError } from 'axios';
import { ErrorCodes } from 'utils/errorCodes';
import { ROUTES } from 'config/routes';
import { useNavigate } from 'react-router-dom';

export const useApi = (login?: string) => {
  const navigate = useNavigate();

  const getUserCache = queryClient.getQueryData<UserDto>([
    QueryKeys.USER,
    login
  ]);

  useQuery(
    [QueryKeys.USER, login],
    () => {
      if (login) {
        return getUserApi(login);
      }
    },
    { enabled: !getUserCache }
  );

  const getUserReposCache = queryClient.getQueryData<RepoDto[]>([
    QueryKeys.USER_REPO,
    login
  ]);

  const onError = (error: AxiosError) => {
    if (getErrorCode(error) === ErrorCodes.NOT_FOUND) {
      navigate(ROUTES.HOME, { replace: true });
    }
  };

  useQuery(
    [QueryKeys.USER_REPO, login],
    () => {
      if (login) {
        return getUserReposApi(login);
      }
    },
    { onError, enabled: !getUserReposCache }
  );

  return { getUserCache, getUserReposCache };
};
