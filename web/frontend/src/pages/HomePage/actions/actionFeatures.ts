import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { RecommendItem } from '../Features';

export const getFeatures = createAsyncAction([
  '@FeaturePage/getFeatures/request',
  '@FeaturePage/getFeatures/success',
  '@FeaturePage/getFeatures/failure',
])<undefined, { data: RecommendItem[] }, undefined>();

export const useGetFeatures = createDispatchAsyncAction(getFeatures);
