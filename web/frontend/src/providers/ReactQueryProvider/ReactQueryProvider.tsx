import { FC, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from 'react-query';

/**
 * SHOPIFY_APP_TEMPLATE_NODE:
 * Sets up the QueryClientProvider from react-query.
 * @desc See: https://react-query.tanstack.com/reference/QueryClientProvider#_top
 */
export const ReactQueryProvider: FC<PropsWithChildren> = ({ children }) => {
  const client = new QueryClient({
    queryCache: new QueryCache(),
    mutationCache: new MutationCache(),
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
