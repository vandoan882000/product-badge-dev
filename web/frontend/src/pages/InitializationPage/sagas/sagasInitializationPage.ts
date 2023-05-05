import { watchListenAppExtension } from 'pages/InitializationPage/sagas/watchListenAppExtension';
import { watchInitialization } from './watchInitialization';

export const sagasInitializationPage = [watchInitialization, watchListenAppExtension];
