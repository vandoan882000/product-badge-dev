import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteBadge } from '../../actions/actionCUDBadge';
import { ResponseError, ResponseSuccess } from '../../DeleteBadgeAPI';

function* handleDeleteBadge({ payload }: ReturnType<typeof deleteBadge.request>) {
  const { ids } = payload;
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: `manual-products`,
      method: 'DELETE',
      data: { ids: ids.join(',') },
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) {
      throw new Error(_dataError.message);
    }
    console.log('_dataSuccess', _dataSuccess);
    postmessage.emit('@CUDBadge/deleteBadgesSuccess', {
      id: _dataSuccess.data.id,
      message: _dataSuccess.message,
    });
    yield put(deleteBadge.success(payload));
  } catch (err) {
    handleError(err as AxiosError<ErrorData> | Error);
    yield put(deleteBadge.failure(payload));
  }
}

export function* watchDeleteBadge() {
  yield takeLatest(getActionType(deleteBadge.request), handleDeleteBadge);
}
