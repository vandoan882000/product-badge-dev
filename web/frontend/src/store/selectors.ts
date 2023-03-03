import { createSelector } from 'reselect';

export const initializationSelector = (state: AppState) => state.initialization;
export const appBridgeSelector = createSelector(initializationSelector, initializationState => {
  return initializationState.appBridge as AppBridge;
});

export const appRecommendationsSelector = (state: AppState) => state.app_recommendations;

export const plansSelector = (state: AppState) => state.plan;
