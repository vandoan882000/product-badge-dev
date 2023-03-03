import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';

export const uploadMedia = createAsyncAction([
  '@Media/uploadMedia/request',
  '@Media/uploadMedia/success',
  '@Media/uploadMedia/failure',
])<{ file: File }, undefined, undefined>();

export const getMedia = createAsyncAction([
  '@Media/getMedia/request',
  '@Media/getMedia/success',
  '@Media/getMedia/failure',
])<undefined, undefined, undefined>();

export const loadMoreMedia = createAsyncAction([
  '@Media/loadMoreMedia/request',
  '@Media/loadMoreMedia/success',
  '@Media/loadMoreMedia/failure',
])<{ page: number }, undefined, undefined>();

export const deleteMedia = createAsyncAction([
  '@Media/deleteMedia/request',
  '@Media/deleteMedia/success',
  '@Media/deleteMedia/failure',
])<{ id: string }, undefined, undefined>();

export const useUploadMedia = createDispatchAsyncAction(uploadMedia);
export const useGetMedia = createDispatchAsyncAction(getMedia);
export const useLoadMoreMedia = createDispatchAsyncAction(loadMoreMedia);
export const useDeleteMedia = createDispatchAsyncAction(deleteMedia);
