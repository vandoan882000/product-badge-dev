import { ExitIframe } from 'pages/ExitIframe';
import { HomePage } from 'pages/HomePage';
import { InitializationPage } from 'pages/InitializationPage';
import { IntegrationAppPage } from 'pages/IntegrationAppPage/IntegrationAppPage';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { initializationSelector } from 'store/selectors';
import { Page } from './types';

export const pages: Page[] = [
  {
    path: '/app/:appSlug',
    exact: true,
    component: IntegrationAppPage,
  },
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/exitiframe',
    exact: true,
    component: ExitIframe,
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
