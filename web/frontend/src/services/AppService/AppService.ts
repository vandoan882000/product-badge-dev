import { AxiosResponse } from 'axios';
import { APP_SETTINGS_URL } from 'env';
import { fetchAPINoAuth } from 'utils';
import { AppSettingsResponse } from './type';

const getAppSettings = async () => {
  const response: AxiosResponse<AppSettingsResponse> = await fetchAPINoAuth.request({
    url: APP_SETTINGS_URL,
  });
  return response.data;
};

export const appSettingsService = {
  getAppSettings,
};
