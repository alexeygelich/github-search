import { getUserApi, getUserReposApi } from 'api/userController';
import { useQuery } from 'react-query';
import { QueryKeys } from 'config/queryKeys';
import { queryClient } from 'config/queryClient';

export const useApi = (login?: string) => {
  const getUserCache = queryClient.getQueryData([QueryKeys.USER, login]);

  const getUser = useQuery(
    [QueryKeys.USER, login],
    () => {
      if (login) {
        return getUserApi(login);
      }
    },
    { enabled: !getUserCache }
  );

  const getUserReposCache = queryClient.getQueryData([
    QueryKeys.USER_REPO,
    login
  ]);

  const getUserRepos = useQuery(
    [QueryKeys.USER_REPO, login],
    () => {
      if (login) {
        return getUserReposApi(login);
      }
    },
    { enabled: !getUserReposCache }
  );

  return { getUser, getUserRepos };
};
