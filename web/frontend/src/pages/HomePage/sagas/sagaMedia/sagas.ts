import { watchDeleteMedia } from './watchDeleteMedia';
import { watchGetMedia, watchLoadMoreMedia } from './watchGetMedia';
import { watchUploadMedia } from './watchUploadMedia';

export const sagasMedia = [watchUploadMedia, watchGetMedia, watchLoadMoreMedia, watchDeleteMedia];
