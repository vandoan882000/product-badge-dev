import axios, { AxiosInstance } from 'axios';
import { SESSION_TOKEN_SERVICE_BASE_URL, SESSION_TOKEN_SERVICE_SECRET_KEY } from 'configs';
import { reportService } from 'services/ReportService';
import { encodeBase64, retry } from 'utils';
import {
  DeleteSessionToken_Response,
  GetSessionTokens_Response,
  ISessionTokenService,
  UpdateSessionToken_Response,
} from './@types';

class SessionTokenSerice implements ISessionTokenService {
  axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: SESSION_TOKEN_SERVICE_BASE_URL,
    });
    this.axiosInstance.interceptors.request.use(config => {
      const encryptToken = `${SESSION_TOKEN_SERVICE_SECRET_KEY}:${Date.now()}`;
      config.headers.Authorization = `Bearer ${encodeBase64(encryptToken)}`;
      return config;
    });
  }

  updateSessionToken: ISessionTokenService['updateSessionToken'] = async session => {
    try {
      const response = await retry(() => {
        return this.axiosInstance.request<UpdateSessionToken_Response>({
          method: 'PUT',
          url: `/myshopkit/v1/ebase/users/publish/session-tokens`,
          data: session,
        });
      });
      console.log(response);
      console.log(111, response);
      return true;
    } catch (error) {
      console.log(222, error);
      if (error instanceof Error) {
        reportService.createReportError({
          positionError: __filename,
          error: error,
          additionalData: JSON.stringify({ session }),
        });
      }
      return false;
    }
  };

  deleteSessionToken: ISessionTokenService['deleteSessionToken'] = async ({ feId }) => {
    try {
      await retry(() => {
        return this.axiosInstance.request<DeleteSessionToken_Response>({
          method: 'DELETE',
          url: `/myshopkit/v1/ebase/users/publish/session-tokens/${feId}`,
        });
      });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        reportService.createReportError({
          positionError: __filename,
          error: error,
          additionalData: JSON.stringify({ feId }),
        });
      }
      return false;
    }
  };

  deleteListSessionTokens: ISessionTokenService['deleteListSessionTokens'] = async ({ feIds }) => {
    try {
      await retry(() => {
        return this.axiosInstance.request<DeleteSessionToken_Response>({
          method: 'DELETE',
          url: '/myshopkit/v1/ebase/users/publish/session-tokens',
          params: {
            feIds,
          },
        });
      });
      return true;
    } catch (error) {
      if (error instanceof Error) {
        reportService.createReportError({
          positionError: __filename,
          error: error,
          additionalData: JSON.stringify({ feIds }),
        });
      }
      return false;
    }
  };

  getSessionTokens: ISessionTokenService['getSessionTokens'] = async ({ feId, shop }) => {
    try {
      const response = await retry(() => {
        console.log(
          this.axiosInstance.request<GetSessionTokens_Response>({
            url: '/myshopkit/v1/ebase/users/publish/session-tokens',
            params: {
              feId,
              shop,
            },
          }),
          111,
        );
        return this.axiosInstance.request<GetSessionTokens_Response>({
          url: '/myshopkit/v1/ebase/users/publish/session-tokens',
          params: {
            feId,
            shop,
          },
        });
      });
      console.log(333, response);
      return response.data.data;
    } catch (error) {
      console.log(444, error);
      if (error instanceof Error) {
        reportService.createReportError({
          positionError: __filename,
          error: error,
          additionalData: JSON.stringify({ feId, shop }),
        });
      }
      return undefined;
    }
  };
}

export const sessionTokenSerice = new SessionTokenSerice();
