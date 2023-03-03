import { SQLiteSessionStorage } from '@shopify/shopify-app-session-storage-sqlite';

/**
     * START_EDIT: Bắt buôc phải update "SessionStorage" thay vì lưu Memory vì 
     * 1. Shopify chỉ chạy auth - tức chỉ nhận được offline token hoặc online token - khi app được cài hoặc update scopes 
    * 2. Token chỉ có thể lấy qua hàm "getSessionAfterVerify" được định nghĩa tại "src/utils/getSessionAfterVerify.ts" - "ShopifyApp.validateAuthenticatedSession" sẽ gán token vào "locals" và hàm đó sẽ thực hiện lấy session trong trường "locals" veef
     * Kịch bản lỗi như sau:
          1. Người dùng cài app 
          2. Shopify sẽ trả về offline token và lưu vào Memory
          3. Ta build lại app hoặc đơn giản là chạy lại server
          4. Người dùng truy cập lại app
          5. Các api của app sẽ trả về 403 do hàm "ShopifyApp.validateAuthenticatedSession()" validate - Hàm này sẽ lấy session từ "sessionStorage" mà khi đó Memory bị flush rồi nên sẽ không có nên sẽ là 403 liên tục 
     */
const DB_PATH = `${process.cwd()}/database.sqlite`;
export const sessionStorage = new SQLiteSessionStorage(DB_PATH);
