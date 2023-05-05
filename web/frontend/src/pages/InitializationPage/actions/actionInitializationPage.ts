import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { State } from '../@types';

export const initialization = createAsyncAction([
  '@InitializationPage/initializationRequest',
  '@InitializationPage/initializationSucess',
  '@InitializationPage/initializationFailure',
])<
  { appBridge: AppBridge },
  Pick<Required<State>, 'appExtensionActived' | 'email' | 'shopDomain' | 'themeId' | 'currencyFormat'>,
  { isInvalidToken: boolean }
>();

export const listenAppActiveExtension = createAsyncAction([
  '@InitializationPage/listenAppActiveExtension/request',
  '@InitializationPage/listenAppActiveExtension/success',
  '@InitializationPage/listenAppActiveExtension/failure',
])<{ appBridge: AppBridge }, { appExtensionActived: boolean }, { isInvalidToken: boolean }>();

export const useInitialization = createDispatchAsyncAction(initialization);
export const useListenAppActiveExtension = createDispatchAsyncAction(listenAppActiveExtension);
