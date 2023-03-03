import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { fetchAPINoAuth } from 'utils';

export interface BE_ThemeClient {
  commandId: string;
  parentCommandId: string;
  label: string;
  featuredImage: string;
  /** CommandId của các page thuộc theme */
  pageCommandIds: string[];
  isShopifyTheme: boolean;
}

interface GetClients {
  type: 'GET FIRST PAGE';
  size: number;
}
interface LoadmoreClients {
  type: 'LOADMORE';
  /** Cursor để loadmore */
  lastCursor: string;
  size: number;
}

interface ResponseSuccess {
  message: string;
  info: BE_ThemeClient[];
}

/** API được sử dụng để lấy về dữ liệu của theme client */
export const getClients = async ({ type, size, ...params }: GetClients | LoadmoreClients) => {
  let requestConfig: AxiosRequestConfig = {};
  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `clients/me/themes/search`,
      params: {
        size,
      },
    };
  } else {
    const { lastCursor } = params as LoadmoreClients;
    requestConfig = {
      url: `clients/me/themes/search`,
      params: {
        after: lastCursor,
        size,
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPINoAuth.request(requestConfig);
  return response.data;
};

export const themeService = { getClients };
