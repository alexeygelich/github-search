import React from 'react';
import { Controller } from 'react-hook-form';
import { useSearch } from './useSearch';
import User from 'pages/Home/components/User';
import Wrapper from 'components/Wrapper';
import './styles.scss';

const Home: React.FC = () => {
  const { form, users } = useSearch();

  return (
    <Wrapper>
      <div className="home-wrapper-input">
        <Controller
          render={({ field }) => (
            <input placeholder="Search for User" {...field} />
          )}
          name="search"
          control={form.control}
          defaultValue=""
        />
      </div>
      <div className="home-users-list">
        {users?.map((user) => (
          <User
            key={user.login}
            login={user.login}
            avatar_url={user.avatar_url}
          />
        ))}
      </div>
    </Wrapper>
  );
};

export default Home;
