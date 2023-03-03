import { ShopifyGraphqlException } from 'graphql/@consts/Exception';
import { BaseParams } from 'graphql/@types/Session';
import { createClient } from 'graphql/utils';
import { gql } from 'graphql-request';
import { reportService } from 'services/ReportService';

export interface Response {
  shop: {
    name: string;
    email: string;
    myshopifyDomain: string;
    currencyFormats: {
      moneyFormat: string;
    };
  };
}

const GET_SHOP_PROPERTIES = gql`
  query {
    shop {
      name
      myshopifyDomain
      email
      currencyFormats {
        moneyFormat
      }
    }
  }
`;

type GetShopProperties = BaseParams;
export const getShopProperties = async ({ session }: GetShopProperties) => {
  try {
    const client = createClient(session);
    const res = await client.request<Response>(GET_SHOP_PROPERTIES);
    return res;
  } catch (error) {
    const error_ = error as Error;
    reportService.createReportError({
      error: error_,
      positionError: __filename,
      additionalData: JSON.stringify(session),
    });
    throw new ShopifyGraphqlException();
  }
};
