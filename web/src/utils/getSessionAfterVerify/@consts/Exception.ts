import { Session } from '@shopify/shopify-api';

export class SessionAfterVerifyException extends Error {
  session: Session;
  constructor(session: Session) {
    super();
    this.name = 'SessionAfterVerifyException';
    this.session = session;
  }
}
