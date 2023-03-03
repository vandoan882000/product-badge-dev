import { equals } from 'ramda';
import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import {
  createAutomatic,
  deleteAutomatic,
  getAutomatics,
  sortAutomatic,
  updateAutomatic,
} from '../actions/actionAutomaticProducts';
import { changeTagKey, getTags, loadMoreTags } from '../actions/actionTags';
import { ResponseSuccess } from '../AutomaticAPI';
import { Params as CreateParams } from '../CreateBadgeAutomaticAPI';
import { Params as DeleteParams } from '../DeleteBadgeAutomaticAPI';
import { ResponseSuccess as ResponseTagsAPI } from '../TagsAPI';
import { Params as UpdateParams } from '../UpdateBadgeAutomaticAPI';

interface StateTag {
  statusRequest: Status;
  statusLoadMore: Status;
  data: ResponseTagsAPI['data']['items'];
  lastCursor: string;
  hasNextPage: boolean;
}

interface State {
  automatics: ResponseSuccess['data']['items'];
  statusRequest: Status;
  sortStatus: Status;
  queueCreating: CreateParams[];
  queueUpdating: UpdateParams[];
  queueDeleting: DeleteParams[];
  queueCreateFailed: CreateParams[];
  queueUpdateFailed: UpdateParams[];
  queueDeleteFailed: DeleteParams[];
  tags: Record<string, StateTag | undefined>;
  tagSearchKey: string;
}

type Actions = ActionTypes<
  | typeof getAutomatics
  | typeof createAutomatic
  | typeof updateAutomatic
  | typeof deleteAutomatic
  | typeof sortAutomatic
  | typeof getTags
  | typeof loadMoreTags
  | typeof changeTagKey
>;

const defaultState: State = {
  automatics: [],
  statusRequest: 'idle',
  queueCreating: [],
  queueUpdating: [],
  queueDeleting: [],
  queueCreateFailed: [],
  queueUpdateFailed: [],
  queueDeleteFailed: [],
  sortStatus: 'idle',
  tags: {},
  tagSearchKey: '',
};

export const defaultTagsData: StateTag = {
  data: [],
  hasNextPage: false,
  lastCursor: '',
  statusLoadMore: 'idle',
  statusRequest: 'idle',
};

