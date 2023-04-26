import { HttpStatusCode } from '@constants';
import { apiVersion } from 'configs';
import { getShopProperties, ShopifyGraphqlException } from 'graphql';
import { getActiveTheme, getAppExtensionStatusActive, ShopifyRestException } from 'rest';
import { reportService } from 'services/ReportService';
import { getSessionAfterVerify } from 'utils';

type ResponseError = Express.BaseResponseError;

interface ResponseSuccess {
  /** Để sử dụng cho tidio chat - để biết đc user nào gửi tin nhắn */
  email: string;
  /** Để sử dụng cho tidio chat - để biết đc user nào gửi tin nhắn */
  myshopifyDomain: string;
  /** Để sử dụng cho tính năng redirect đến shopify editor - nơi active theme app extension */
  themeId: number | undefined | null;
  /** Để hiển thị thông báo có cần active theme app extension hay không */
  appExtensionActived: boolean;
  currencyFormats: {
    moneyFormat: string;
  };
}

export const getData: Express.QueryRequestHandler<ResponseSuccess | ResponseError> = async (_, response) => {
  try {
    const session = getSessionAfterVerify(response);
    const [shopPropertiesResponse, activeTheme] = await Promise.all([
      getShopProperties({
        session: {
          accessToken: session.accessToken,
          shopDomain: session.shop,
          apiVersion: apiVersion,
        },
      }),
      getActiveTheme({
        session: {
          accessToken: session.accessToken,
          shopDomain: session.shop,
          apiVersion: apiVersion,
        },
      }),
    ]);
    const actvied = await getAppExtensionStatusActive({
      session: {
        accessToken: session.accessToken,
        shopDomain: session.shop,
        apiVersion: apiVersion,
      },
      themeId: activeTheme?.id,
    });
    response.status(HttpStatusCode.OK);
    response.json({
      themeId: activeTheme?.id,
      appExtensionActived: actvied,
      email: shopPropertiesResponse.shop.email,
      myshopifyDomain: shopPropertiesResponse.shop.myshopifyDomain,
      currencyFormats: shopPropertiesResponse.shop.currencyFormats,
    });
  } catch (error) {
    if (error instanceof ShopifyRestException) {
      reportService.createReportError({
        error: error,
        positionError: __filename,
        additionalData: JSON.stringify(error.shopifyResponse),
      });
      if (error.isAuthenticationError) {
        response.status(HttpStatusCode.UNAUTHORIZED);
        response.json({
          message: 'Authentication is required',
          exceptionName: ShopifyRestException.name,
        });
      } else {
        response.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
        response.json({
          message: 'Internal Server Error',
          exceptionName: ShopifyRestException.name,
        });
      }
    } else if (error instanceof ShopifyGraphqlException) {
      reportService.createReportError({
        error: error,
        positionError: __filename,
        additionalData: JSON.stringify(error),
      });
      response.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      response.json({
        message: 'Internal Server Error',
        exceptionName: ShopifyGraphqlException.name,
      });
    } else if (error instanceof Error) {
      reportService.createReportError({
        error: error,
        positionError: __filename,
        additionalData: JSON.stringify(error),
      });
      response.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
      response.json({
        message: 'Internal Server Error',
        exceptionName: Error.name,
      });
    }
  }
};
