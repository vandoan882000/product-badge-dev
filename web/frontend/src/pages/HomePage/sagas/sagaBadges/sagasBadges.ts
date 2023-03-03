import { watchGetBadges, watchGetBadgesCancel, watchGetVariantBadges } from './watchGetBadges';
import { watchloadmoreBadges, watchloadmoreBadgesCancel } from './watchLoadmoreBadges';
import { watchTrackingBadges } from './watchTrackingLimitBadges';

export const sagasBadges = [
  watchGetBadges,
  watchGetBadgesCancel,
  watchloadmoreBadges,
  watchloadmoreBadgesCancel,
  watchGetVariantBadges,
  watchTrackingBadges,
];
