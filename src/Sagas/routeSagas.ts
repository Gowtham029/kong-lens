/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { getRoutes } from '../API/getRoutes';
import { deleteRoute } from '../API/deleteRoute';
import { patchRoute } from '../API/patchRoute';
import { getRoute } from '../API/getRoute';
import { postRoute } from '../API/postRoute';
import { ACTION_TYPES } from '../Shared/actionTypes';

export function* watchGetRouteDataSaga(): any {
  yield takeLatest([ACTION_TYPES.GET_ROUTE_DATA], getRoutes);
}

export function* watchGetCurrentRouteDataSaga(): any {
  yield takeLatest([ACTION_TYPES.GET_CURRENT_ROUTE_DATA], getRoute);
}

export function* watchPostRouteDataSaga(): any {
  yield takeLatest([ACTION_TYPES.POST_CURRENT_ROUTE_DATA], postRoute);
}

export function* watchPatchRouteDataSaga(): any {
  yield takeLatest([ACTION_TYPES.PATCH_CURRENT_ROUTE_DATA], patchRoute);
}

export function* watchDeleteRouteDataSaga(): any {
  yield takeLatest([ACTION_TYPES.DELETE_ROUTE_DATA], deleteRoute);
}
