import { takeEvery } from 'redux-saga/effects';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { login } from '../API/Login/getLoginToken';

/* eslint-disable @typescript-eslint/no-explicit-any */
export function* watchGetLoginDataSaga(): any {
  yield takeEvery(ACTION_TYPES.LOGIN_USER, login);
}
