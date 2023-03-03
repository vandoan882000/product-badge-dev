import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { ResponseSuccess as GetAutomaticsSuccess } from '../AutomaticAPI';
import { Params as CreateParams } from '../CreateBadgeAutomaticAPI';
import { Params as DeleteParams } from '../DeleteBadgeAutomaticAPI';
import { Params as UpdateParams } from '../UpdateBadgeAutomaticAPI';

export const getAutomatics = createAsyncAction([
  '@Automatic/getAutomaticsRequest',
  '@Automatic/getAutomaticsSuccess',
  '@Automatic/getAutomaticsFailure',
  '@Automatic/getAutomaticsCancel',
])<undefined, { automatics: GetAutomaticsSuccess['data']['items'] }, undefined>();

export const createAutomatic = createAsyncAction([
  '@Automatic/createAutomaticsRequest',
  '@Automatic/createAutomaticsSuccess',
  '@Automatic/createAutomaticsFailure',
])<CreateParams, CreateParams, CreateParams>();

export const updateAutomatic = createAsyncAction([
  '@Automatic/updateAutomaticsRequest',
  '@Automatic/updateAutomaticsSuccess',
  '@Automatic/updateAutomaticsFailure',
])<UpdateParams, UpdateParams, UpdateParams>();

export const deleteAutomatic = createAsyncAction([
  '@Automatic/deleteAutomaticsRequest',
  '@Automatic/deleteAutomaticsSuccess',
  '@Automatic/deleteAutomaticsFailure',
])<DeleteParams, DeleteParams, DeleteParams>();

export const sortAutomatic = createAsyncAction([
  '@Automatic/sortAutomaticsRequest',
  '@Automatic/sortAutomaticsSuccess',
  '@Automatic/sortAutomaticsFailure',
  '@Automatic/sortAutomaticsCancel',
])<{ listPostType: string[] }, { message: string }, undefined>();

export const useGetAutomatics = createDispatchAsyncAction(getAutomatics);
export const useCreateAutomatic = createDispatchAsyncAction(createAutomatic);
export const useUpdateAutomatic = createDispatchAsyncAction(updateAutomatic);
export const useDeleteAutomatic = createDispatchAsyncAction(deleteAutomatic);
export const useSortAutomatic = createDispatchAsyncAction(sortAutomatic);
