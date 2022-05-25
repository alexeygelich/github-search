import { useForm, useWatch } from 'react-hook-form';
import { useApi } from './useApi';
import { SearchValues } from './types';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { debounce } from 'lodash';

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState('');

  const urlSearchValue = searchParams.get('q');

  const debouncedSearch = useRef(
    debounce(async (criteria: string) => {
      setKeyword(criteria);
    }, 300)
  ).current;

  const defaultValues: SearchValues = {
    search: urlSearchValue || ''
  };

  const form = useForm<SearchValues>({
    defaultValues
  });

  const searchValue = useWatch({ control: form.control, name: 'search' });

  const { getListUsers, getUsers } = useApi(keyword);

  const users = searchValue ? getUsers.data?.items : getListUsers.data;

  useEffect(() => {
    debouncedSearch(searchValue);
    if (searchValue !== urlSearchValue) {
      setSearchParams(`q=${searchValue}`);
    }
  }, [searchValue]);

  useEffect(() => {
    if (typeof urlSearchValue === 'string' && urlSearchValue !== searchValue) {
      form.setValue('search', urlSearchValue);
    }
  }, [urlSearchValue]);

  return { form, users };
};
