import { put, retry, takeLatest } from '@redux-saga/core/effects';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorData, handleError } from 'utils';
import { fetchAPI } from 'utils/fetchAPI';
import { getActionType } from 'wiloke-react-core/utils';
import { listenAppActiveExtension } from '../actions/actionInitializationPage';

interface ResponseSuccess {
  /** Để sử dụng cho tidio chat - để biết đc user nào gửi tin nhắn */
  email: string;
  /** Để sử dụng cho tidio chat - để biết đc user nào gửi tin nhắn */
  myshopifyDomain: string;
  /** Để sử dụng cho tính năng redirect đến shopify editor - nơi active theme app extension */
  themeId: number | null;
  /** Để hiển thị thông báo có cần active theme app extension hay không */
  appExtensionActived: boolean;
  currencyFormats: {
    moneyFormat: string;
  };
}

interface ResponseError {
  message: string;
  isInvalidToken: boolean;
}

function* handleInitialization({ payload }: ReturnType<typeof listenAppActiveExtension.request>) {
  try {
    const res: AxiosResponse<ResponseSuccess> = yield retry(3, 1000, fetchAPI.request, {
      url: `${payload.appBridge.localOrigin}/api/initialization`,
      baseURL: '',
    });
    yield put(
      listenAppActiveExtension.success({
        appExtensionActived: res.data.appExtensionActived,
      }),
    );
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    const error_ = error as AxiosError;
    if (error_.isAxiosError) {
      const response = error_.response?.data as ResponseError;
      const isInvalidToken = response.isInvalidToken;
      yield put(listenAppActiveExtension.failure({ isInvalidToken }));
    } else {
      yield put(listenAppActiveExtension.failure({ isInvalidToken: false }));
    }
  }
}

export function* watchListenAppExtension() {
  yield takeLatest(getActionType(listenAppActiveExtension.request), handleInitialization);
}
