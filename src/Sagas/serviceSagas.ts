/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { getServices } from '../API/Service/getServices';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { deleteService } from '../API/Service/deleteService';
import { getService } from '../API/Service/getService';
import { postService } from '../API/Service/postService';
import { patchService } from '../API/Service/patchService';
import { getServiceRoute } from '../API/Service/getServiceRoute';


export function* watchGetServiceDataSaga(): any {
  yield takeEvery(ACTION_TYPES.GET_SERVICE_DATA, getServices);
}

export function* watchGetCurrentServiceDataSaga(): any {
  yield takeEvery(ACTION_TYPES.GET_CURRENT_SERVICE_DATA, getService);
}

export function* watchPostServiceDataSaga(): any {
  yield takeEvery(ACTION_TYPES.POST_CURRENT_SERVICE_DATA, postService);
}

export function* watchPatchServiceDataSaga(): any {
  yield takeEvery(ACTION_TYPES.PATCH_CURRENT_SERVICE_DATA, patchService);
}

export function* watchDeleteServiceDataSaga(): any {
  yield takeEvery(ACTION_TYPES.DELETE_SERVICE_DATA, deleteService);
}

export function* watchGetServiceRouteDataSaga(): any {
  yield takeEvery(ACTION_TYPES.GET_CURRENT_SERVICE_ROUTE_DATA, getServiceRoute);
}


