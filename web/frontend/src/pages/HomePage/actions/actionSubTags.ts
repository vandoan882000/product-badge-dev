import { createAction, createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { Items } from '../AutomaticAPI';

export const actionGetSubTags = createAsyncAction([
  '@Automatic/getSubTagsRequest',
  '@Automatic/getSubTagsSuccess',
  '@Automatic/getSubTagsFailure',
])<undefined, { data: Items[] }, undefined>();

export const loadMoreSubTags = createAsyncAction([
  '@Automatic/loadMoreSubTagsRequest',
  '@Automatic/loadMoreSubTagsSuccess',
  '@Automatic/loadMoreSubTagsFailure',
])<undefined, { data: Items[] }, undefined>();

export const changeSubTagsKey = createAction('@Automatic/changeSubTagsKey', (searchKey: string) => ({ searchKey }));

export const useGetSubTags = createDispatchAsyncAction(actionGetSubTags);
export const useLoadMoreSubTags = createDispatchAsyncAction(loadMoreSubTags);
