import { LATEST_API_VERSION } from '@shopify/shopify-api';
/**
 * @name @lemanh-tuong
 * DANGER: Những thứ liên quan đến shopify và các service hosting nên không nên update
 */

// Shopify API Version
export const apiVersion = process.env.API_VERSION ?? LATEST_API_VERSION;

// Shopify API Key
export const shopifyApiKey = process.env.SHOPIFY_API_KEY;

// Shopify API Secret
export const shopifyApiSecret = process.env.SHOPIFY_API_SECRET;

// App scopes
export const scopes =
  process.env.SCOPES ||
  'read_analytics,read_assigned_fulfillment_orders,write_assigned_fulfillment_orders,read_customers,write_customers,read_discounts,write_discounts,read_draft_orders,write_draft_orders,read_files,write_files,read_fulfillments,write_fulfillments,read_gdpr_data_request,read_gift_cards,write_gift_cards,read_inventory,write_inventory,read_legal_policies,write_legal_policies,read_locations,read_marketing_events,write_marketing_events,read_merchant_managed_fulfillment_orders,write_merchant_managed_fulfillment_orders,read_online_store_navigation,read_online_store_pages,write_online_store_pages,read_order_edits,write_order_edits,read_orders,write_orders,read_price_rules,write_price_rules,read_products,write_products,read_product_listings,write_product_listings,read_reports,write_reports,read_resource_feedbacks,write_resource_feedbacks,read_shipping,write_shipping,read_shopify_payments_accounts,read_shopify_payments_bank_accounts,read_shopify_payments_disputes,read_shopify_payments_payouts,read_content,write_content,read_themes,write_themes,read_third_party_fulfillment_orders,write_third_party_fulfillment_orders,read_translations,write_translations';

// Base url các apis sẽ được định nghiax
export const baseUrlForApis = '/api';
/**
 * Url sẽ lắng nghe webhook shopify bắn về
 * WARNING: Lưu ý các middlwares khi muốn thay đổi giá trị biến này vì:
    - Các hàm xử lý liên quan đến Shopify đang sử dụng được cung cấp bởi "shopify-api-js" và các hàm này sử dụng "rawRequest" và "rawResponse" để xử lý  
    ==> Có thể gặp lỗi nếu apply middlewares 
    - Ví dụ như middleware "express.json" gây lỗi "Processing webhook request | {apiVersion: , domain: , topic: , webhookId: }, Failed to process webhook: Error: No body was received when processing webhook" 
 */
export const webhookUrl = `/webhooks`;
// Url lắng nghe luồng auth của shopify bắn về
export const authUrl = `/auth`;
// Url lắng nghe luồng auth của shopify bắn về
export const authCallbackUrl = `/auth/callback`;
// Graphql cho client
export const graphqlUrl = `/graphql`;

/** <------------------------------------------------------------------------------------------> */
