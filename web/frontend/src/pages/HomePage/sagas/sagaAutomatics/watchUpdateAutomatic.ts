import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { updateAutomatic } from '../../actions/actionAutomaticProducts';
import { Params, ResponseError, ResponseSuccess } from '../../UpdateBadgeAutomaticAPI';

function* handleUpdateAutomatic({ payload }: ReturnType<typeof updateAutomatic.request>) {
  const { config, description, id, postType, tagSelected, title, status } = payload;
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: `automatics/${id}`,
      method: 'put',
      data: {
        config: config.map(item => ({
          ...item,
          badge_id: item.id,
          urlImage: (item as any)?.baseUrl || (item as any)?.url || '',
        })),
        description: description,
        title: title,
        status: status ? status : undefined,
        tagSelected: tagSelected ? tagSelected : undefined,
        postType: postType || undefined,
      } as Params,
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;

    postmessage.emit('@CUDAutomatic/updateAutomaticSuccess', {
      id: _dataSuccess.data.id,
      description: _dataSuccess.data.description,
      message: _dataSuccess.message,
    });
    yield put(updateAutomatic.success(payload));
  } catch (err) {
    handleError(err as AxiosError<ErrorData> | Error);
    postmessage.emit('@CUDAutomatic/updateAutomaticFailure', { message: 'failed' });
    yield put(updateAutomatic.failure(payload));
  }
}

export function* watchUpdateAutomatic() {
  yield takeLatest(getActionType(updateAutomatic.request), handleUpdateAutomatic);
}
