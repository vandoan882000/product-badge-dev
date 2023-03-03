import { auth } from 'actions';
import { getData } from './actions/getData';

export const initializationApp = [auth, getData];
