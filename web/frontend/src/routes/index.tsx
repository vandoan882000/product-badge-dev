import { HomePage } from 'pages/HomePage';
import { InitializationPage } from 'pages/InitializationPage';
import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { initializationSelector } from 'store/selectors';
import { Page } from './types';

export const pages: Page[] = [
  {
    path: '/',
    component: HomePage,
  },
];

export const AppRoutes = () => {
  const { statusInitialization } = useSelector(initializationSelector);

  const _renderRoute = () => {
    if (statusInitialization !== 'success') {
      return <InitializationPage />;
    }

    return (
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return <Route key={path} component={component} exact={exact} path={path} />;
        })}
      </Switch>
    );
  };

  return <>{_renderRoute()}</>;
};
