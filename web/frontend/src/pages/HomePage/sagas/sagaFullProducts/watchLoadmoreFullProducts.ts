import { AxiosError, AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { loadmoreFullProducts } from '../../actions/actionFullProducts';
import { Params, ResponseError, ResponseSuccess } from '../../ProductAPI';

let task: Task | undefined;

function* handleLoadmoreFullProducts(_: ReturnType<typeof loadmoreFullProducts.request>) {
  try {
    const { activeKey, data }: AppState['fullProducts'] = yield select((state: AppState) => state.fullProducts);
    const { hasNextPage, lastCursor } = data[activeKey] as Exclude<AppState['fullProducts']['data'][string], undefined>;
    if (!hasNextPage || !lastCursor) {
      postmessage.emit('@ProductPage/fullProductLoadMoreSuccess', { fullProducts: { items: [], hasNextPage: false } });
      yield put(loadmoreFullProducts.success({ products: [], hasNextPage: false, lastCursor }));
    } else {
      const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 2000, fetchAPI.request, {
        url: 'full-products',
        params: {
          s: activeKey ? activeKey : undefined,
          cursor: lastCursor,
        } as Params,
      });
      const _dataError = res.data as ResponseError;
      const _dataSuccess = res.data as ResponseSuccess;
      if (_dataError.code) {
        throw new Error(_dataError.message);
      }
      postmessage.emit('@ProductPage/fullProductLoadMoreSuccess', {
        fullProducts: { items: _dataSuccess.data.items, hasNextPage: _dataSuccess.data.hasNextPage },
      });
      yield put(
        loadmoreFullProducts.success({
          products: _dataSuccess.data.items,
          hasNextPage: _dataSuccess.data.hasNextPage,
          lastCursor: _dataSuccess.data.items.at(-1)?.cursor as string,
        }),
      );
    }
  } catch (err) {
    handleError(err as AxiosError<ErrorData> | Error);
    postmessage.emit('@ProductPage/fullProductLoadMoreFailure', { message: 'failed' });
    yield put(loadmoreFullProducts.failure(undefined));
  }
}

export function* watchLoadmoreFullProducts() {
  while (true) {
    const actionWatchloadmoreFullProducts: ReturnType<typeof loadmoreFullProducts.request> = yield take(
      getActionType(loadmoreFullProducts.request),
    );
    if (task) {
      task.cancel();
    }
    task = yield fork(handleLoadmoreFullProducts, actionWatchloadmoreFullProducts);
  }
}

export function* watchLoadmoreFullProductsCancel() {
  while (true) {
    const actionwatchloadmoreFullProductsCancel: ReturnType<typeof loadmoreFullProducts.cancel> = yield take(
      getActionType(loadmoreFullProducts.cancel),
    );
    if (!!task && actionwatchloadmoreFullProductsCancel.type === '@FullProducts/loadmoreFullProductsCancel') {
      task.cancel();
    }
  }
}
