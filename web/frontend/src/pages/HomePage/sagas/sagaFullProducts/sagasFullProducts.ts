import { watchGetFullProducts, watchGetFullProductsCancel } from './watchGetFullProducts';
import { watchLoadmoreFullProducts, watchLoadmoreFullProductsCancel } from './watchLoadmoreFullProducts';

export const sagasFullProducts = [
  watchGetFullProducts,
  watchGetFullProductsCancel,
  watchLoadmoreFullProducts,
  watchLoadmoreFullProductsCancel,
];
