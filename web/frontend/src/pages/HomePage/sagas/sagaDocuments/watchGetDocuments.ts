import { AxiosError, AxiosResponse } from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { getDocuments } from '../../actions/actionDocuments';
import { DocumentsResponse } from '../../DocumentAPI';

function* handleDocument({ payload }: ReturnType<typeof getDocuments.request>) {
  try {
    const response: AxiosResponse<DocumentsResponse> = yield call(fetchAPI.request, {
      url: 'documents',
      params: {
        s: payload.s ?? undefined,
      },
    });
    yield put(getDocuments.success({ documents: response.data.data.items }));
    postmessage.emit('@Document/getDocuments/success', { data: response.data.data.items });
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    yield put(getDocuments.failure(undefined));
    postmessage.emit('@Document/getDocuments/failure', undefined);
  }
}

export function* watchGetDocuments() {
  yield takeLatest(getActionType(getDocuments.request), handleDocument);
}
