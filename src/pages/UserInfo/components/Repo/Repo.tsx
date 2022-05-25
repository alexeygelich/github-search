import React from 'react';
import { RepoDto } from 'models/repoDto';
import './styles.scss';

const Repo: React.FC<RepoDto> = ({
  name,
  html_url,
  stargazers_count,
  forks
}) => {
  return (
    <a href={html_url} rel="noreferrer" target="_blank">
      <div className="repo-wrapper">
        <h3>{name}</h3>
        <div>
          <h3 className="repo-forks">{forks} Forks</h3>
          <h3>{stargazers_count} Stars</h3>
        </div>
      </div>
    </a>
  );
};

export default Repo;
