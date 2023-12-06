/* eslint-disable @typescript-eslint/no-explicit-any */
import { takeEvery } from 'redux-saga/effects';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { getDashboardData } from '../API/Dashboard/getStatus';
import { getDashboardResultData } from '../API/Dashboard/getDashboardResult';

export function* watchGetDashboardDataSaga(): any {
  yield takeEvery(ACTION_TYPES.GET_DASHBOARD_DATA, getDashboardData);
}

export function* watchGetDashboardResultDataSaga(): any {
  yield takeEvery(
    ACTION_TYPES.GET_DASHBOARD_RESULT_DATA,
    getDashboardResultData
  );
}
