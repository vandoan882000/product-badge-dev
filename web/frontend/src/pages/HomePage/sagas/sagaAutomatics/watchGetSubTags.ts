import { AxiosError, AxiosResponse } from 'axios';
import { put, retry, takeLatest } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { actionGetSubTags } from '../../actions/actionSubTags';
import { ResponseSuccess } from '../../AutomaticAPI';

function* handleGet() {
  try {
    const response: AxiosResponse<ResponseSuccess> = yield retry(3, 500, fetchAPI.request, {
      url: 'sub-tags',
      params: {
        limit: 100,
      },
    });
    const _responseSuccess = response.data;
    const _dataItem = _responseSuccess.data.items.map(item => ({
      ...item,
      config: item.config === null ? [] : !Array.isArray(item.config) ? [item.config] : item.config,
    }));
    yield put(actionGetSubTags.success({ data: _dataItem }));
    postmessage.emit('@Automatic/getSubTagsSuccess', {
      items: _dataItem,
      maxPages: _responseSuccess.data.maxPages,
    });
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    postmessage.emit('@Automatic/getSubTagsFailure', undefined);
    yield put(actionGetSubTags.failure(undefined));
  }
}

export function* watchGetSubTags() {
  yield takeLatest(getActionType(actionGetSubTags.request), handleGet);
}
