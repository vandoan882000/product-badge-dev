import { AxiosResponse } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { fetchAPI, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { deleteMedia } from '../../actions/actionMedia';

function* handleDelete({ payload }: ReturnType<typeof deleteMedia.request>) {
  const { id } = payload;
  try {
    const response: AxiosResponse<{ data: { ids: string } }> = yield retry(3, 1000, fetchAPI.request, {
      url: `self-upload-badges`,
      method: 'DELETE',
      params: {
        ids: id,
      },
    });
    postmessage.emit('@Media/deleteMedia/success', { id: response.data.data.ids });
    yield put(deleteMedia.success(undefined));
  } catch (error) {
    postmessage.emit('@Media/deleteMedia/failure', undefined);
    yield put(deleteMedia.failure(undefined));
  }
}

export function* watchDeleteMedia() {
  yield takeLatest(getActionType(deleteMedia.request), handleDelete);
}
