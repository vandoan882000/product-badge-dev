import { UNINSTALLED_SERVICE_URL } from 'configs/env';
import { reportService } from 'services/ReportService';
import { fetchAPI } from '../fetchAPI';
import { IUninstallAppService, UninstallApp_BEExpectParameters, UninstallApp_BEResponse } from './@types';

class UninstallAppService implements IUninstallAppService {
  url: string;
  constructor() {
    this.url = UNINSTALLED_SERVICE_URL;
  }

  uninstallApp: IUninstallAppService['uninstallApp'] = async ({ shopName }) => {
    const { url } = this;
    try {
      const response = await fetchAPI.request<UninstallApp_BEResponse>({
        url,
        method: 'POST',
        data: { shopName } as UninstallApp_BEExpectParameters,
        headers: { 'X-ShopName': shopName },
      });
      console.log('uninstallApp', response);
      return true;
    } catch (err) {
      reportService.createReportError({
        error: err as Error,
        positionError: 'uninstallApp',
        additionalData: JSON.stringify({ shopName }),
      });
      return false;
    }
  };
}

class FakeUninstallAppService implements IUninstallAppService {
  uninstallApp: IUninstallAppService['uninstallApp'] = async ({ shopName }) => {
    console.log('uninstalled app', { shopName });
    return true;
  };
}

export const uninstallAppService = UNINSTALLED_SERVICE_URL ? new UninstallAppService() : new FakeUninstallAppService();
