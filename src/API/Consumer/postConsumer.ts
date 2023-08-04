/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put } from 'redux-saga/effects';
import { POST } from '../../Helpers/ApiHelpers';
import {
  API_RESPONSE_SNACK_MESSAGE,
  BASE_API_URL,
} from '../../Shared/constants';
import { ACTION_TYPES } from '../../Shared/actionTypes';

export function* postConsumer(action: any): any {
  try {
    yield put({ type: ACTION_TYPES.SET_LOADER_TRUE });
    const { data } = yield call(POST, {
      url: `${BASE_API_URL}/consumers/`,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: action.payload,
    });
    yield put({ type: ACTION_TYPES.SET_CURRENT_CONSUMER_DATA, payload: data });
    yield put({ type: ACTION_TYPES.ADD_CONSUMER_DATA, payload: data });
    yield put({ type: ACTION_TYPES.SET_LOADER_FALSE });
    action.navigate(`../consumers/${data.username}?newId=false`, {
      replace: true,
    });
    yield put({
      type: ACTION_TYPES.TOAST_NOTIFICATION,
      payload: {
        message: API_RESPONSE_SNACK_MESSAGE.createdNewService,
        severity: 'success',
      },
    });
  } catch (error: any) {
    yield put({
      type: ACTION_TYPES.SET_CURRENT_CONSUMER_DATA,
      payload: action.payload,
    });
    yield put({
      type: ACTION_TYPES.TOAST_NOTIFICATION,
      payload: {
        message: error.response
          ? error.response.data.message
          : API_RESPONSE_SNACK_MESSAGE.unableToSaveData,
        severity: 'error',
      },
    });
  } finally {
    yield put({ type: ACTION_TYPES.SET_LOADER_FALSE });
  }
}
