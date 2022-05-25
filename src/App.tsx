import React, { Suspense } from 'react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from 'config/queryClient';
import { Route, Routes } from 'react-router-dom';
import { routes } from 'config/routes';
import ReactLoading from 'react-loading';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ReactNotifications />
    <Suspense fallback={<ReactLoading type="spin" color="grey" />}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} {...route} />
        ))}
      </Routes>
    </Suspense>
  </QueryClientProvider>
);

export default App;
