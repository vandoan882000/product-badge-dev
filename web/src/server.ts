import compression from 'compression';
import { baseUrlForApis, GDPRWebhookHandlers, graphqlUrl, ShopifyApp, staticPath } from 'configs';
import express from 'express';
import { apiRouter } from 'routes';
import serveStatic from 'serve-static';
import { readFileSync } from 'fs';
import { join } from 'path';

export const app = express();

/** <------------------------------------------------------------------------------------------> */

/**
 * @name @lemanh-tuong
 * DANGER: Những thứ liên quan đến shopify và các service hosting nên không nên update
 */
/** <---------- Shopify ----------> */
// Set up Shopify authentication and webhook handling
app.get(ShopifyApp.config.auth.path, ShopifyApp.auth.begin());
app.get(ShopifyApp.config.auth.callbackPath, ShopifyApp.auth.callback(), ShopifyApp.redirectToShopifyOrAppRoot());
app.post(ShopifyApp.config.webhooks.path, ShopifyApp.processWebhooks({ webhookHandlers: GDPRWebhookHandlers }));
app.post(graphqlUrl, ShopifyApp.validateAuthenticatedSession(), express.json(), ShopifyApp.graphqlController); // Graphql client
/** <------------------------------------------------------------------------------------------> */

// START_EDIT:
/** <---------- APIs - General Middlewares ----------> */
/**
 * WARNING:
    - Các hàm xử lý liên quan đến Shopify đang sử dụng được cung cấp bởi "shopify-api-js" và các hàm này sử dụng "rawRequest" và "rawResponse" để xử lý  
    ==> Có thể gặp lỗi nếu apply middlewares 
    - Ví dụ như middleware "express.json" gây lỗi "Processing webhook request | {apiVersion: , domain: , topic: , webhookId: }, Failed to process webhook: Error: No body was received when processing webhook" 
 */
app.use(`${baseUrlForApis}/*`, ShopifyApp.validateAuthenticatedSession()); // All endpoints after this point will require an active session
app.use(`${baseUrlForApis}/*`, express.json(), compression());
/** <------------------------------------------------------------------------------------------> */

// START_EDIT:
/** <---------- APIs - Routes ----------> */
app.use(baseUrlForApis, apiRouter);
/** <------------------------------------------------------------------------------------------> */

/**
 * @name @lemanh-tuong
 * DANGER: Những thứ liên quan đến shopify và các service hosting nên không nên update
 */
/** <----------  Client ----------> */
app.use(serveStatic(staticPath, { index: false }));
app.use('/*', ShopifyApp.ensureInstalledOnShop(), async (_, res) => {
  return res
    .status(200)
    .set('Content-Type', 'text/html')
    .send(readFileSync(join(staticPath, 'index.html')));
});
/** <------------------------------------------------------------------------------------------> */
