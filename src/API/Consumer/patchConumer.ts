/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put } from 'redux-saga/effects';
import { PATCH } from '../../Helpers/ApiHelpers';
import {
  API_RESPONSE_SNACK_MESSAGE,
  BASE_API_URL,
} from '../../Shared/constants';
import { ACTION_TYPES } from '../../Shared/actionTypes';

export function* patchConsumer(action: any): any {
  try {
    yield call(PATCH, {
      url: `${BASE_API_URL}/consumers/${action.payload.id}`,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: action.payload.data,
    });
    yield put({
      type: ACTION_TYPES.SET_CURRENT_CONSUMER_DATA,
      payload: action.payload.data,
    });
    yield put({
      type: ACTION_TYPES.TOAST_NOTIFICATION,
      payload: {
        message: API_RESPONSE_SNACK_MESSAGE.modifiedConumer,
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
  }
}
