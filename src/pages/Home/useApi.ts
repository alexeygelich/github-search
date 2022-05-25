import { getListUsersApi, getUsersApi } from 'api/userController';
import { useQuery } from 'react-query';
import { QueryKeys } from 'config/queryKeys';
import { queryClient } from 'config/queryClient';

export const useApi = (q?: string) => {
  const getUsersCache = queryClient.getQueryData([QueryKeys.SEARCH, q]);

  const getUsers = useQuery(
    [QueryKeys.SEARCH, q],
    () => {
      if (q) {
        return getUsersApi(q);
      }
    },
    { enabled: !getUsersCache }
  );

  const getListUsersCache = queryClient.getQueryData(QueryKeys.LIST_USERS);

  const getListUsers = useQuery(QueryKeys.LIST_USERS, getListUsersApi, {
    enabled: !getListUsersCache
  });

  return { getUsers, getListUsers };
};
