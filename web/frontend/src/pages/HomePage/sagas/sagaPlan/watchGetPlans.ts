import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { API_ALL_PLAN } from 'configs/env';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetPlans } from '../../actions/actionPlans';
import { PlanAPIResponse } from '../../PlanAPI';

function* handleGet() {
  try {
    const response: AxiosResponse<PlanAPIResponse> = yield retry(3, 500, fetchAPI.request, {
      baseURL: API_ALL_PLAN,
    });

    const _dataSuccess = response.data.data;

    yield put(actionGetPlans.success({ data: _dataSuccess }));
    postmessage.emit('@PlanPage/getPlans/success', { data: _dataSuccess });
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    postmessage.emit('@PlanPage/getPlans/failure', undefined);
    yield put(actionGetPlans.failure(undefined));
  }
}

export function* watchGetPlans() {
  yield takeLatest(getActionType(actionGetPlans.request), handleGet);
}
