import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from './useApi';
import { useForm, useWatch } from 'react-hook-form';
import { defaultValues } from './utils';
import { SearchRepoValues } from './types';
import { useMemo } from 'react';
import { getErrorCode } from 'utils/getErrorCode';
import { ErrorCodes } from 'utils/errorCodes';
import { AxiosError } from 'axios';
import { ROUTES } from 'config/routes';

export const useUserInfo = () => {
  const navigate = useNavigate();
  const { login } = useParams();
  const { getUser, getUserRepos } = useApi(login);

  if (getErrorCode(getUser?.error as AxiosError) === ErrorCodes.NOT_FOUND) {
    navigate(ROUTES.HOME, { replace: true });
  }

  const form = useForm<SearchRepoValues>({
    defaultValues
  });

  const searchValue = useWatch({ control: form.control, name: 'searchRepo' });

  const filteredRepos = useMemo(() => {
    if (!searchValue) {
      return getUserRepos.data;
    }

    return getUserRepos.data?.filter(({ name }) =>
      name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, getUserRepos.data]);

  return { user: getUser.data, form, filteredRepos };
};
