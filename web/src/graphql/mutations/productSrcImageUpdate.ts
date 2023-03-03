import { ShopifyGraphqlException } from 'graphql/@consts/Exception';
import { BaseParams } from 'graphql/@types/Session';
import { createClient } from 'graphql/utils';
import { gql, Variables } from 'graphql-request';
import { reportService } from 'services/ReportService';

interface ProductSrcImageUpdateVariables extends Variables {
  productId: string;
  image: {
    id: string;
    src: string;
  };
}

export interface ProductSrcImageResponse {
  productImageUpdate: {
    image: {
      id: string;
      originalSrc: string;
    };
    userErrors: Array<{
      field: string;
      message: string;
    }>;
  };
}

const PRODUCT_SRC_IMAGE_UPDATE = gql`
  mutation productImageUpdate($productId: ID!, $image: ImageInput!) {
    productImageUpdate(productId: $productId, image: $image) {
      image {
        id
        originalSrc
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export interface ProductSrcImageUpdate extends BaseParams {
  variables: ProductSrcImageUpdateVariables;
}
export const productSrcImageUpdate = async ({ session, variables }: ProductSrcImageUpdate) => {
  try {
    const client = createClient(session);
    const res = await client.request<ProductSrcImageResponse, ProductSrcImageUpdateVariables>(
      PRODUCT_SRC_IMAGE_UPDATE,
      variables,
    );
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
