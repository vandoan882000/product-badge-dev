import { AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchAPI, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { trackingBadges } from '../../actions/actionBadges';

interface ResponseSuccess {
  data: {
    impressionsBadges: number;
    impressionsAllowed: number;
  };
  message: string;
  status: string;
}

function* handleTrackingBadges() {
  try {
    const response: AxiosResponse<ResponseSuccess> = yield call(fetchAPI.request, {
      url: 'me/badges',
    });
    yield put(trackingBadges.success({ maxBadges: response.data.data.impressionsAllowed }));
    postmessage.emit('@Badges/trackingBadges/success', {
      maxBadges: response.data.data.impressionsAllowed,
      message: response.data.message,
      takenBadge: response.data.data.impressionsBadges,
    });
  } catch (error) {
    postmessage.emit('@Badges/trackingBadges/failure', undefined);
    yield put(trackingBadges.failure(undefined));
  }
}

export function* watchTrackingBadges() {
  yield takeLatest(getActionType(trackingBadges.request), handleTrackingBadges);
}
