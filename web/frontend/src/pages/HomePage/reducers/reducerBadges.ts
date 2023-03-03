import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { changeActiveKey, getBadges, getVariantBadges, loadmoreBadges } from '../actions/actionBadges';
import { ResponseSuccess } from '../BadgeAPI';

interface StateData {
  statusRequest: Status;
  statusLoadmore: Status;
  badges: ResponseSuccess['data']['items'];
  currentPage: number;
  maxPage: number;
  variantBadges: ResponseSuccess['data']['items'];
  statusVariant: Status;
}

interface State {
  data: Record<string, StateData | undefined>;
  activeKey: string;
}

type Actions = ActionTypes<typeof getBadges | typeof loadmoreBadges | typeof changeActiveKey | typeof getVariantBadges>;

const defaultData: StateData = {
  statusRequest: 'idle',
  statusLoadmore: 'idle',
  badges: [],
  variantBadges: [],
  currentPage: 1,
  maxPage: 1,
  statusVariant: 'idle',
};

const defaultState: State = {
  data: {},
  activeKey: '',
};

export const reducerBadges = createReducer<State, Actions>(defaultState, [
  handleAction('@Badges/changeActiveKey', ({ state, action }) => {
    return {
      ...state,
      activeKey: action.payload,
    };
  }),
  handleAction('@Badges/getBadgesRequest', ({ state }) => {
    const { activeKey, data } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusRequest: 'loading',
        },
      },
    };
  }),
  handleAction('@Badges/getBadgesSuccess', ({ state, action }) => {
    const { activeKey, data } = state;
    const { badges, maxPage, page } = action.payload;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusRequest: 'success',
          badges,
          maxPage,
          currentPage: page,
        },
      },
    };
  }),
  handleAction('@Badges/getBadgesFailure', ({ state }) => {
    const { activeKey, data } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusRequest: 'failure',
        },
      },
    };
  }),
  handleAction('@Badges/getVariantBadgesRequest', ({ state }) => {
    const { activeKey, data } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusVariant: 'loading',
        },
      },
    };
  }),
  handleAction('@Badges/getVariantBadgesSuccess', ({ state, action }) => {
    const { activeKey, data } = state;
    const { badges } = action.payload;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusVariant: 'success',
          variantBadges: badges,
        },
      },
    };
  }),
  handleAction('@Badges/getVariantBadgesFailure', ({ state }) => {
    const { activeKey, data } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusVariant: 'failure',
        },
      },
    };
  }),
  handleAction('@Badges/getBadgesCancel', ({ state }) => {
    const { data, activeKey } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusRequest: 'idle',
        },
      },
    };
  }),
  handleAction('@Badges/loadmoreBadgesRequest', ({ state }) => {
    const { activeKey, data } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusLoadmore: 'loading',
        },
      },
    };
  }),
  handleAction('@Badges/loadmoreBadgesSuccess', ({ state, action }) => {
    const { activeKey, data } = state;
    const { badges, maxPage, page } = action.payload;
    return {
      ...state,
      data: {
        ...state.data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusLoadmore: 'success',
          badges: (data[activeKey] ?? defaultData).badges.concat(badges),
          currentPage: page,
          maxPage,
        },
      },
    };
  }),
  handleAction('@Badges/loadmoreBadgesFailure', ({ state }) => {
    const { activeKey, data } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusLoadmore: 'failure',
        },
      },
    };
  }),
  handleAction('@Badges/loadmoreBadgesCancel', ({ state }) => {
    const { data, activeKey } = state;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusLoadmore: 'idle',
        },
      },
    };
  }),
]);
