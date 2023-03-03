import { AxiosError, AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, put, retry, select, take, takeLatest } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { getBadges, getVariantBadges } from '../../actions/actionBadges';
import { Params, ResponseError, ResponseSuccess } from '../../BadgeAPI';

let task: Task | undefined;

function* handleGetBadges({ payload: { taxName, taxSlugs } }: ReturnType<typeof getBadges.request>) {
  try {
    const { activeKey }: AppState['badges'] = yield select((state: AppState) => state.badges);

    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: 'default-badges',
      params: {
        s: activeKey ? activeKey : undefined,
        taxName: taxName ? taxName : undefined,
        taxSlugs: taxSlugs ? taxSlugs : undefined,
        limit: 100,
      } as Params,
    });

    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;

    if (_dataError.code) {
      throw new Error(_dataError.message);
    }

    postmessage.emit('@BadgesPage/getBadgesSuccess', {
      data: { items: _dataSuccess.data.items, maxPages: _dataSuccess.data.maxPage, page: _dataSuccess.data.page },
    });

    yield put(
      getBadges.success({
        badges: _dataSuccess.data.items,
        maxPage: _dataSuccess.data.maxPage,
        page: _dataSuccess.data.page,
      }),
    );
  } catch (err) {
    handleError(err as AxiosError<ErrorData> | Error);
    yield put(getBadges.failure(undefined));
  }
}

function* handleGetVariantBadges({ payload }: ReturnType<typeof getVariantBadges.request>) {
  const { id } = payload;

  try {
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: `variant-badges/${id}`,
    });

    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) {
      throw new Error(_dataError.message);
    }

    yield put(
      getVariantBadges.success({
        badges: _dataSuccess.data.items,
      }),
    );

    postmessage.emit('@BadgesPage/getVariantBadgesSuccess', { data: { items: _dataSuccess.data.items } });
  } catch (error) {
    handleError(error as AxiosError<ErrorData> | Error);
    postmessage.emit('@BadgesPage/getVariantBadgesFailure', { message: 'failed' });
    yield put(getVariantBadges.failure(undefined));
  }
}

export function* watchGetBadges() {
  while (true) {
    const actionWatchGetBadges: ReturnType<typeof getBadges.request> = yield take(getActionType(getBadges.request));
    if (task) {
      task.cancel();
    }
    task = yield fork(handleGetBadges, actionWatchGetBadges);
  }
}

export function* watchGetVariantBadges() {
  yield takeLatest(getActionType(getVariantBadges.request), handleGetVariantBadges);
}

export function* watchGetBadgesCancel() {
  while (true) {
    const actionwatchGetBadgesCancel: ReturnType<typeof getBadges.cancel> = yield take(getActionType(getBadges.cancel));
    if (!!task && actionwatchGetBadgesCancel.type === '@Badges/getBadgesCancel') {
      task.cancel();
    }
  }
}
