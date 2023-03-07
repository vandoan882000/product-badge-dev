import { createSelector } from 'reselect';

export const initializationSelector = (state: AppState) => state.initialization;
export const appBridgeSelector = createSelector(initializationSelector, initializationState => {
  return initializationState.appBridge as AppBridge;
});
