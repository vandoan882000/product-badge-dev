export interface Session {
  /** Domain của shop */
  shopDomain: string;
  /** Online token hoặc offline token */
  accessToken: string;
  /** API Version - Thường là lấy luôn biến môi trường của app */
  apiVersion: string;
}

export interface BaseParams {
  session: Session;
}
