import { Router } from 'express';
import { initializationApp } from './controllers/initializationApp';

export const apiRouter = Router({});

apiRouter.get('/initialization', ...initializationApp);
