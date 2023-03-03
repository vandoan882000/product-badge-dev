import { AXIOS_BASE_URL } from 'configs/env';
import qs from 'qs';
import { CANCEL } from 'redux-saga';
import { store } from 'store/configureStore';
import { ConfigureAxios } from './ConfigureAxios';

const axiosConfig = new ConfigureAxios({
  configure: {
    method: 'GET',
    baseURL: AXIOS_BASE_URL,
    timeout: 30000,
    paramsSerializer: qs.stringify,
  },
  setInitializationApp: () => {
    return {
      app: store.getState().initialization.appBridge,
      shopDomain: store.getState().initialization.shopDomain,
    };
  },
});

export const fetchAPI = axiosConfig.create(CANCEL);
