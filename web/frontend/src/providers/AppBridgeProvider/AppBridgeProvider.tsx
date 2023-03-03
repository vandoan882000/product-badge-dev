import { Provider, ProviderProps as AppBridgeProviderProps } from '@shopify/app-bridge-react';
import { FC, PropsWithChildren, useMemo, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { NotFoundApiKey } from './components/NotFoundApiKey';
import { NotFoundHost } from './components/NotFoundHost';

/**
 * SHOPIFY_APP_TEMPLATE_NODE:
 * A component to configure App Bridge.
 * @desc A thin wrapper around AppBridgeProvider that provides the following capabilities:
 *
 * 1. Ensures that navigating inside the app updates the host URL.
 * 2. Configures the App Bridge Provider, which unlocks functionality provided by the host.
 *
 * See: https://shopify.dev/apps/tools/app-bridge/react-components
 */
export const AppBridgeProvider: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const history = useHistory();

  const historyConfig = useMemo(
    () => ({
      replace: (path: string) => {
        history.push(path, { replace: true });
      },
    }),
    [history],
  );

  const routerConfig: AppBridgeProviderProps['router'] = useMemo(
    () => ({ history: historyConfig, location }),
    [historyConfig, location],
  );

  // SHOPIFY_APP_TEMPLATE_NODE:
  // The host may be present initially, but later removed by navigation.
  // By caching this in state, we ensure that the host is never lost.
  // During the lifecycle of an app, these values should never be updated anyway.
  // Using state in this way is preferable to useMemo.
  // See: https://stackoverflow.com/questions/60482318/version-of-usememo-for-caching-a-value-that-will-never-change
  const [{ apiKey, forceRedirect, host }] = useState(() => {
    const host = new URLSearchParams(location.search).get('host') || window.__SHOPIFY_DEV_HOST;

    window.__SHOPIFY_DEV_HOST = host;

    return {
      host,
      apiKey: process.env.SHOPIFY_API_KEY,
      forceRedirect: true,
    };
  });

  if (!apiKey) {
    return <NotFoundApiKey />;
  }

  if (!host) {
    return <NotFoundHost />;
  }

  return (
    <Provider config={{ apiKey, forceRedirect, host }} router={routerConfig}>
      {children}
    </Provider>
  );
};
