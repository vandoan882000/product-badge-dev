import { equals } from 'ramda';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { createBadge, deleteBadge, updateBadge } from '../actions/actionCUDBadge';
import { Params as CreateParams } from '../CreateBadgeAPI';
import { Params as DeleteParams } from '../DeleteBadgeAPI';
import { Params as UpdateParams } from '../UpdateBadgeAPI';

interface State {
  queueCreating: CreateParams[];
  queueUpdating: UpdateParams[];
  queueDeleting: DeleteParams[];
  queueCreateFailed: CreateParams[];
  queueUpdateFailed: UpdateParams[];
  queueDeleteFailed: DeleteParams[];
}

type Actions = ActionTypes<typeof createBadge | typeof updateBadge | typeof deleteBadge>;

const defaultState: State = {
  queueCreating: [],
  queueDeleting: [],
  queueUpdating: [],
  queueCreateFailed: [],
  queueUpdateFailed: [],
  queueDeleteFailed: [],
};

export const reducerCUDBadge = createReducer<State, Actions>(defaultState, [
  handleAction('@CUDBadge/createBadgeRequest', ({ state, action }) => {
    return {
      ...state,
      queueCreating: state.queueCreating.concat(action.payload),
      queueCreateFailed: state.queueCreating.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@CUDBadge/createBadgeSuccess', ({ state, action }) => {
    return {
      ...state,
      queueCreating: state.queueCreating.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@CUDBadge/createBadgeFailure', ({ state, action }) => {
    return {
      ...state,
      queueCreating: state.queueCreating.filter(item => !equals(item, action.payload)),
      queueCreateFailed: state.queueCreateFailed.concat(action.payload),
    };
  }),
  handleAction('@CUDBadge/updateBadgeRequest', ({ state, action }) => {
    return {
      ...state,
      queueUpdating: state.queueUpdating.concat(action.payload),
      queueUpdateFailed: state.queueUpdateFailed.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@CUDBadge/updateBadgeSuccess', ({ state, action }) => {
    return {
      ...state,
      queueUpdating: state.queueUpdating.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@CUDBadge/updateBadgeFailure', ({ state, action }) => {
    return {
      ...state,
      queueUpdating: state.queueUpdating.filter(item => !equals(item, action.payload)),
      queueUpdateFailed: state.queueUpdateFailed.concat(action.payload),
    };
  }),
  handleAction('@CUDBadge/deleteBadgeRequest', ({ state, action }) => {
    return {
      ...state,
      queueDeleting: state.queueDeleting.concat(action.payload),
      queueDeleteFailed: state.queueDeleteFailed.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@CUDBadge/deleteBadgeSuccess', ({ state, action }) => {
    return {
      ...state,
      queueDeleting: state.queueDeleting.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@CUDBadge/deleteBadgeFailure', ({ state, action }) => {
    return {
      ...state,
      queueDeleting: state.queueDeleting.filter(item => !equals(item, action.payload)),
      queueDeleteFailed: state.queueDeleteFailed.concat(action.payload),
    };
  }),
]);
