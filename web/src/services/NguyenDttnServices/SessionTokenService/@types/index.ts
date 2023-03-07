import { SessionToken } from 'services/NguyenDttnServices/models/Session';
import { DeleteListSessionTokens_ExpectParameters } from './DeleteListSessionTokens';
import { DeleteSessionToken_ExpectParameters } from './DeleteSessionToken';
import { GetSessionTokens_ExpectParameters } from './GetSessionTokens';
import { UpdateSessionToken_ExpectParameters } from './UpdateSessionToken';

export interface ISessionTokenService {
  updateSessionToken: (params: Omit<UpdateSessionToken_ExpectParameters, 'ID'>) => Promise<boolean>;
  getSessionTokens: (params: GetSessionTokens_ExpectParameters) => Promise<SessionToken | SessionToken[] | undefined>;
  deleteSessionToken: (params: DeleteSessionToken_ExpectParameters) => Promise<boolean>;
  deleteListSessionTokens: (params: DeleteListSessionTokens_ExpectParameters) => Promise<boolean>;
}

export * from './DeleteSessionToken';
export * from './GetSessionTokens';
export * from './UpdateSessionToken';
