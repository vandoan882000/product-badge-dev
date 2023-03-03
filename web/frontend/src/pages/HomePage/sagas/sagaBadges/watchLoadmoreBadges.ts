import { AxiosError, AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { loadmoreBadges } from '../../actions/actionBadges';
import { Params, ResponseError, ResponseSuccess } from '../../BadgeAPI';

let task: Task | undefined;

function* handleloadmoreBadges({ payload }: ReturnType<typeof loadmoreBadges.request>) {
  try {
    const { limit, page } = payload;
    const { activeKey }: AppState['badges'] = yield select((state: AppState) => state.badges);
    const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
      url: 'default-badges',
      params: {
        s: activeKey ? activeKey : undefined,
        page: page,
        limit: limit ? limit : 10,
      } as Params,
    });
    const _dataError = res.data as ResponseError;
    const _dataSuccess = res.data as ResponseSuccess;
    if (_dataError.code) {
      throw new Error(_dataError.message);
    }
    yield put(
      loadmoreBadges.success({
        badges: _dataSuccess.data.items,
        maxPage: _dataSuccess.data.maxPage,
        page: _dataSuccess.data.page,
      }),
    );
    postmessage.emit('@BadgesPage/loadMoreBadgesSuccess', {
      data: { maxPages: _dataSuccess.data.maxPage, items: _dataSuccess.data.items },
    });
  } catch (err) {
    handleError(err as AxiosError<ErrorData> | Error);
    postmessage.emit('@BadgesPage/loadMoreBadgesFailure', { message: 'failed' });
    yield put(loadmoreBadges.failure(undefined));
  }
}

export function* watchloadmoreBadges() {
  while (true) {
    const actionWatchloadmoreBadges: ReturnType<typeof loadmoreBadges.request> = yield take(
      getActionType(loadmoreBadges.request),
    );
    if (task) {
      task.cancel();
    }
    task = yield fork(handleloadmoreBadges, actionWatchloadmoreBadges);
  }
}

export function* watchloadmoreBadgesCancel() {
  while (true) {
    const actionwatchloadmoreBadgesCancel: ReturnType<typeof loadmoreBadges.cancel> = yield take(
      getActionType(loadmoreBadges.cancel),
    );
    if (!!task && actionwatchloadmoreBadgesCancel.type === '@Badges/loadmoreBadgesCancel') {
      task.cancel();
    }
  }
}
