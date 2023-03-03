import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { API_PROMO_CODE_URL } from 'configs/env';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetPromoCode } from '../../actions/actionPlans';
import { CouponAPIResponse } from '../../PlanAPI';

function* handleGet({ payload }: ReturnType<typeof actionGetPromoCode.request>) {
  const { code } = payload;
  try {
    const response: AxiosResponse<CouponAPIResponse> = yield retry(3, 500, fetchAPI.request, {
      baseURL: API_PROMO_CODE_URL,
      method: 'post',
      data: {
        coupon: code,
      },
    });

    const _dataSuccess = response.data;

    yield put(
      actionGetPromoCode.success({
        coupon: _dataSuccess.data === null ? '' : _dataSuccess.data.coupon,
        couponID: _dataSuccess.data === null ? '' : _dataSuccess.data.couponID,
        percentage: _dataSuccess.data === null ? '' : _dataSuccess.data.percentage,
        messageCoupon: _dataSuccess.message,
      }),
    );
    postmessage.emit('@PlanPage/getPromoCode/success', {
      coupon: _dataSuccess.data === null ? '' : _dataSuccess.data.coupon,
      couponID: _dataSuccess.data === null ? '' : _dataSuccess.data.couponID,
      percentage: _dataSuccess.data === null ? '' : _dataSuccess.data.percentage,
      message: _dataSuccess.message,
    });
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    postmessage.emit('@PlanPage/getPromoCode/failure', undefined);
    yield put(actionGetPromoCode.failure(undefined));
  }
}

export function* watchGetPromoCode() {
  yield takeLatest(getActionType(actionGetPromoCode.request), handleGet);
}
