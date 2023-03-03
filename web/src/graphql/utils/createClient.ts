import { Session } from 'graphql/@types/Session';
import { GraphQLClient } from 'graphql-request';

export const createClient = ({ shopDomain, accessToken, apiVersion }: Session) => {
  return new GraphQLClient(`https://${shopDomain}/admin/api/${apiVersion}/graphql.json`, {
    headers: {
      'X-Shopify-Access-Token': accessToken,
      'User-Agent': `shopify-app-node ${process.env.npm_package_version} | Shopify App CLI`,
    },
  });
};
