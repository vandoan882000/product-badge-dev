import { compose } from '@reduxjs/toolkit';
import { useAppBridge } from '@shopify/app-bridge-react';
import { store } from 'store/configureStore';

declare global {
  type Status = 'idle' | 'loading' | 'success' | 'failure';
  type AppState = ReturnType<typeof store.getState>;
  type AppDispatch = typeof store.dispatch;

  type AppBridge = ReturnType<typeof useAppBridge>;

  interface Window {
    __SHOPIFY_DEV_HOST: string;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
    tidioChatApi?: any;
  }
}
export {};
