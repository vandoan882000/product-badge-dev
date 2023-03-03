import { watchCreateAutomatic } from './watchCreateAutomatic';
import { watchDeleteAutomatic } from './watchDeleteAutomatic';
import { watchGetAutomatics, watchGetAutomaticsCancel } from './watchGetAutomatics';
import { watchGetSubTags } from './watchGetSubTags';
import { watchGetTags, watchGetTagsCancel } from './watchGetTags';
import { watchLoadMoreTags, watchLoadMoreTagsCancel } from './watchLoadMoreTags';
import { watchSortAutomatic } from './watchSortAutomatic';
import { watchUpdateAutomatic } from './watchUpdateAutomatic';

export const sagaAutomatics = [
  watchGetAutomatics,
  watchGetAutomaticsCancel,
  watchCreateAutomatic,
  watchUpdateAutomatic,
  watchDeleteAutomatic,
  watchSortAutomatic,
  watchGetTags,
  watchGetTagsCancel,
  watchLoadMoreTags,
  watchLoadMoreTagsCancel,
  watchGetSubTags,
];
