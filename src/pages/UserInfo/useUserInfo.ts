import { useParams } from 'react-router-dom';
import { useApi } from './useApi';
import { useForm, useWatch } from 'react-hook-form';
import { defaultValues } from './utils';
import { SearchRepoValues } from './types';
import { useMemo } from 'react';

export const useUserInfo = () => {
  const { login } = useParams();
  const { getUserCache, getUserReposCache } = useApi(login);

  const form = useForm<SearchRepoValues>({
    defaultValues
  });

  const searchValue = useWatch({ control: form.control, name: 'searchRepo' });

  const filteredRepos = useMemo(() => {
    if (!searchValue) {
      return getUserReposCache;
    }

    return getUserReposCache?.filter(({ name }) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, getUserReposCache]);

  return { user: getUserCache, form, filteredRepos };
};
