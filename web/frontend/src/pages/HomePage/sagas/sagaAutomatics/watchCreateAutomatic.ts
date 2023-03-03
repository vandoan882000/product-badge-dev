import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { fetchAPI, handleError, ErrorData, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { createAutomatic } from '../../actions/actionAutomaticProducts';
import { Params, ResponseError, ResponseSuccess } from '../../CreateBadgeAutomaticAPI';

function* handleCreateAutomatic({ payload }: ReturnType<typeof createAutomatic.request>) {
  const { config, description, postType, tagSelected, title, status } = payload;
  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: 'automatics',
      method: 'post',
      data: {
        config: config.map(item => ({
          ...item,
          badge_id: item.id,
          urlImage: (item as any)?.baseUrl || (item as any)?.url || '',
        })),
        description: description,
        postType: postType,
        title: title,
        status: status ? status : undefined,
        tagSelected: tagSelected ? tagSelected : '',
      } as Params,
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) {
      postmessage.emit('@CUDAutomatic/createAutomaticFailure', { message: _dataError.message });
    }
    postmessage.emit('@CUDAutomatic/createAutomaticSuccess', {
      id: _dataSuccess.data.id,
      description: _dataSuccess.data.description,
      message: _dataSuccess.message,
    });
    yield put(createAutomatic.success(payload));
  } catch (err) {
    handleError(err as AxiosError<ErrorData> | Error);
    postmessage.emit('@CUDAutomatic/createAutomaticFailure', { message: 'failed' });
    yield put(createAutomatic.failure(payload));
  }
}

export function* watchCreateAutomatic() {
  yield takeLatest(getActionType(createAutomatic.request), handleCreateAutomatic);
}
