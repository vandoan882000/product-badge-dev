import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { fetchAPINoAuth } from 'utils';

export interface BE_PageClient {
  commandId: string;
  parentCommandId?: string;
  label: string;
  image?: {
    src: string;
    width: number;
    height: number;
  };
  sectionCommandIds: string[];
  type: string;
}

interface RequestGetPagesClient {
  pageType?: string;
  label?: string;
  enable?: boolean;
  size: number;
}

interface GetClients extends RequestGetPagesClient {
  type: 'GET FIRST PAGE';
  userId?: number;
}
interface LoadmoreClients extends RequestGetPagesClient {
  type: 'LOADMORE';
  /** Cursor để loadmore */
  lastCursor: string;
  userId?: number;
}

/** API được sử dụng để lấy về dữ liệu của page client */
export const getClients = async ({
  type,
  pageType,
  enable,
  userId,
  label,
  size,
  ...params
}: GetClients | LoadmoreClients) => {
  interface ResponseSuccess {
    message: string;
    info: BE_PageClient[];
  }

  let requestConfig: AxiosRequestConfig = {};

  if (type === 'GET FIRST PAGE') {
    requestConfig = {
      url: `clients/me/pages/search`,
      params: {
        type: pageType,
        enable,
        label: label === '' ? undefined : label,
        userId,
        group: 'GENERAL',
        size,
      },
      headers: {
        Authorization: '',
      },
    };
  } else {
    const { lastCursor } = params as LoadmoreClients;
    requestConfig = {
      url: `clients/me/pages/search`,
      params: {
        after: lastCursor,
        type: pageType,
        enable,
        label: label === '' ? undefined : label,
        userId,
        group: 'GENERAL',
        size,
      },
      headers: {
        Authorization: '',
      },
    };
  }
  const response: AxiosResponse<ResponseSuccess> = await fetchAPINoAuth.request(requestConfig);
  return response.data;
};

export const pageService = {
  getClients,
};
