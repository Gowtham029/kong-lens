/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { getServices } from '../API/getServices';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { deleteService } from '../API/deleteService';
import { getService } from '../API/getService';
import { postService } from '../API/postService';
import { patchService } from '../API/patchService';
import { getServiceRoute } from '../API/getServiceRoute';

export function* watchGetServiceDataSaga(): any {
  yield takeLatest([ACTION_TYPES.GET_SERVICE_DATA], getServices);
}

export function* watchGetCurrentServiceDataSaga(): any {
  yield takeLatest([ACTION_TYPES.GET_CURRENT_SERVICE_DATA], getService);
}

export function* watchPostServiceDataSaga(): any {
  yield takeEvery(ACTION_TYPES.POST_CURRENT_SERVICE_DATA, postService);
}

export function* watchPatchServiceDataSaga(): any {
  yield takeLatest([ACTION_TYPES.PATCH_CURRENT_SERVICE_DATA], patchService);
}

export function* watchDeleteServiceDataSaga(): any {
  yield takeLatest([ACTION_TYPES.DELETE_SERVICE_DATA], deleteService);
}

export function* watchGetServiceRouteDataSaga(): any {
  yield takeLatest(
    [ACTION_TYPES.GET_CURRENT_SERVICE_ROUTE_DATA],
    getServiceRoute
  );
}
