import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { useApi } from 'pages/UserInfo/useApi';

export const useRepos = (login: string) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(login);
  };

  const { ref, inView } = useInView({
    threshold: 0
  });

  const { getUserReposCache } = useApi(inView ? login : '');

  const countRepos = getUserReposCache?.length;

  return { countRepos, handleClick, ref };
};
