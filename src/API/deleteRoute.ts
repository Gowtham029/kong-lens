/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, cancel, put } from 'redux-saga/effects';
import { DELETE, GET } from '../Helpers/ApiHelpers';
import { API_RESPONSE_SNACK_MESSAGE, BASE_API_URL } from '../Shared/constants';
import { ACTION_TYPES } from '../Shared/actionTypes';

export function* deleteRoute(action: any): any {
  try {
    yield call(DELETE, {
      url: `${BASE_API_URL}/routes/${action.payload.id}`,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    yield put({
      type: ACTION_TYPES.CONFIRM_ROUTE_DELETE,
      index: action.payload.index,
    });
    yield put({
      type: ACTION_TYPES.TOAST_NOTIFICATION,
      payload: {
        message: API_RESPONSE_SNACK_MESSAGE.deletedRoute,
        severity: 'info',
      },
    });
  } catch (error: any) {
    yield put({
      type: ACTION_TYPES.TOAST_NOTIFICATION,
      payload: {
        message: error.response
          ? error.response.data.message
          : API_RESPONSE_SNACK_MESSAGE.unableToDelete,
        severity: 'error',
      },
    });
  }
}
