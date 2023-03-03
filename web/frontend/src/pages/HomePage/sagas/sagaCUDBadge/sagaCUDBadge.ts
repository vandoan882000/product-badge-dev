import { watchCreateBadge } from './watchCreateBadge';
import { watchDeleteBadge } from './watchDeleteBadge';
import { watchUpdateBadge } from './watchUpdateBadge';

export const sagaCUDBadge = [watchCreateBadge, watchUpdateBadge, watchDeleteBadge];
