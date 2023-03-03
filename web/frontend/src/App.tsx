import 'antd/dist/antd.css';
import {
  AppBridgeProvider,
  PolarisProvider,
  ReactApolloProvider,
  ReactQueryProvider,
  ReduxProvider,
  RouterProvider,
  ThemeProvider,
} from 'providers';
import { useDispatch } from 'react-redux';
import { AppRoutes } from 'routes';
import { getUseDispatchRedux } from 'wiloke-react-core/utils';

getUseDispatchRedux(useDispatch);

export default function App() {
  return (
    <PolarisProvider>
      <RouterProvider>
        <AppBridgeProvider>
          <ThemeProvider>
            <ReduxProvider>
              <ReactApolloProvider>
                <ReactQueryProvider>
                  <AppRoutes />
                </ReactQueryProvider>
              </ReactApolloProvider>
            </ReduxProvider>
          </ThemeProvider>
        </AppBridgeProvider>
      </RouterProvider>
    </PolarisProvider>
  );
}
