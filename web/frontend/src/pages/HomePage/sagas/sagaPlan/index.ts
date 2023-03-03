import { watchGetCurrentPlan } from './watchGetCurrentPlan';
import { watchGetPlans } from './watchGetPlans';
import { watchGetPromoCode } from './watchGetPromoCode';

export const sagaPlans = [watchGetPlans, watchGetCurrentPlan, watchGetPromoCode];
