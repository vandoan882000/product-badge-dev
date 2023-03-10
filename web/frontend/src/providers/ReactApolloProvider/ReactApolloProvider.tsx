import { ApolloClient, ApolloProvider, createHttpLink, HttpOptions, InMemoryCache } from '@apollo/client';
import { AppBridgeState, ClientApplication } from '@shopify/app-bridge';
import { useAppBridge } from '@shopify/app-bridge-react';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import { FC, PropsWithChildren, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { initializationSelector } from 'store/selectors';
import { checkHeadersForReauthorization } from 'utils/checkHeadersForReauthorization';

const userLoggedInFetch = (app: ClientApplication<AppBridgeState>): HttpOptions['fetch'] => {
  const fetchFunction = authenticatedFetch(app);

  return async (uri: Parameters<typeof fetchFunction>[0], options: Parameters<typeof fetchFunction>[1]) => {
    const response = await fetchFunction(uri, options);
    checkHeadersForReauthorization(response.headers, app);
    return response;
  };
};

export const ReactApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  const app = useAppBridge();
  const { shopDomain } = useSelector(initializationSelector);

  const requestHeaders = useMemo<Record<string, string>>(() => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (shopDomain) {
      headers['X-ShopName'] = shopDomain;
    }
    return headers;
  }, [shopDomain]);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      credentials: 'include',
      headers: requestHeaders,
      uri: '/graphql', // WARNING: Update nếu có sự thay đổi đường dẫn tại folder "backend"
      fetch: userLoggedInFetch(app),
    }),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
