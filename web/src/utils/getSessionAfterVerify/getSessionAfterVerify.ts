import { Session } from '@shopify/shopify-api';
import { SessionAfterVerifyException } from './@consts/Exception';

/**
 * Function được dùng để lấy session của request
 * @requires middlware "ShopifyApp.validateAuthenticatedSession()" là bắt buộc
 */
export const getSessionAfterVerify = (response: Express.ResponseWithSessionTokenVerified): Required<Session> => {
  const session = response.locals.shopify.session;
  if (!session.accessToken) {
    throw new SessionAfterVerifyException(session);
  }
  return session as Required<Session>;
};
