import React from 'react';
import { useUserInfo } from './useUserInfo';
import { Controller } from 'react-hook-form';
import Repo from 'pages/UserInfo/components/Repo';
import Wrapper from 'components/Wrapper';
import './styles.scss';
import { format } from 'date-fns';
import { FORMAT_DATE } from 'config/constats';

const IMAGE_WIDTH = 150;
const IMAGE_HEIGHT = 150;

const UserInfo: React.FC = () => {
  const { user, filteredRepos, form } = useUserInfo();

  return (
    <Wrapper>
      <div className="userInfo-base-info">
        <img
          src={user?.avatar_url}
          alt="avatar"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          className="userInfo-img"
        />
        <div>
          <h3>User name: {user?.login}</h3>
          <h3>Email: {user?.email}</h3>
          <h3>Location: {user?.location}</h3>
          <h3>
            Join date: {user && format(new Date(user.created_at), FORMAT_DATE)}
          </h3>
          <h3>Followers: {user?.followers}</h3>
          <h3>Following: {user?.following}</h3>
        </div>
      </div>
      <p className="userInfo-bio">Bio: {user?.bio}</p>
      <div className="userInfo-input-wrapper">
        <Controller
          render={({ field }) => (
            <input
              className="userInfo-input"
              placeholder="Search for User's Repositories"
              {...field}
            />
          )}
          name="searchRepo"
          control={form.control}
          defaultValue=""
        />
      </div>
      {filteredRepos?.map((repo) => (
        <Repo key={repo.id} {...repo} />
      ))}
    </Wrapper>
  );
};

export default UserInfo;