export const reducerAutomatics = createReducer<State, Actions>(defaultState, [
  handleAction('@Automatic/getAutomaticsRequest', ({ state }) => {
    return {
      ...state,
      statusRequest: 'loading',
    };
  }),
  handleAction('@Automatic/getAutomaticsSuccess', ({ state, action }) => {
    const { automatics } = action.payload;
    return {
      ...state,
      statusRequest: 'success',
      automatics,
    };
  }),
  handleAction('@Automatic/getAutomaticsFailure', ({ state }) => {
    return {
      ...state,
      statusRequest: 'failure',
    };
  }),
  handleAction('@Automatic/getAutomaticsCancel', ({ state }) => {
    return {
      ...state,
      statusRequest: 'idle',
    };
  }),
  handleAction('@Automatic/createAutomaticsRequest', ({ state, action }) => {
    return {
      ...state,
      queueCreating: state.queueCreating.concat(action.payload),
      queueCreateFailed: state.queueCreateFailed.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/createAutomaticsSuccess', ({ state, action }) => {
    return {
      ...state,
      queueCreating: state.queueCreating.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/createAutomaticsFailure', ({ state, action }) => {
    return {
      ...state,
      queueCreating: state.queueCreating.filter(item => !equals(item, action.payload)),
      queueCreateFailed: state.queueCreateFailed.concat(action.payload),
    };
  }),
  handleAction('@Automatic/updateAutomaticsRequest', ({ state, action }) => {
    return {
      ...state,
      queueUpdating: state.queueUpdating.concat(action.payload),
      queueUpdateFailed: state.queueUpdateFailed.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/updateAutomaticsSuccess', ({ state, action }) => {
    return {
      ...state,
      queueUpdating: state.queueUpdating.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/updateAutomaticsFailure', ({ state, action }) => {
    return {
      ...state,
      queueUpdating: state.queueUpdating.filter(item => !equals(item, action.payload)),
      queueUpdateFailed: state.queueUpdateFailed.concat(action.payload),
    };
  }),
  handleAction('@Automatic/deleteAutomaticsRequest', ({ state, action }) => {
    return {
      ...state,
      queueDeleting: state.queueDeleting.concat(action.payload),
      queueDeleteFailed: state.queueDeleteFailed.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/deleteAutomaticsSuccess', ({ state, action }) => {
    return {
      ...state,
      queueDeleting: state.queueDeleting.filter(item => !equals(item, action.payload)),
    };
  }),
  handleAction('@Automatic/deleteAutomaticsFailure', ({ state, action }) => {
    return {
      ...state,
      queueDeleting: state.queueDeleting.filter(item => !equals(item, action.payload)),
      queueDeleteFailed: state.queueDeleteFailed.concat(action.payload),
    };
  }),
  handleAction('@Automatic/sortAutomaticsRequest', ({ state }) => {
    return {
      ...state,
      sortStatus: 'loading',
    };
  }),
  handleAction('@Automatic/sortAutomaticsSuccess', ({ state }) => {
    return {
      ...state,
      sortStatus: 'success',
    };
  }),
  handleAction('@Automatic/sortAutomaticsFailure', ({ state }) => {
    return {
      ...state,
      sortStatus: 'failure',
    };
  }),
  handleAction('@Automatic/changeTagKey', ({ state, action }) => {
    return {
      ...state,
      tagSearchKey: action.payload,
    };
  }),
  handleAction('@Automatic/getTagsRequest', ({ state }) => {
    const { tagSearchKey, tags } = state;
    return {
      ...state,
      tags: {
        [tagSearchKey]: {
          ...(tags[tagSearchKey] ?? defaultTagsData),
          statusRequest: 'loading',
        },
      },
    };
  }),
  handleAction('@Automatic/getTagsSuccess', ({ state, action }) => {
    const { tagSearchKey, tags } = state;
    const { data, hasNextPage, lastCursor } = action.payload;
    return {
      ...state,
      tags: {
        [tagSearchKey]: {
          ...(tags[tagSearchKey] ?? defaultTagsData),
          statusRequest: 'success',
          data,
          hasNextPage,
          lastCursor,
        },
      },
    };
  }),
  handleAction('@Automatic/getTagsFailure', ({ state }) => {
    const { tagSearchKey, tags } = state;
    return {
      ...state,
      tags: {
        [tagSearchKey]: {
          ...(tags[tagSearchKey] ?? defaultTagsData),
          statusRequest: 'failure',
        },
      },
    };
  }),
  handleAction('@Automatic/loadMoreTagsRequest', ({ state }) => {
    const { tagSearchKey, tags } = state;
    return {
      ...state,
      tags: {
        [tagSearchKey]: {
          ...(tags[tagSearchKey] ?? defaultTagsData),
          statusLoadMore: 'loading',
        },
      },
    };
  }),
  handleAction('@Automatic/loadMoreTagsSuccess', ({ state, action }) => {
    const { tagSearchKey, tags } = state;
    const { data, hasNextPage, lastCursor } = action.payload;
    return {
      ...state,
      tags: {
        [tagSearchKey]: {
          ...(tags[tagSearchKey] ?? defaultTagsData),
          statusLoadMore: 'success',
          data: (tags[tagSearchKey] ?? defaultTagsData).data.concat(data),
          hasNextPage,
          lastCursor,
        },
      },
    };
  }),
  handleAction('@Automatic/loadMoreTagsFailure', ({ state }) => {
    const { tagSearchKey, tags } = state;
    return {
      ...state,
      tags: {
        [tagSearchKey]: {
          ...(tags[tagSearchKey] ?? defaultTagsData),
          statusLoadMore: 'failure',
        },
      },
    };
  }),
]);
