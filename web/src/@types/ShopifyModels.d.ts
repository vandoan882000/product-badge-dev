/**
 * Định nghĩa type model của shopify
 * Yêu cầu:
      - Đúng theo tài liệu của shopify
      - Readonly ra readonly
      - Kèm theo link docs với mỗi model
*/
declare global {
  declare namespace Shopify {
    // https://shopify.dev/docs/api/admin-rest/2022-10/resources/metafield#resource-object
    declare interface MetaField {
      readonly created_at: string;
      description: string;
      readonly id: number;
      key: string;
      namespace: string;
      owner_id: number;
      owner_resource: string;
      readonly updated_at: string;
      value: any; // "value" đi theo "type" => https://shopify.dev/docs/apps/custom-data/metafields/types#supported-types
      type: string; // Khá nhiều ENUM kèm type của "value" đi theo => https://shopify.dev/docs/apps/custom-data/metafields/types#supported-types
    }

    // https://shopify.dev/docs/api/admin-rest/2022-10/resources/theme#resource-object
    declare interface Theme {
      readonly created_at: string;
      readonly id: number;
      name: string;
      readonly previewable: boolean;
      readonly processing: boolean;
      role: 'main' | 'unpublished' | 'demo' | 'development'; // https://shopify.dev/docs/api/admin-rest/2022-10/resources/theme#resource-object
      readonly theme_store_id: boolean;
      readonly updated_at: string;
    }

    // https://shopify.dev/docs/api/admin-rest/2022-10/resources/asset#resource-object
    declare interface Asset {
      readonly checksum: string | null;
      readonly content_type: string;
      readonly created_at: string;
      key: string;
      readonly public_url: string | null;
      readonly size: number;
      readonly theme_id: number;
      readonly updated_at: string;
      value: string;
    }
  }
}

export {};
