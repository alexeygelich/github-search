import React from 'react';
import { Props } from './types';
import './styles.scss';

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <div className="wrapper">
      <h1 className="wrapper-title">GitHub Searcher</h1>
      {children}
    </div>
  );
};

export default Wrapper;
