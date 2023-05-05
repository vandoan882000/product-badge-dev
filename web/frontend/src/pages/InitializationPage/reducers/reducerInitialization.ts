import { createReducer, handleAction } from 'wiloke-react-core/utils';
import { Actions, State } from '../@types';

const defaultState: State = {
  statusInitialization: 'idle',
  isInvalidToken: false,
  appBridge: null,
  shopDomain: null,
  email: null,
  themeId: null,
  appExtensionActived: null,
  currencyFormat: '',
  listenAppActiveExtensionStatus: 'idle',
};

export const reducerInitialization = createReducer<State, Actions>(defaultState, [
  handleAction('@InitializationPage/initializationRequest', ({ state, action }) => {
    const { appBridge } = action.payload;
    return {
      ...state,
      statusInitialization: 'loading',
      isInvalidToken: false,
      appBridge,
    };
  }),
  handleAction('@InitializationPage/initializationSucess', ({ state, action }) => {
    const { themeId, appExtensionActived, email, shopDomain } = action.payload;
    return {
      ...state,
      statusInitialization: 'success',
      shopDomain,
      email,
      appExtensionActived,
      themeId,
    };
  }),
  handleAction('@InitializationPage/initializationFailure', ({ state, action }) => {
    const { isInvalidToken } = action.payload;
    return {
      ...state,
      statusInitialization: 'failure',
      isInvalidToken,
    };
  }),
  handleAction('@InitializationPage/listenAppActiveExtension/request', ({ state }) => {
    state.listenAppActiveExtensionStatus = 'loading';
  }),
  handleAction('@InitializationPage/listenAppActiveExtension/success', ({ state, action }) => {
    state.listenAppActiveExtensionStatus = 'success';
    state.appExtensionActived = action.payload.appExtensionActived;
  }),
  handleAction('@InitializationPage/listenAppActiveExtension/failure', ({ state, action }) => {
    state.listenAppActiveExtensionStatus = 'failure';
    state.isInvalidToken = action.payload.isInvalidToken;
  }),
]);
