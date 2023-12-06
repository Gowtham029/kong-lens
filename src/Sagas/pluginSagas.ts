/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { getPluginData } from '../API/Plugin/getPluginData';
import { deletePlugin } from '../API/Plugin/deletePlugin';
import { getCurrentPlugin } from '../API/Plugin/getCurrentPlugin';
import { patchPlugin } from '../API/Plugin/patchPlugin';
import { postPlugin } from '../API/Plugin/postPlugin';
import { getPagePlugin } from '../API/Plugin/getPagePlugin';

export function* watchGetPluginDataSaga(): any {
  yield takeEvery(ACTION_TYPES.GET_PLUGIN_DATA, getPluginData);
}

export function* watchGetCurrentPluginDataSaga(): any {
  yield takeEvery(ACTION_TYPES.GET_CURRENT_PLUGIN_DATA, getCurrentPlugin);
}

export function* watchPostPluginDataSaga(): any {
  yield takeEvery(ACTION_TYPES.POST_CURRENT_PLUGIN_DATA, postPlugin);
}

export function* watchPatchPluginDataSaga(): any {
  yield takeEvery(ACTION_TYPES.PATCH_CURRENT_PLUGIN_DATA, patchPlugin);
}

export function* watchDeletePluginDataSaga(): any {
  yield takeEvery(ACTION_TYPES.DELETE_CURRENT_PLUGIN_DATA, deletePlugin);
}

export function* watchGetPagePluginDataSaga(): any {
  yield takeEvery(ACTION_TYPES.GET_CURRENT_PAGE_PLUGIN_DATA, getPagePlugin);
}
