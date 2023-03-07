import { Session } from '@shopify/shopify-api';
import { SessionStorage } from '@shopify/shopify-app-session-storage';
import { sessionTokenSerice } from 'services/NguyenDttnServices/SessionTokenService';

class CustomSessionStorage implements SessionStorage {
  storeSession: SessionStorage['storeSession'] = async session => {
    if (session.accessToken) {
      await sessionTokenSerice.updateSessionToken({
        accessToken: session.accessToken,
        expires: session.expires?.getTime(),
        feId: session.id,
        onlineAccessInfo: session.onlineAccessInfo,
        scope: session.scope,
        shop: session.shop,
        state: session.state,
        isOnline: Boolean(Number(session.isOnline)),
      });
    }
    return false;
  };
  loadSession: SessionStorage['loadSession'] = async id => {
    const response = await sessionTokenSerice.getSessionTokens({ feId: id });
    if (response === undefined) {
      return response;
    }
    if (Array.isArray(response)) {
      const firstItem = response[0];
      if (firstItem) {
        return new Session({
          id: firstItem.feId,
          isOnline: Boolean(Number(firstItem.isOnline)),
          shop: firstItem.shop,
          state: firstItem.state,
          accessToken: firstItem.accessToken,
          expires: firstItem.expires ? new Date(firstItem.expires) : undefined,
          onlineAccessInfo: firstItem.onlineAccessInfo,
          scope: firstItem.scope,
        });
      }
      return undefined;
    } else {
      return new Session({
        id: response.feId,
        isOnline: Boolean(Number(response.isOnline)),
        shop: response.shop,
        state: response.state,
        accessToken: response.accessToken,
        expires: response.expires ? new Date(response.expires) : undefined,
        onlineAccessInfo: response.onlineAccessInfo,
        scope: response.scope,
      });
    }
  };
  deleteSession: SessionStorage['deleteSession'] = async id => {
    return await sessionTokenSerice.deleteSessionToken({ feId: id });
  };
  deleteSessions: SessionStorage['deleteSessions'] = async ids => {
    return await sessionTokenSerice.deleteListSessionTokens({ feIds: ids });
  };
  findSessionsByShop: SessionStorage['findSessionsByShop'] = async shop => {
    const response = await sessionTokenSerice.getSessionTokens({ shop });
    if (response === undefined) {
      return [];
    }
    if (!Array.isArray(response)) {
      return [
        new Session({
          id: response.feId,
          isOnline: Boolean(Number(response.isOnline)),
          shop: response.shop,
          state: response.state,
          accessToken: response.accessToken,
          expires: response.expires ? new Date(response.expires) : undefined,
          onlineAccessInfo: response.onlineAccessInfo,
          scope: response.scope,
        }),
      ];
    }
    return response.map(item => {
      return new Session({
        id: item.feId,
        isOnline: Boolean(Number(item.isOnline)),
        shop: item.shop,
        state: item.state,
        accessToken: item.accessToken,
        expires: item.expires ? new Date(item.expires) : undefined,
        onlineAccessInfo: item.onlineAccessInfo,
        scope: item.scope,
      });
    });
  };
}

// import { SQLiteSessionStorage } from '@shopify/shopify-app-session-storage-sqlite';

// /**
//      * START_EDIT: Bắt buôc phải update "SessionStorage" thay vì lưu Memory vì
//      * 1. Shopify chỉ chạy auth - tức chỉ nhận được offline token hoặc online token - khi app được cài hoặc update scopes
//     * 2. Token chỉ có thể lấy qua hàm "getSessionAfterVerify" được định nghĩa tại "src/utils/getSessionAfterVerify.ts" - "ShopifyApp.validateAuthenticatedSession" sẽ gán token vào "locals" và hàm đó sẽ thực hiện lấy session trong trường "locals" veef
//      * Kịch bản lỗi như sau:
//           1. Người dùng cài app
//           2. Shopify sẽ trả về offline token và lưu vào Memory
//           3. Ta build lại app hoặc đơn giản là chạy lại server
//           4. Người dùng truy cập lại app
//           5. Các api của app sẽ trả về 403 do hàm "ShopifyApp.validateAuthenticatedSession()" validate - Hàm này sẽ lấy session từ "sessionStorage" mà khi đó Memory bị flush rồi nên sẽ không có nên sẽ là 403 liên tục
//      */
// const DB_PATH = `${process.cwd()}/database.sqlite`;
// export const sessionStorage = new SQLiteSessionStorage(DB_PATH);
export const sessionStorage = new CustomSessionStorage();
