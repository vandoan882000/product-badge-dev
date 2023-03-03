import { PushBulk_BEExpectParams } from './PushBulk';

export interface IBulkService {
  pushBulk: ({ shopName, data }: PushBulk_BEExpectParams) => Promise<boolean>;
}

export * from './PushBulk';
