import { Items } from 'pages/HomePage/AutomaticAPI';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { actionGetSubTags, loadMoreSubTags } from '../actions/actionSubTags';

type Actions = ActionTypes<typeof actionGetSubTags | typeof loadMoreSubTags>;

interface State {
  data: Items[];
  getStatus: Status;
  loadMoreStatus: Status;
}

const defaultState: State = {
  data: [],
  getStatus: 'idle',
  loadMoreStatus: 'idle',
};

export const reducerSubTag = createReducer<State, Actions>(defaultState, [
  handleAction('@Automatic/getSubTagsRequest', ({ state }) => {
    return {
      ...state,
      getStatus: 'loading',
    };
  }),
  handleAction('@Automatic/getSubTagsSuccess', ({ state, action }) => {
    const { data } = action.payload;
    return {
      ...state,
      getStatus: 'success',
      data,
    };
  }),
  handleAction('@Automatic/getSubTagsFailure', ({ state }) => {
    return {
      ...state,
      getStatus: 'failure',
    };
  }),
  handleAction('@Automatic/loadMoreSubTagsRequest', ({ state }) => {
    return {
      ...state,
      loadMoreStatus: 'loading',
    };
  }),
  handleAction('@Automatic/loadMoreSubTagsSuccess', ({ state, action }) => {
    const { data } = action.payload;
    return {
      ...state,
      loadMoreStatus: 'success',
      data: state.data.concat(data),
    };
  }),
  handleAction('@Automatic/loadMoreSubTagsFailure', ({ state }) => {
    return {
      ...state,
      loadMoreStatus: 'failure',
    };
  }),
]);
