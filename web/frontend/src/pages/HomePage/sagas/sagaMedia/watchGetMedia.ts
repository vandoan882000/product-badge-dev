import { AxiosError, AxiosResponse } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { getMedia, loadMoreMedia } from '../../actions/actionMedia';
import { ServerGetMediaResponse, VuongKMAGetMediaResponse } from '../../MediaAPI';

function* handleGet(_: ReturnType<typeof getMedia.request>) {
  try {
    const response: AxiosResponse<VuongKMAGetMediaResponse> = yield retry(3, 1000, fetchAPI.request, {
      url: 'self-upload-badges',
      method: 'get',
      params: {
        limit: 50,
      },
    });
    yield put(getMedia.success(undefined));
    const _response = response.data.data.items.map<ServerGetMediaResponse['data']['items'][0]>(item => {
      return { id: item.id, url: item.urlImage };
    });
    postmessage.emit('@Media/getMedia/success', {
      data: {
        items: _response,
        currentPage: response.data.data.currentPage,
        maxPages: response.data.data.maxPages,
      },
      message: response.data.message,
      status: response.data.status,
    });
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    yield put(getMedia.failure(undefined));
    postmessage.emit('@Media/getMedia/failure', undefined);
  }
}

function* handleLoadMore({ payload }: ReturnType<typeof loadMoreMedia.request>) {
  const { page } = payload;
  try {
    const response: AxiosResponse<VuongKMAGetMediaResponse> = yield retry(3, 1000, fetchAPI.request, {
      url: 'self-upload-badges',
      method: 'get',
      params: {
        limit: 50,
        page,
      },
    });
    yield put(loadMoreMedia.success(undefined));
    const _response = response.data.data.items.map<ServerGetMediaResponse['data']['items'][0]>(item => {
      return { id: item.id, url: item.urlImage };
    });
    postmessage.emit('@Media/loadMoreMedia/success', {
      data: { items: _response, currentPage: response.data.data.currentPage, maxPages: response.data.data.maxPages },
      message: response.data.message,
      status: response.data.status,
    });
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    yield put(loadMoreMedia.failure(undefined));
    postmessage.emit('@Media/loadMoreMedia/failure', undefined);
  }
}

export function* watchGetMedia() {
  yield takeLatest(getActionType(getMedia.request), handleGet);
}

export function* watchLoadMoreMedia() {
  yield takeLatest(getActionType(loadMoreMedia.request), handleLoadMore);
}
