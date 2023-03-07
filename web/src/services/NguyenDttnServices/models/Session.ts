export interface SessionToken {
  ID: string;
  feId: string;
  shop: string;
  state: string;
  isOnline: boolean;
  scope: string | undefined;
  expires: number | undefined;
  accessToken: string | undefined;
  onlineAccessInfo:
    | undefined
    | {
        expires_in: number;
        associated_user_scope: string;
        associated_user: {
          id: number;
          first_name: string;
          last_name: string;
          email: string;
          email_verified: boolean;
          account_owner: boolean;
          locale: string;
          collaborator: boolean;
        };
      };
}
