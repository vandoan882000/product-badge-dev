import axios from 'axios';
import { ShopifyRestException } from 'rest/@consts/Exception';
import { BaseParams } from 'rest/@types/Session';
import { reportService } from 'services/ReportService';

interface ResponseSuccess {
  metafield: Shopify.MetaField;
}

export interface CreateMetafield extends BaseParams {
  data: Pick<Shopify.MetaField, 'namespace' | 'key' | 'value' | 'type'>;
}

export const createMetafield = async ({ session, data }: CreateMetafield) => {
  const { accessToken, apiVersion, shopDomain } = session;
  try {
    const response = await axios.request<ResponseSuccess>({
      url: `https://${shopDomain}/admin/api/${apiVersion}/metafields.json`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      data: {
        metafield: data,
      },
    });
    return response.data.metafield;
  } catch (error) {
    const error_ = error as Error;
    reportService.createReportError({
      error: error_,
      positionError: __filename,
      additionalData: JSON.stringify(session),
    });
    throw new ShopifyRestException(error_);
  }
};
