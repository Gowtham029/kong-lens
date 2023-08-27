/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { getConsumerData } from '../API/Consumer/getConsumerData';
import { deleteConsumer } from '../API/Consumer/deleteConsumer';
import { getCurrentConsumer } from '../API/Consumer/getCurrentConusmer';
import { patchConsumer } from '../API/Consumer/patchConsumer';
import { postConsumer } from '../API/Consumer/postConsumer';

export function* watchGetConsumerDataSaga(): any {
  yield takeLatest([ACTION_TYPES.GET_CONSUMER_DATA], getConsumerData);
}

export function* watchGetCurrentConsumerDataSaga(): any {
  yield takeLatest(
    [ACTION_TYPES.GET_CURRENT_CONSUMER_DATA],
    getCurrentConsumer
  );
}

export function* watchPostConsumerDataSaga(): any {
  yield takeEvery(ACTION_TYPES.POST_CURRENT_CONSUMER_DATA, postConsumer);
}

export function* watchPatchConsumerDataSaga(): any {
  yield takeLatest([ACTION_TYPES.PATCH_CURRENT_CONSUMER_DATA], patchConsumer);
}

export function* watchDeleteConsumerDataSaga(): any {
  yield takeLatest([ACTION_TYPES.DELETE_CURRENT_CONSUMER_DATA], deleteConsumer);
}
