import { BULK_SERVICE_URL, BULK_TOKEN_FOR_SERVICE } from 'configs/env';
import { reportService } from 'services/ReportService';
import { fetchAPI } from '../fetchAPI';
import { IBulkService, PushBulk_BEExpectParams } from './@types';

class BulkService implements IBulkService {
  url: string;
  constructor() {
    this.url = BULK_SERVICE_URL;
  }
  pushBulk: IBulkService['pushBulk'] = async ({ shopName, data }) => {
    const { url } = this;
    try {
      await fetchAPI.request({
        url,
        method: 'POST',
        headers: {
          'X-ShopName': shopName,
          Authorization: BULK_TOKEN_FOR_SERVICE,
        },
        data: { shopName, data } as PushBulk_BEExpectParams,
      });
      return true;
    } catch (err) {
      reportService.createReportError({
        error: err as Error,
        positionError: 'pushBulk',
        additionalData: JSON.stringify({ shopName, data }),
      });
      return false;
    }
  };
}

class FakeBulkService implements IBulkService {
  pushBulk: IBulkService['pushBulk'] = async () => {
    return true;
  };
}

export const bulkService = BULK_SERVICE_URL ? new BulkService() : new FakeBulkService();
