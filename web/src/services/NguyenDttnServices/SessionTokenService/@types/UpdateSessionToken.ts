import { SessionToken } from '../../models/Session';

export type UpdateSessionToken_ExpectParameters = SessionToken;

export interface UpdateSessionToken_Response {
  message: 'The data have been found!';
  status: 'success';
  data: SessionToken;
}
