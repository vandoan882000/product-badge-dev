import axios from 'axios';
import { ShopifyRestException } from 'rest/@consts/Exception';
import { BaseParams } from 'rest/@types/Session';
import { reportService } from 'services/ReportService';

interface GetThemesResponseSuccess {
  themes: Shopify.Theme[];
}

export type GetActiveTheme = BaseParams;

export const getActiveTheme = async ({ session }: GetActiveTheme) => {
  const { accessToken, apiVersion, shopDomain } = session;
  try {
    const res = await axios.request<GetThemesResponseSuccess>({
      url: `https://${shopDomain}/admin/api/${apiVersion}/themes.json`,
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
    });
    const activeTheme = res.data.themes.find(theme => theme.role === 'main');
    return activeTheme;
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
