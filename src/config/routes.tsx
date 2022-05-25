import Home from 'pages/Home';
import { PathRouteProps } from 'react-router/lib/components';
import { Navigate } from 'react-router-dom';
import UserInfo from 'pages/UserInfo';
import { Suspense } from 'react';

export const ROUTES = {
  HOME: '/',
  USER: '/:login',
  NOT_FOUND: '*'
};

export const routes: PathRouteProps[] = [
  {
    path: ROUTES.HOME,
    element: (
      <Suspense fallback={<>...</>}>
        <Home />
      </Suspense>
    )
  },
  {
    path: ROUTES.USER,
    element: (
      <Suspense fallback={<>...</>}>
        <UserInfo />
      </Suspense>
    )
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <Navigate to={ROUTES.HOME} replace />
  }
];
