import { SessionToken } from '../../models/Session';

export interface DeleteSessionToken_ExpectParameters {
  feId: SessionToken['feId'];
}

export interface DeleteSessionToken_Response {
  data: null;
  message: 'The token has been deleted!';
  status: 'success';
}
