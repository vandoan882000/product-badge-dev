import { createAsyncAction, createDispatchAsyncAction } from 'wiloke-react-core/utils';
import { DocumentsData } from '../DocumentAPI';

export const getDocuments = createAsyncAction([
  '@Documents/getDocuments/request',
  '@Documents/getDocuments/success',
  '@Documents/getDocuments/failure',
])<{ s?: string }, { documents: DocumentsData[] }, undefined>();

export const useGetDocuments = createDispatchAsyncAction(getDocuments);
