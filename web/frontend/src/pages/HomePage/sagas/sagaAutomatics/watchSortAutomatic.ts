import { notification } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import { put, retry, takeEvery } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { sortAutomatic } from '../../actions/actionAutomaticProducts';
import { Params, ResponseError, ResponseSuccess } from '../../SortAutomaticAPI';

function* handleSort({ payload }: ReturnType<typeof sortAutomatic.request>) {
  const { listPostType } = payload;
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 500, fetchAPI.request, {
      url: 'priority-automatic',
      method: 'put',
      data: {
        priority: listPostType.join(','),
      } as Params,
    });

    const _dataSuccess = res.data as ResponseSuccess;
    const _dataError = res.data as ResponseError;
    if (_dataError.code) {
      throw new Error(_dataError.message);
    }
    yield put(sortAutomatic.success({ message: _dataSuccess.message }));
    notification.success({
      message: _dataSuccess.message,
    });
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    yield sortAutomatic.failure(undefined);
  }
}

export function* watchSortAutomatic() {
  yield takeEvery(getActionType(sortAutomatic.request), handleSort);
}
