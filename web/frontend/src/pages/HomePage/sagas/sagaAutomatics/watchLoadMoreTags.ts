import { AxiosError, AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { loadMoreTags } from '../../actions/actionTags';
import { ResponseError, ResponseSuccess } from '../../TagsAPI';

let task: Task | undefined;

function* handleLoadMoreTags(_: ReturnType<typeof loadMoreTags.request>) {
  try {
    const { tagSearchKey, tags }: AppState['automatics'] = yield select((state: AppState) => state.automatics);
    const { hasNextPage, lastCursor } = tags[tagSearchKey] as Exclude<
      AppState['automatics']['tags'][string],
      undefined
    >;
    if (!hasNextPage || !lastCursor) {
      yield put(loadMoreTags.success({ data: [], hasNextPage, lastCursor }));
      postmessage.emit('@Automatic/loadMoreTagsSuccess', { tags: [], hasNextPage });
    } else {
      const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
        url: 'tags',
        params: {
          s: tagSearchKey ? tagSearchKey : undefined,
          cursor: lastCursor,
        },
      });
      const _dataError = res.data as ResponseError;
      const _dataSuccess = res.data as ResponseSuccess;
      if (_dataError.code) {
        throw new Error(_dataError.message);
      }
      yield put(
        loadMoreTags.success({
          data: _dataSuccess.data.items,
          hasNextPage: _dataSuccess.data.hasNextPage,
          lastCursor: _dataSuccess.data.items.at(-1)?.cursor as string,
        }),
      );
      postmessage.emit('@Automatic/loadMoreTagsSuccess', {
        tags: _dataSuccess.data.items,
        hasNextPage: _dataSuccess.data.hasNextPage,
      });
    }
  } catch (err) {
    handleError(err as AxiosError<ErrorData> | Error);
    postmessage.emit('@Automatic/loadMoreTagsFailure', undefined);

    yield put(loadMoreTags.failure(undefined));
  }
}

export function* watchLoadMoreTags() {
  while (true) {
    const actionLoadMoreTags: ReturnType<typeof loadMoreTags.request> = yield take(getActionType(loadMoreTags.request));
    if (task) {
      task.cancel();
    }
    task = yield fork(handleLoadMoreTags, actionLoadMoreTags);
  }
}

export function* watchLoadMoreTagsCancel() {
  while (true) {
    const actionWatchLoadMoreCancel: ReturnType<typeof loadMoreTags.cancel> = yield take(
      getActionType(loadMoreTags.cancel),
    );
    if (!!task && actionWatchLoadMoreCancel.type === '@Automatic/loadMoreTagsCancel') {
      task.cancel();
    }
  }
}
