import { DeliveryMethod } from '@shopify/shopify-api';
import { WebhookHandlersParam } from '@shopify/shopify-app-express';
import { webhookUrl } from 'configs/env';
import { reportService } from 'services';
import { bulkService, pricingService, uninstallAppService } from 'services/NguyenDttnServices';
import { APP_SUBSCRIPTIONS_UPDATE, WebhookTopics } from './@types';

// START_EDIT:
/** Register webhook shopify */
export const GDPRWebhookHandlers: Partial<Record<WebhookTopics, WebhookHandlersParam[string]>> = {
  APP_UNINSTALLED: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: webhookUrl,
    callback: async (topic, shop, body) => {
      try {
        await uninstallAppService.uninstallApp({ shopName: shop });
      } catch (err) {
        reportService.createReportError({
          error: err as Error,
          positionError: 'APP_UNINSTALLED',
          additionalData: JSON.stringify({ topic, shop, body }),
        });
      }
    },
  },
  APP_SUBSCRIPTIONS_UPDATE: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: webhookUrl,
    callback: async (topic, shop, body) => {
      try {
        const data = JSON.parse(body) as APP_SUBSCRIPTIONS_UPDATE;
        await pricingService.updatePricing({ shopName: shop, body: data.app_subscription });
      } catch (err) {
        reportService.createReportError({
          error: err as Error,
          positionError: 'APP_SUBSCRIPTIONS_UPDATE',
          additionalData: JSON.stringify({ topic, shop, body }),
        });
      }
    },
  },
  BULK_OPERATIONS_FINISH: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: webhookUrl,
    callback: async (topic, shop, body) => {
      try {
        await bulkService.pushBulk({ shopName: shop, data: body });
      } catch (err) {
        reportService.createReportError({
          error: err as Error,
          positionError: 'BULK_OPERATIONS_FINISH',
          additionalData: JSON.stringify({ topic, shop, body }),
        });
      }
    },
  },
};
