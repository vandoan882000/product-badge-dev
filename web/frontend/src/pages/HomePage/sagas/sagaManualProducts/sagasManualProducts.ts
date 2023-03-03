import { watchGetManualProducts, watchGetManualProductsCancel } from './watchGetManualProducts';
import { watchLoadmoreManualProducts, watchLoadmoreManualProductsCancel } from './watchLoadmoreManualProducts';

export const sagasManualProducts = [
  watchGetManualProducts,
  watchGetManualProductsCancel,
  watchLoadmoreManualProducts,
  watchLoadmoreManualProductsCancel,
];
