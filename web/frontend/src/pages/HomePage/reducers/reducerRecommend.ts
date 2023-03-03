import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { getFeatures } from '../actions/actionFeatures';
import { RecommendItem } from '../Features';

type Action = ActionTypes<typeof getFeatures>;

export interface FeatureState {
  requestStatus: Status;
  data: RecommendItem[];
}

const defaultState: FeatureState = {
  requestStatus: 'idle',
  data: [],
};

export const reducerRecommend = createReducer<FeatureState, Action>(defaultState, [
  handleAction('@FeaturePage/getFeatures/request', ({ state }) => {
    state.requestStatus = 'loading';
  }),
  handleAction('@FeaturePage/getFeatures/success', ({ state, action }) => {
    state.requestStatus = 'success';
    state.data = action.payload.data;
  }),
  handleAction('@FeaturePage/getFeatures/failure', ({ state }) => {
    state.requestStatus = 'failure';
  }),
]);
