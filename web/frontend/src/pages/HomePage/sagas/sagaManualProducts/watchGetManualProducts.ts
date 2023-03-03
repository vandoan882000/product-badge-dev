import { AxiosError, AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { getManualProducts } from '../../actions/actionManualProducts';
import { Params, ResponseError, ResponseSuccess } from '../../ProductAPI';

let task: Task | undefined;

function* handleGetManualProducts(_: ReturnType<typeof getManualProducts.request>) {
  try {
    const { activeKey, data }: AppState['manualProducts'] = yield select((state: AppState) => state.manualProducts);
    const { statusRequest, products, hasNextPage, lastCursor } = data[activeKey] as Exclude<
      AppState['manualProducts']['data'][string],
      undefined
    >;
    if (statusRequest === 'success') {
      console.log({ products, hasNextPage, lastCursor });

      postmessage.emit('@ProductPage/manualProductSuccess', { fullProducts: { items: products, hasNextPage } });
      yield put(getManualProducts.success({ products, hasNextPage, lastCursor }));
    } else {
      const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
        url: 'manual-products',
        params: {
          s: activeKey ? activeKey : undefined,
          limit: 50,
        } as Params,
      });
      const _dataError = res.data as ResponseError;
      const _dataSuccess = res.data as ResponseSuccess;
      if (_dataError.code) {
        throw new Error(_dataError.message);
      }
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
      postmessage.emit('@ProductPage/manualProductSuccess', {
        fullProducts: { items: _dataItems, hasNextPage: _dataSuccess.data.hasNextPage },
      });
      yield put(
        getManualProducts.success({
          products: _dataItems,
          hasNextPage: _dataSuccess.data.hasNextPage,
          lastCursor: _dataItems.at(-1)?.cursor as string,
        }),
      );
    }
  } catch (err: any) {
    handleError(err as AxiosError<ErrorData> | Error);
    postmessage.emit('@ProductPage/manualProductFailure', { message: 'failed' });
    yield put(getManualProducts.failure({ message: err }));
  }
}

export function* watchGetManualProducts() {
  while (true) {
    const actionWatchGetManualProducts: ReturnType<typeof getManualProducts.request> = yield take(
      getActionType(getManualProducts.request),
    );
    if (task) {
      task.cancel();
    }
    task = yield fork(handleGetManualProducts, actionWatchGetManualProducts);
  }
}

export function* watchGetManualProductsCancel() {
  while (true) {
    const actionwatchGetManualProductsCancel: ReturnType<typeof getManualProducts.cancel> = yield take(
      getActionType(getManualProducts.cancel),
    );
    if (!!task && actionwatchGetManualProductsCancel.type === '@ManualProducts/getManualProductsCancel') {
      task.cancel();
    }
  }
}
