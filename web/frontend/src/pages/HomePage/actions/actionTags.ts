import {
  createAction,
  createAsyncAction,
  createDispatchAction,
  createDispatchAsyncAction,
} from 'wiloke-react-core/utils';
import { ResponseSuccess } from '../TagsAPI';

export const getTags = createAsyncAction([
  '@Automatic/getTagsRequest',
  '@Automatic/getTagsSuccess',
  '@Automatic/getTagsFailure',
  '@Automatic/getTagsCancel',
])<undefined, { data: ResponseSuccess['data']['items']; hasNextPage: boolean; lastCursor: string }, undefined>();

export const loadMoreTags = createAsyncAction([
  '@Automatic/loadMoreTagsRequest',
  '@Automatic/loadMoreTagsSuccess',
  '@Automatic/loadMoreTagsFailure',
  '@Automatic/loadMoreTagsCancel',
])<undefined, { data: ResponseSuccess['data']['items']; hasNextPage: boolean; lastCursor: string }, undefined>();

export const changeTagKey = createAction('@Automatic/changeTagKey', (payload: string) => payload);

export const useGetTags = createDispatchAsyncAction(getTags);
export const useLoadMoreTags = createDispatchAsyncAction(loadMoreTags);
export const useChangeTagKey = createDispatchAction(changeTagKey);
