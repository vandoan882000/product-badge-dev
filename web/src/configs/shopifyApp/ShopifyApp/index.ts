import { HttpStatusCode } from '@constants';
import { ApiVersion } from '@shopify/shopify-api';
import '@shopify/shopify-api/adapters/node';
import { restResources } from '@shopify/shopify-api/rest/admin/2023-01';
import { shopifyApp as shopifyAppExpress, ShopifyApp as ShopifyAppExpress } from '@shopify/shopify-app-express';
import {
  apiVersion,
  authCallbackUrl,
  authUrl,
  host,
  scopes,
  shopifyApiKey,
  shopifyApiSecret,
  webhookUrl,
} from 'configs/env';
import { sessionStorage } from 'configs/storage';
import { reportService } from 'services';
import { getSessionAfterVerify } from 'utils';

type TShopifyApp = ShopifyAppExpress & {
  graphqlController: Express.QueryRequestHandler;
};

/**
 * @name @lemanh-tuong
 * DANGER: Những thứ liên quan đến shopify và các service hosting nên không nên update
 * @see https://github.com/Shopify/shopify-app-js/blob/main/packages/shopify-app-express/docs/reference/shopifyApp.md
 */
export const ShopifyApp: TShopifyApp = {
  ...shopifyAppExpress({
    api: {
      apiVersion: apiVersion as ApiVersion,
      restResources,
      apiKey: shopifyApiKey,
      apiSecretKey: shopifyApiSecret,
      hostName: host,
      scopes: scopes.split(','),
      hostScheme: 'https',
      isEmbeddedApp: true,
      billing: {
        // START_EDIT:
        // // The transactions with Shopify will always be marked as test transactions, unless NODE_ENV is production.
        // // See the ensureBilling helper to learn more about billing in this template.
        // 'My Shopify One-Time Charge': {
        //   // This is an example configuration that would do a one-time charge for $5 (only USD is currently supported)
        //   amount: 5.0,
        //   currencyCode: 'USD',
        //   interval: BillingInterval.OneTime,
        // },
      },
    },
    auth: {
      path: authUrl,
      callbackPath: authCallbackUrl,
    },
    webhooks: {
      path: webhookUrl,
    },
    sessionStorage: sessionStorage,
    // START_EDIT:
    useOnlineTokens: false,
    exitIframePath: '/exitiframe',
  }),
  graphqlController: async (req, res) => {
    try {
      const session = getSessionAfterVerify(res);
      const client = new ShopifyApp.api.clients.Graphql({ session });
      const response = await client.query({ data: req.body });
      res.json(response.body);
    } catch (error) {
      if (error instanceof Error) {
        reportService.createReportError({
          error,
          positionError: __filename,
          additionalData: JSON.stringify({ body: req.body, headers: req.headers }),
        });
      }
      res.status(HttpStatusCode.BAD_REQUEST);
      res.json({
        message: error,
        exceptionName: 'Error',
      } as Express.BaseResponseError);
    }
  },
};
/** <------------------------------------------------------------------------------------------> */
