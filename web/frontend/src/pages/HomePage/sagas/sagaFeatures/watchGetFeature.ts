import { put, retry, select, takeLatest } from '@redux-saga/core/effects';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { APP_RECOMMENDATIONS_URL } from 'configs/env';
import { ErrorData, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { FeatureState } from '../..';
import { getFeatures } from '../../actions/actionFeatures';
import { Success } from '../../Features';

function* handleGet() {
  try {
    const { data, requestStatus }: FeatureState = yield select((state: AppState) => state.features);
    if (requestStatus === 'success') {
      yield put(getFeatures.success({ data: data }));
      postmessage.emit('@FeaturePage/getFeature/success', { data: data });
    } else {
      const response: AxiosResponse<Success> = yield retry(3, 1000, axios.request, {
        url: APP_RECOMMENDATIONS_URL,
        baseURL: '',
        method: 'GET',
        params: {
          app: 'magic-badges-myshopkit',
        },
      });
      yield put(getFeatures.success({ data: response.data.data }));
      postmessage.emit('@FeaturePage/getFeature/success', { data: response.data.data });
    }
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    postmessage.emit('@FeaturePage/getFeature/failure', undefined);

    yield put(getFeatures.failure(undefined));
  }
}

export function* watchGetFeatures() {
  yield takeLatest(getActionType(getFeatures.request), handleGet);
}
