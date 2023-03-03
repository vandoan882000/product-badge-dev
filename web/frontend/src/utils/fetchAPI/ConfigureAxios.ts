import { useAppBridge } from '@shopify/app-bridge-react';
import { getSessionToken } from '@shopify/app-bridge-utils';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type SetInitializationApp = () => {
  app: ReturnType<typeof useAppBridge> | null;
  shopDomain: string | null;
};
interface Configure {
  configure: AxiosRequestConfig;
  setInitializationApp: SetInitializationApp;
}

const { CancelToken } = axios;

export class ConfigureAxios {
  private axiosInstance: AxiosInstance;

  public constructor({ configure, setInitializationApp }: Configure) {
    this.axiosInstance = axios.create(configure);
    this.axiosInstance.interceptors.request.use(async config => {
      const { app, shopDomain } = setInitializationApp();
      if (app && config.url?.includes(app.localOrigin)) {
        const sessionToken = await getSessionToken(app);
        config.headers.Authorization = `Bearer ${sessionToken}`;
        return config;
      }
      if (app && shopDomain) {
        const sessionToken = await getSessionToken(app);
        config.headers.Authorization = `Bearer ${sessionToken}`;
        config.headers['X-ShopName'] = shopDomain;
        return config;
      }
      throw Error(`App chưa đc khởi tạo. ${{ app, shopDomain }}`);
    });
  }

  public create = (cancel = '') => {
    return {
      request: (requestConfig: AxiosRequestConfig) => {
        const source = CancelToken.source();
        const request = this.axiosInstance({ ...requestConfig, cancelToken: source.token });
        if (cancel) {
          // @ts-ignore
          request[cancel] = source.cancel;
        }
        return request;
      },
    };
  };
}
