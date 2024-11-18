/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { getUpstreams } from '../API/Upstreams/getUpstreams';
import { getUpstreamData } from '../API/Upstreams/getUpstreamData';
import { deleteUpstream } from '../API/Upstreams/deleteUpstreamData';
import { postUpstream } from '../API/Upstreams/postUpstream';

export function* watchGetUpstreamsDataSaga(): any {
  yield takeEvery(ACTION_TYPES.GET_UPSTREAMS_DATA, getUpstreams);
}

export function* watchGetCurrentUpstreamDataSaga(): any {
  yield takeEvery([ACTION_TYPES.GET_CURRENT_UPSTREAMS_DATA], getUpstreamData);
}

export function* watchDeleteUpstreamDataSaga(): any {
  yield takeEvery([ACTION_TYPES.DELETE_UPSTREAM_DATA], deleteUpstream);
}

export function* watchPostUpstreamDataSaga(): any {
  yield takeEvery([ACTION_TYPES.POST_CURRENT_UPSTREAM_DATA], postUpstream);
}
