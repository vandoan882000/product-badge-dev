import {
  reducerBadges,
  reducerCUDBadge,
  reducerDocument,
  reducerFullProducts,
  reducerManualProducts,
  reducerPlans,
  reducerRecommend,
  reducerSubTag,
} from 'pages/HomePage';
import { reducerAutomatics } from 'pages/HomePage/reducers/reducerAutomatics';
import { reducerInitialization } from 'pages/InitializationPage';

export const rootReducers = {
  initialization: reducerInitialization,
  fullProducts: reducerFullProducts,
  manualProducts: reducerManualProducts,
  badges: reducerBadges,
  cudBadge: reducerCUDBadge,
  automatics: reducerAutomatics,
  features: reducerRecommend,
  plans: reducerPlans,
  subTags: reducerSubTag,
  documents: reducerDocument,
};
