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
import { watchGetLoginDataSaga } from './loginSagas';
import {
  watchDeleteConsumerDataSaga,
  watchGetConsumerDataSaga,
  watchGetCurrentConsumerDataSaga,
  watchPatchConsumerDataSaga,
  watchPostConsumerDataSaga,
} from './consumerSagas';

export default function* combinedSaga() {
  yield all([
    fork(watchGetLoginDataSaga),
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
    fork(watchGetConsumerDataSaga),
    fork(watchDeleteConsumerDataSaga),
    fork(watchGetCurrentConsumerDataSaga),
    fork(watchPatchConsumerDataSaga),
    fork(watchPostConsumerDataSaga),
  ]);
}
