import { getSessionToken } from '@shopify/app-bridge-utils';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { axiosHeadersToFetchHeaders } from 'utils/axiosHeadersToFetchHeaders';
import { checkHeadersForReauthorization } from 'utils/checkHeadersForReauthorization';

interface Configure {
  configure: AxiosRequestConfig;
}

const { CancelToken } = axios;

export class ConfigureAxios {
  private axiosInstance: AxiosInstance;

  public constructor({ configure }: Configure) {
    this.axiosInstance = axios.create(configure);

    this.axiosInstance.interceptors.request.use(async config => {
      const { store } = await import('store/configureStore');
      const state = store.getState();
      const appBridge = state.initialization.appBridge;
      const shopDomain = state.initialization.shopDomain;
      if (!appBridge) {
        throw new Error('App chưa đc khởi tạo');
      }
      const sessionToken = await getSessionToken(appBridge);
      config.headers.Authorization = `Bearer ${sessionToken}`;

      if (!config.url?.includes('app-recommendations')) {
        config.headers['X-ShopName'] = shopDomain;
      }
      return config;
    });

    // WARNING: Update điều kiện check reauthorization nếu cần
    this.axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        const error_ = error as AxiosError;
        if (error_.isAxiosError) {
          const { store } = await import('store/configureStore');
          const state = store.getState();
          const appBridge = state.initialization.appBridge;
          const fullUrl = axios.getUri(error_.config);
          if (appBridge && fullUrl.includes(appBridge.localOrigin)) {
            const headers = axiosHeadersToFetchHeaders(error_.response?.headers);
            checkHeadersForReauthorization(headers, appBridge);
          }
        }
        return Promise.reject(error);
      },
    );
  }

  public create = (cancel = '') => {
    return {
      request: (requestConfig: AxiosRequestConfig) => {
        const source = CancelToken.source();
        const request = this.axiosInstance({
          ...requestConfig,
          cancelToken: source.token,
          headers: { ...requestConfig.headers },
        });
        if (cancel) {
          // @ts-ignore
          request[cancel] = source.cancel;
        }
        return request;
      },
    };
  };
}
