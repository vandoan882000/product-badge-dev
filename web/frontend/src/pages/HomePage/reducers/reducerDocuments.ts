import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { getDocuments } from '../actions/actionDocuments';
import { DocumentsResponse } from '../DocumentAPI';

type Actions = ActionTypes<typeof getDocuments>;

interface State {
  documents: DocumentsResponse['data']['items'];
  getStatus: Status;
}

const defaultState: State = {
  documents: [],
  getStatus: 'idle',
};

export const reducerDocument = createReducer<State, Actions>(defaultState, [
  handleAction('@Documents/getDocuments/request', ({ state }) => ({ ...state, getStatus: 'loading' })),
  handleAction('@Documents/getDocuments/success', ({ state, action }) => ({
    ...state,
    getStatus: 'success',
    documents: action.payload.documents,
  })),
  handleAction('@Documents/getDocuments/failure', ({ state }) => ({ ...state, getStatus: 'failure' })),
]);
