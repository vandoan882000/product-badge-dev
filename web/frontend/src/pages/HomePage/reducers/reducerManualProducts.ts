import { ActionTypes, createReducer, handleAction } from 'wiloke-react-core/utils';
import { changeActiveKey, getManualProducts, loadmoreManualProducts } from '../actions/actionManualProducts';
import { ResponseSuccess } from '../ProductAPI';

interface StateData {
  statusRequest: Status;
  statusLoadmore: Status;
  products: ResponseSuccess['data']['items'];
  lastCursor: string;
  hasNextPage: boolean;
}

interface State {
  data: Record<string, StateData | undefined>;
  activeKey: string;
}

type Actions = ActionTypes<typeof getManualProducts | typeof loadmoreManualProducts | typeof changeActiveKey>;

const defaultData: StateData = {
  statusRequest: 'idle',
  statusLoadmore: 'idle',
  products: [],
  lastCursor: '',
  hasNextPage: false,
};

const defaultState: State = {
  data: {},
  activeKey: '',
};

export const reducerManualProducts = createReducer<State, Actions>(defaultState, [
  handleAction('@ManualProducts/changeActiveKey', ({ state, action }) => {
    return {
      ...state,
      activeKey: action.payload,
    };
  }),
  handleAction('@ManualProducts/getManualProductsRequest', ({ state }) => {
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
  handleAction('@ManualProducts/getManualProductsSuccess', ({ state, action }) => {
    const { activeKey, data } = state;
    const { products, hasNextPage, lastCursor } = action.payload;
    return {
      ...state,
      data: {
        ...data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusRequest: 'success',
          products,
          hasNextPage,
          lastCursor,
        },
      },
    };
  }),
  handleAction('@ManualProducts/getManualProductsFailure', ({ state }) => {
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
  handleAction('@ManualProducts/getManualProductsCancel', ({ state }) => {
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
  handleAction('@ManualProducts/loadmoreManualProductsRequest', ({ state }) => {
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
  handleAction('@ManualProducts/loadmoreManualProductsSuccess', ({ state, action }) => {
    const { activeKey, data } = state;
    const { products, hasNextPage, lastCursor } = action.payload;
    return {
      ...state,
      data: {
        ...state.data,
        [activeKey]: {
          ...(data[activeKey] ?? defaultData),
          statusLoadmore: 'success',
          products: (data[activeKey] ?? defaultData).products.concat(products),
          lastCursor,
          hasNextPage,
        },
      },
    };
  }),
  handleAction('@ManualProducts/loadmoreManualProductsFailure', ({ state }) => {
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
  handleAction('@ManualProducts/loadmoreManualProductsCancel', ({ state }) => {
    const { activeKey, data } = state;
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
