import { SessionToken } from '../../models/Session';

export interface DeleteListSessionTokens_ExpectParameters {
  feIds: Array<SessionToken['feId']>;
}

export interface DeleteListSessionTokens_Response {
  data: null;
  message: 'The token has been deleted!';
  status: 'success';
}
