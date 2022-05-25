import { useForm, useWatch } from 'react-hook-form';
import { useApi } from './useApi';
import { SearchValues } from './types';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const urlSearchValue = searchParams.get('q');

  const defaultValues: SearchValues = {
    search: urlSearchValue || ''
  };

  const form = useForm<SearchValues>({
    defaultValues
  });

  const searchValue = useWatch({ control: form.control, name: 'search' });

  const { getListUsers, getUsers } = useApi(searchValue);

  const users = searchValue ? getUsers.data?.items : getListUsers.data;

  useEffect(() => {
    if (searchValue !== urlSearchValue) {
      setSearchParams(`q=${searchValue}`);
    }
  }, [searchValue, setSearchParams]);

  useEffect(() => {
    if (typeof urlSearchValue === 'string' && urlSearchValue !== searchValue) {
      form.setValue('search', urlSearchValue);
    }
  }, [urlSearchValue]);

  return { form, users };
};
