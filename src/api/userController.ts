import { publicClient } from 'config/publicClient';
import { SearchUserDto } from 'models/searchUserDto';
import { UserSearchDto } from 'models/userSearchDto';
import { UserDto } from 'models/userDto';
import { RepoDto } from 'models/repoDto';
import { PER_PAGE } from 'config/constats';

const baseUrl = 'users';

export const getUsersApi = async (q?: string) => {
  const { data } = await publicClient.get<SearchUserDto>('search/users', {
    params: { q }
  });

  return data;
};

export const getListUsersApi = async () => {
  const { data } = await publicClient.get<UserSearchDto[]>(baseUrl);

  return data;
};

export const getUserApi = async (login: string) => {
  const { data } = await publicClient.get<UserDto>(`${baseUrl}/${login}`);

  return data;
};

export const getUserReposApi = async (login: string) => {
  const { data } = await publicClient.get<RepoDto[]>(
    `${baseUrl}/${login}/repos`,
    { params: { per_page: PER_PAGE } }
  );

  return data;
};
