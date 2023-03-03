import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { Params as CreateParams } from '../CreateBadgeAPI';
import { Params as DeleteParams } from '../DeleteBadgeAPI';
import { Params as UpdateParams } from '../UpdateBadgeAPI';

export const createBadge = createAsyncAction([
  '@CUDBadge/createBadgeRequest',
  '@CUDBadge/createBadgeSuccess',
  '@CUDBadge/createBadgeFailure',
])<CreateParams, CreateParams, CreateParams>();

export const updateBadge = createAsyncAction([
  '@CUDBadge/updateBadgeRequest',
  '@CUDBadge/updateBadgeSuccess',
  '@CUDBadge/updateBadgeFailure',
])<UpdateParams, UpdateParams, UpdateParams>();

export const deleteBadge = createAsyncAction([
  '@CUDBadge/deleteBadgeRequest',
  '@CUDBadge/deleteBadgeSuccess',
  '@CUDBadge/deleteBadgeFailure',
])<DeleteParams, DeleteParams, DeleteParams>();

export const useCreateBadge = createDispatchAsyncAction(createBadge);
export const useUpdateBadge = createDispatchAsyncAction(updateBadge);
export const useDeleteBadge = createDispatchAsyncAction(deleteBadge);
