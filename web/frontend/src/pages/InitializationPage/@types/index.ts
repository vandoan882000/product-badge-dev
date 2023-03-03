import { ActionTypes } from 'wiloke-react-core/utils';
import { initialization } from '../actions/actionInitializationPage';

export interface State {
  statusInitialization: Status;
  isInvalidToken: boolean;
  appBridge: AppBridge | null;
  shopDomain: string | null;
  email: string | null;
  themeId: number | null;
  appExtensionActived: boolean | null;
  currencyFormat: string;
}

export type Actions = ActionTypes<typeof initialization>;
