import axios from 'axios';
import { ShopifyRestException } from 'rest/@consts/Exception';
import { BaseParams } from 'rest/@types/Session';
import { reportService } from 'services/ReportService';

interface GetMetafield extends BaseParams {
  data: {
    namespace: string;
    key: string;
    type: string;
  };
}

interface ShopifyGetMetaFields {
  metafields: Shopify.MetaField[] | null;
}

export const getMetafield = async ({ data, session }: GetMetafield) => {
  const { accessToken, apiVersion, shopDomain } = session;
  try {
    const res = await axios.request<ShopifyGetMetaFields>({
      url: `https://${shopDomain}/admin/api/${apiVersion}/metafields.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      params: data,
    });
    return res.data.metafields?.find(metafield => metafield.namespace === data.namespace && metafield.key === data.key);
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
