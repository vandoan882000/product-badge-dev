import {
  createAction,
  createAsyncAction,
  createDispatchAction,
  createDispatchAsyncAction,
} from 'wiloke-react-core/utils';
import { ResponseSuccess } from '../ProductAPI';

export const getManualProducts = createAsyncAction([
  '@ManualProducts/getManualProductsRequest',
  '@ManualProducts/getManualProductsSuccess',
  '@ManualProducts/getManualProductsFailure',
  '@ManualProducts/getManualProductsCancel',
])<
  undefined,
  { products: ResponseSuccess['data']['items']; hasNextPage: boolean; lastCursor: string },
  { message: any }
>();

export const loadmoreManualProducts = createAsyncAction([
  '@ManualProducts/loadmoreManualProductsRequest',
  '@ManualProducts/loadmoreManualProductsSuccess',
  '@ManualProducts/loadmoreManualProductsFailure',
  '@ManualProducts/loadmoreManualProductsCancel',
])<undefined, { products: ResponseSuccess['data']['items']; hasNextPage: boolean; lastCursor: string }, undefined>();

export const changeActiveKey = createAction('@ManualProducts/changeActiveKey', (payload: string) => payload);

export const useGetManualProducts = createDispatchAsyncAction(getManualProducts);
export const useLoadmoreManualProducts = createDispatchAsyncAction(loadmoreManualProducts);
export const useChangeActiveKey = createDispatchAction(changeActiveKey);
