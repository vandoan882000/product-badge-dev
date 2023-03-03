import { appName } from 'configs';
import { Firestore, Local } from './classes';

export const reportService = appName ? new Firestore(appName) : new Local();
