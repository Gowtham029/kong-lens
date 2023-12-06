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
  watchGetRoutePluginsDataSaga,
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
import {
  watchGetPluginDataSaga,
  watchPostPluginDataSaga,
  watchDeletePluginDataSaga,
  watchPatchPluginDataSaga,
  watchGetCurrentPluginDataSaga,
  watchGetPagePluginDataSaga,
} from './pluginSagas';
import {
  watchGetDashboardDataSaga,
  watchGetDashboardResultDataSaga,
} from './dashboardSagas';

export default function* combinedSaga() {
  yield all([
    fork(watchGetLoginDataSaga),
    fork(watchGetServiceDataSaga),
    fork(watchDeleteServiceDataSaga),
    fork(watchGetRouteDataSaga),
    fork(watchDeleteRouteDataSaga),
    fork(watchGetCurrentServiceDataSaga),
    fork(watchGetPagePluginDataSaga),
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
    fork(watchGetPluginDataSaga),
    fork(watchGetCurrentPluginDataSaga),
    fork(watchPostPluginDataSaga),
    fork(watchDeletePluginDataSaga),
    fork(watchPatchPluginDataSaga),
    fork(watchGetDashboardDataSaga),
    fork(watchGetDashboardResultDataSaga),
    fork(watchGetRoutePluginsDataSaga),
  ]);
}
