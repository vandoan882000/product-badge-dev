import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { API_CURRENT_PLAN } from 'configs/env';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetCurrentPlan } from '../../actions/actionPlans';
import { CurrentPlanAPIResponse } from '../../PlanAPI';

function* handleGet() {
  try {
    const response: AxiosResponse<CurrentPlanAPIResponse> = yield retry(3, 500, fetchAPI.request, {
      baseURL: API_CURRENT_PLAN,
    });
    const _dataSuccess = response.data.data;
    yield put(actionGetCurrentPlan.success({ currentPlan: _dataSuccess.planName }));
    postmessage.emit('@PlanPage/getCurrentPlan/success', {
      currentPlan: _dataSuccess.planName,
      currentToggleAutomatic: _dataSuccess.extraInfo.toggleAutomatic,
      freeTrial: _dataSuccess.trialDays,
      productPerBadges: _dataSuccess.planInclude.productPerBadges,
    });
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    postmessage.emit('@PlanPage/getCurrentPlan/failure', undefined);
    yield put(actionGetCurrentPlan.failure(undefined));
  }
}

export function* watchGetCurrentPlan() {
  yield takeLatest(getActionType(actionGetCurrentPlan.request), handleGet);
}
