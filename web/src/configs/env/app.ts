// Port mà server node sẽ chạy
export const port = parseInt(process.env.BACKEND_PORT || process.env.PORT || '8080', 10);

// WARNING: Update nếu có sự thay đổi cấu trúc thư mục
// Đường dẫn đến directory frontend
export const staticPath =
  process.env.NODE_ENV === 'production' ? `${process.cwd()}/web/frontend/dist` : `${process.cwd()}/frontend/`;

// Full domain của app
export const host = process.env.HOST ? process.env.HOST.replace(/https?:\/\//, '') : 'localhost';

// Tên của app
export const appName = process.env._____ADDITIONAL_VARIABLE______APP_NAME;

// Dùng để check app extension đang được active hay không
export const appEmbedExtensionUuid = process.env._____ADDITIONAL_VARIABLE______APP_EMBED_EXTENSION_UUID;

// Service gọi khi webhook gỡ app được shopify bắn về
export const UNINSTALLED_SERVICE_URL: string = process.env._____ADDITIONAL_VARIABLE______UNINSTALLED_SERVICE_URL;

// BULK SERVICE
export const BULK_SERVICE_URL: string = process.env._____ADDITIONAL_VARIABLE______BULK_SERVICE_URL;
export const BULK_TOKEN_FOR_SERVICE: string = process.env._____ADDITIONAL_VARIABLE______BULK_TOKEN_FOR_SERVICE;

// Pricing Service
export const PRICING_SERVICE_URL: string = process.env._____ADDITIONAL_VARIABLE______PRICING_SERVICE_URL;

// SECRETKEY để tạo token bắn lên BE tại những api không có gì để bắn lên cho BE ngoài shopName
export const SECRET_KEY_OF_SERVICE: string = process.env._____ADDITIONAL_VARIABLE______SECRET_KEY_OF_SERVICE;

// Session storage
export const SESSION_TOKEN_SERVICE_BASE_URL = process.env._____ADDITIONAL_VARIABLE______SESSION_TOKEN_SERVICE_BASE_URL;
export const SESSION_TOKEN_SERVICE_SECRET_KEY =
  process.env._____ADDITIONAL_VARIABLE______SESSION_TOKEN_SERVICE_SECRET_KEY;
