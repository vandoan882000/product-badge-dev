import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { updateBadge } from '../../actions/actionCUDBadge';
import { ResponseError, ResponseSuccess } from '../../UpdateBadgeAPI';

function* handleUpdateBadge({ payload }: ReturnType<typeof updateBadge.request>) {
  const { config, slug, ids } = payload;
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: `manual-products`,
      method: 'put',
      data: {
        config: config.map(item => ({
          ...item,
          badge_id: item.id,
          urlImage: (item as any)?.baseUrl || (item as any)?.url || '',
        })),
        slugs: slug,
        ids: ids,
      },
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) {
      throw new Error(_dataError.message);
    }

    postmessage.emit('@CUDBadge/updateBadgesSuccess', {
      data: _dataSuccess.data.items,
      message: _dataSuccess.message,
    });
    yield put(updateBadge.success(payload));
  } catch (err: any) {
    handleError(err as AxiosError<ErrorData> | Error);
    postmessage.emit('@CUDBadge/updateBadgesFailure', { message: 'failed' });
    yield put(updateBadge.failure(payload));
  }
}

export function* watchUpdateBadge() {
  yield takeLatest(getActionType(updateBadge.request), handleUpdateBadge);
}
