/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { getRoutes } from '../API/Route/getRoutes';
import { deleteRoute } from '../API/Route/deleteRoute';
import { patchRoute } from '../API/Route/patchRoute';
import { getRoute } from '../API/Route/getRoute';
import { postRoute } from '../API/Route/postRoute';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { getRoutePlugins } from '../API/Route/getRoutePlugins';

export function* watchGetRouteDataSaga(): any {
  yield takeEvery(ACTION_TYPES.GET_ROUTE_DATA, getRoutes);
}

export function* watchGetCurrentRouteDataSaga(): any {
  yield takeEvery(ACTION_TYPES.GET_CURRENT_ROUTE_DATA, getRoute);
}

export function* watchPostRouteDataSaga(): any {
  yield takeEvery(ACTION_TYPES.POST_CURRENT_ROUTE_DATA, postRoute);
}

export function* watchPatchRouteDataSaga(): any {
  yield takeEvery(ACTION_TYPES.PATCH_CURRENT_ROUTE_DATA, patchRoute);
}

export function* watchDeleteRouteDataSaga(): any {
  yield takeEvery(ACTION_TYPES.DELETE_ROUTE_DATA, deleteRoute);
}

export function* watchGetRoutePluginsDataSaga(): any {
  yield takeEvery(ACTION_TYPES.GET_ROUTE_PLUGIN_DATA, getRoutePlugins);
}
