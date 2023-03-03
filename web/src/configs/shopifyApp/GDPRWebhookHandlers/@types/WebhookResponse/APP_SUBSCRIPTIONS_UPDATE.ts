/** @see https://shopify.dev/docs/api/admin-rest/2023-01/resources/webhook#event-topics */
export interface APP_SUBSCRIPTIONS_UPDATE {
  app_subscription: {
    admin_graphql_api_id: string;
    name: string;
    status: string;
    admin_graphql_api_shop_id: string;
    created_at: string;
    updated_at: string;
    currency: string;
    capped_amount: any;
  };
}
