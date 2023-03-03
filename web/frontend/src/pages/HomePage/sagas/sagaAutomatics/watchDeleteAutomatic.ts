import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorData, fetchAPI, handleError } from 'utils';
import { postmessage } from 'utils/postmessage';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteAutomatic } from '../../actions/actionAutomaticProducts';
import { Params, ResponseError, ResponseSuccess } from '../../DeleteBadgeAutomaticAPI';

function* handleDeleteAutomatic({ payload }: ReturnType<typeof deleteAutomatic.request>) {
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: `automatics/${payload.id}`,
      method: 'delete',
      data: { postType: payload.postType } as Params,
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) {
      throw new Error(_dataError.message);
    }
    console.log(_dataSuccess);
    postmessage.emit('@CUDAutomatic/deleteAutomaticSuccess', {
      id: _dataSuccess.data.id,
      urlImage: _dataSuccess.data.urlImage,
      description: _dataSuccess.data.description,
      message: _dataSuccess.message,
    });
    yield put(deleteAutomatic.success(payload));
  } catch (err) {
    handleError(err as AxiosError<ErrorData> | Error);
    postmessage.emit('@CUDAutomatic/deleteAutomaticFailure', { message: 'failed' });
    yield put(deleteAutomatic.failure(payload));
  }
}

export function* watchDeleteAutomatic() {
  yield takeLatest(getActionType(deleteAutomatic.request), handleDeleteAutomatic);
}
