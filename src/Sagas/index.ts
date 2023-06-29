/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { fork, all } from 'redux-saga/effects';
import {
  watchDeleteServiceDataSaga,
  watchGetCurrentServiceDataSaga,
  watchGetServiceDataSaga,
  watchGetServiceRouteDataSaga,
  watchPatchServiceDataSaga,
  watchPostServiceDataSaga,
} from './serviceSagas';
import {
  watchDeleteRouteDataSaga,
  watchGetCurrentRouteDataSaga,
  watchGetRouteDataSaga,
  watchPatchRouteDataSaga,
  watchPostRouteDataSaga,
} from './routeSagas';

export default function* combinedSaga() {
  yield all([
    fork(watchGetServiceDataSaga),
    fork(watchDeleteServiceDataSaga),
    fork(watchGetRouteDataSaga),
    fork(watchDeleteRouteDataSaga),
    fork(watchGetCurrentServiceDataSaga),
    fork(watchPostServiceDataSaga),
    fork(watchPatchServiceDataSaga),
    fork(watchPatchRouteDataSaga),
    fork(watchGetCurrentRouteDataSaga),
    fork(watchPostRouteDataSaga),
    fork(watchGetServiceRouteDataSaga),
  ]);
}
