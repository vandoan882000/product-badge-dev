import { SessionToken } from '../../models/Session';

export interface GetSessionTokens_ExpectParameters {
  shop?: SessionToken['shop'];
  feId?: SessionToken['feId'];
}

export interface GetSessionTokens_Response {
  message: 'The data have been found!';
  status: 'success';
  data: SessionToken | SessionToken[];
}
