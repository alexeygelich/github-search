import React from 'react';
import { Props } from './types';
import { useRepos } from './useRepos';
import ReactLoading from 'react-loading';
import './styles.scss';

const IMAGE_WIDTH = 200;
const IMAGE_HEIGHT = 200;
const LOADING_WIDTH = 30;
const LOADING_HEIGHT = 30;

const User: React.FC<Props> = ({ login, avatar_url }) => {
  const { ref, countRepos, handleClick } = useRepos(login);

  return (
    <div ref={ref} onClick={handleClick} className="user-wrapper">
      <img
        src={avatar_url}
        alt="avatar"
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
      />
      <h1>{login}</h1>
      <div className="user-repo-wrapper">
        <h1>Repo:</h1>
        {countRepos !== undefined ? (
          <h1 className="user-repo">{countRepos}</h1>
        ) : (
          <ReactLoading
            type="bubbles"
            color="black"
            height={LOADING_WIDTH}
            width={LOADING_HEIGHT}
          />
        )}
      </div>
    </div>
  );
};

export default User;
