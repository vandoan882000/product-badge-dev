type HTML = string;

export interface IntegrationApp {
  featuredImage: string;
  description: HTML;
  features?: string[];
  buttonText?: string;
  buttonLink: string;
}

// Được lấy từ shopify app store
// https://apps.shopify.com/myshopkit-insert-code
export type AppSlug =
  | 'multi-currency-myshopkit'
  | 'magic-badges-myshopkit'
  | 'image-optimizer-myshopkit'
  | 'popup-smartbar-slidein'
  | 'veda-page-builder'
  | 'myshopkit-insert-code';
