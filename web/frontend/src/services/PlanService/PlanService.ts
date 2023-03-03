import { AxiosResponse } from 'axios';
import { fetchAPINoAuth } from 'utils';

export interface UserPlan {
  commandId: string;
  name: string;
  handle: string;
  price: number;
  yearlyPrice: number;
  trialDays: number;
  pageTypes: string[];
  numberOfSections: number;
  numberOfPages: number;
  description?: string;
  allowedThemeAtomCommandIds?: string[];
  createdDateTimestamp?: number;
  modifiedDateTimestamp?: number;
}

const getPlans = async () => {
  interface ResponseSuccess {
    info: UserPlan[];
    message: string;
  }

  const response: AxiosResponse<ResponseSuccess> = await fetchAPINoAuth.request({
    url: `clients/publish/plans`,
    method: 'GET',
  });
  return response.data;
};

const goToShopifyPayment = async ({
  coupon,
  planHandle,
  returnUrl,
  yearly,
}: {
  planHandle: string;
  /** url hiện tại ở trên thanh bar */
  returnUrl: string;
  coupon: string;
  yearly: boolean;
}) => {
  interface ResponseSuccess {
    info: {
      confirmation_url: string;
    };
    message: string;
    status: string;
  }

  const response: AxiosResponse<ResponseSuccess> = await fetchAPINoAuth.request({
    url: `clients/me/charges`,
    method: 'POST',
    data: {
      coupon: coupon === '' ? undefined : coupon,
      planHandle,
      returnUrl,
      yearly,
    },
  });

  return response.data;
};

const downgradeToFree = async () => {
  interface ResponseSuccess {
    info: {
      confirmation_url: string;
    };
    message: string;
    status: string;
  }

  const response: AxiosResponse<ResponseSuccess> = await fetchAPINoAuth.request({
    url: `users/subscriptions/free`,
    method: 'PUT',
  });

  return response;
};

const getUserInfo = async () => {
  interface GetUserInfoResponse {
    message: string;
    info: {
      id: number;
      username: string;
      email: string;
      password: string;
      roles: Array<{ id: number; name: string }>;
      shopName?: string;
      planHandle?: string;
    };
  }

  const response: AxiosResponse<GetUserInfoResponse> = await fetchAPINoAuth.request({
    url: `users/me/shopify/info`,
  });

  return response.data;
};

export const planService = {
  getPlans,
  goToShopifyPayment,
  downgradeToFree,
  getUserInfo,
};
