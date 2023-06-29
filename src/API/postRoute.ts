/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, delay, put } from 'redux-saga/effects';
import { POST } from '../Helpers/ApiHelpers';
import { API_RESPONSE_SNACK_MESSAGE, BASE_API_URL } from '../Shared/constants';
import { ACTION_TYPES } from '../Shared/actionTypes';

export function* postRoute(action: any): any {
  try {
    yield put({ type: ACTION_TYPES.SET_LOADER_TRUE });
    yield call(POST, {
      url: `${BASE_API_URL}/routes/`,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: action.payload,
    });
    yield put({ type: ACTION_TYPES.SET_LOADER_FALSE });
    yield put({ type: ACTION_TYPES.CLOSE_ROUTE_MODAL });
    yield put({
      type: ACTION_TYPES.TOAST_NOTIFICATION,
      payload: {
        message: API_RESPONSE_SNACK_MESSAGE.createdNewRoute,
        severity: 'success',
      },
    });
  } catch (error: any) {
    yield put({
      type: ACTION_TYPES.TOAST_NOTIFICATION,
      payload: {
        message: error.response
          ? error.response.data.message
          : API_RESPONSE_SNACK_MESSAGE.unableToSaveData,
        severity: 'error',
      },
    });
    yield put({ type: ACTION_TYPES.SET_LOADER_FALSE });
  }
}
