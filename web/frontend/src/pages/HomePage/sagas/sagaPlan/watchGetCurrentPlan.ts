import { put, takeLatest } from '@redux-saga/core/effects';
import { AxiosError } from 'axios';
import { ErrorData, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetCurrentPlan } from '../../actions/actionPlans';

function* handleGet() {
  try {
    // const response: AxiosResponse<CurrentPlanAPIResponse> = yield retry(3, 500, fetchAPI.request, {
    //   baseURL: API_CURRENT_PLAN,
    // });
    // const _dataSuccess = response.data.data;
    yield put(actionGetCurrentPlan.success({ currentPlan: 'Business' }));
    postmessage.emit('@PlanPage/getCurrentPlan/success', {
      currentPlan: 'Business',
      currentToggleAutomatic: true,
      freeTrial: '15',
      productPerBadges: {
        label: "test",
        name: "a",
        value: "10",
      },
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
