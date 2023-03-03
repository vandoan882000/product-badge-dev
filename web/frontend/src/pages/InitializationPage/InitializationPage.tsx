import { useAppBridge } from '@shopify/app-bridge-react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { initializationSelector } from 'store/selectors';
import { useInitialization } from './actions/actionInitializationPage';
import { InitializationFailure } from './components/InitializationFailure';
import { InitializationLoading } from './components/InitializationLoading';
import { NotFoundTheme } from './components/NotFoundTheme';

export const InitializationPage = () => {
  const { statusInitialization, shopDomain, themeId } = useSelector(initializationSelector);

  const app = useAppBridge();
  const init = useInitialization();

  useEffect(() => {
    init.request({ appBridge: app });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [app]);

  if (statusInitialization === 'success' && shopDomain && !themeId) {
    return <NotFoundTheme />;
  }

  if (statusInitialization === 'failure') {
    return <InitializationFailure />;
  }

  return <InitializationLoading />;
};
