import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { createBadge } from '../../actions/actionCUDBadge';
import { ResponseError, ResponseSuccess } from '../../CreateBadgeAPI';

function* handleCreateBadge({ payload }: ReturnType<typeof createBadge.request>) {
  const { config, slug } = payload;
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: 'manual-products',
      method: 'post',
      data: {
        config: config.map(item => ({
          ...item,
          badge_id: item.id,
          urlImage: (item as any)?.baseUrl || (item as any)?.url || '',
        })),
        slugs: slug,
      },
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) {
      throw new Error(_dataError.message);
    }
    postmessage.emit('@CUDBadge/createBadgesSuccess', {
      data: _dataSuccess.data.items,
      message: _dataSuccess.message,
    });
    yield put(createBadge.success(payload));
  } catch (err: any) {
    handleError(err as AxiosError<ErrorData> | Error);
    postmessage.emit('@CUDBadge/createBadgesFailure', { message: 'failed' });
    yield put(createBadge.failure(payload));
  }
}

export function* watchCreateBadge() {
  yield takeLatest(getActionType(createBadge.request), handleCreateBadge);
}
