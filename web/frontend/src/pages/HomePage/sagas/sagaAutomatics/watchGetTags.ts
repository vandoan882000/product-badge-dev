import { AxiosError, AxiosResponse } from 'axios';
import { Task } from 'redux-saga';
import { fork, put, retry, select, take } from 'redux-saga/effects';
import { ErrorData, fetchAPI, handleError, postmessage } from 'utils';
import { getActionType } from 'wiloke-react-core/utils';
import { getTags } from '../../actions/actionTags';
import { ResponseError, ResponseSuccess } from '../../TagsAPI';

let task: Task | undefined;

function* handleGetTags(_: ReturnType<typeof getTags.request>) {
  try {
    const { tagSearchKey, tags }: AppState['automatics'] = yield select((state: AppState) => state.automatics);
    const { statusRequest, hasNextPage, lastCursor, data } = tags[tagSearchKey] as Exclude<
      AppState['automatics']['tags'][string],
      undefined
    >;
    if (statusRequest === 'success') {
      yield put(getTags.success({ data: data, hasNextPage, lastCursor }));
      postmessage.emit('@Automatic/getTagsSuccess', { tags: data, hasNextPage });
    } else {
      const res: AxiosResponse<ResponseSuccess | ResponseError> = yield retry(3, 1000, fetchAPI.request, {
        url: 'tags',
        params: {
          s: tagSearchKey ? tagSearchKey : undefined,
        },
      });
      const _dataError = res.data as ResponseError;
      const _dataSuccess = res.data as ResponseSuccess;
      if (_dataError.code) {
        throw new Error(_dataError.message);
      }
      yield put(
        getTags.success({
          data: _dataSuccess.data.items,
          hasNextPage: _dataSuccess.data.hasNextPage,
          lastCursor: _dataSuccess.data.items.at(-1)?.cursor as string,
        }),
      );
      postmessage.emit('@Automatic/getTagsSuccess', {
        tags: _dataSuccess.data.items,
        hasNextPage: _dataSuccess.data.hasNextPage,
      });
    }
  } catch (err) {
    handleError(err as AxiosError<ErrorData> | Error);
    postmessage.emit('@Automatic/getTagsFailure', undefined);
    yield put(getTags.failure(undefined));
  }
}

export function* watchGetTags() {
  while (true) {
    const actionGetTags: ReturnType<typeof getTags.request> = yield take(getActionType(getTags.request));
    if (task) {
      task.cancel();
    }
    task = yield fork(handleGetTags, actionGetTags);
  }
}

export function* watchGetTagsCancel() {
  while (true) {
    const actionWatchGetTagsCancel: ReturnType<typeof getTags.cancel> = yield take(getActionType(getTags.cancel));
    if (!!task && actionWatchGetTagsCancel.type === '@Automatic/getTagsCancel') {
      task.cancel();
    }
  }
}
