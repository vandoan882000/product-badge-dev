import { AxiosError, AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { loadmoreManualProducts } from '../../actions/actionManualProducts';
import { Params, ResponseError, ResponseSuccess } from '../../ProductAPI';

let task: Task | undefined;

function* handleLoadmoreManualProducts(_: ReturnType<typeof loadmoreManualProducts.request>) {
  try {
    const { activeKey, data }: AppState['manualProducts'] = yield select((state: AppState) => state.manualProducts);
    const { hasNextPage, lastCursor } = data[activeKey] as Exclude<
      AppState['manualProducts']['data'][string],
      undefined
    >;
    if (!hasNextPage) {
      postmessage.emit('@ProductPage/manualProductLoadMoreSuccess', { fullProducts: { items: [], hasNextPage } });
      yield put(loadmoreManualProducts.success({ products: [], hasNextPage: false, lastCursor }));
    } else {
      const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
        url: 'manual-products',
        params: {
          s: activeKey ? activeKey : undefined,
          cursor: lastCursor,
        } as Params,
      });
      const _dataError = res.data as ResponseError;
      const _dataSuccess = res.data as ResponseSuccess;
      const _dataItems = _dataSuccess.data.items.map(item => ({
        ...item,
        manual: {
          ...item.manual,
          config:
            item.manual.config === null
              ? []
              : !Array.isArray(item.manual.config)
              ? [item.manual.config]
              : item.manual.config,
        },
      }));

      if (_dataError.code) {
        throw new Error(_dataError.message);
      }
      postmessage.emit('@ProductPage/manualProductLoadMoreSuccess', {
        fullProducts: { items: _dataItems, hasNextPage: _dataSuccess.data.hasNextPage },
      });
      yield put(
        loadmoreManualProducts.success({
          products: _dataItems,
          hasNextPage: _dataSuccess.data.hasNextPage,
          lastCursor: _dataItems.at(-1)?.cursor as string,
        }),
      );
    }
  } catch (err) {
    handleError(err as AxiosError<ErrorData> | Error);
    postmessage.emit('@ProductPage/manualProductLoadMoreFailure', { message: 'failed' });
    yield put(loadmoreManualProducts.failure(undefined));
  }
}

export function* watchLoadmoreManualProducts() {
  while (true) {
    const actionWatchloadmoreManualProducts: ReturnType<typeof loadmoreManualProducts.request> = yield take(
      getActionType(loadmoreManualProducts.request),
    );
    if (task) {
      task.cancel();
    }
    task = yield fork(handleLoadmoreManualProducts, actionWatchloadmoreManualProducts);
  }
}

export function* watchLoadmoreManualProductsCancel() {
  while (true) {
    const actionwatchloadmoreManualProductsCancel: ReturnType<typeof loadmoreManualProducts.cancel> = yield take(
      getActionType(loadmoreManualProducts.cancel),
    );
    if (!!task && actionwatchloadmoreManualProductsCancel.type === '@ManualProducts/loadmoreManualProductsCancel') {
      task.cancel();
    }
  }
}
