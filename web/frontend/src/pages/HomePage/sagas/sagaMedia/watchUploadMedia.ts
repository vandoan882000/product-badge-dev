import { AxiosError, AxiosResponse } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError, objectToFormData, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { uploadMedia } from '../../actions/actionMedia';
import { ServerUploadFileResponse } from '../../MediaAPI';

function* handle({ payload }: ReturnType<typeof uploadMedia.request>) {
  const { file } = payload;
  try {
    const response: AxiosResponse<ServerUploadFileResponse> = yield retry(3, 1000, fetchAPI.request, {
      url: `self-upload-badges`,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: objectToFormData({ content: file, type: 'photo' }),
    });
    yield put(uploadMedia.success(undefined));
    postmessage.emit('@Media/uploadFile/success', response.data);
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    yield put(uploadMedia.failure(undefined));
    postmessage.emit('@Media/uploadFile/failure', undefined);
  }
}

export function* watchUploadMedia() {
  yield takeLatest(getActionType(uploadMedia.request), handle);
}
