/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put } from 'redux-saga/effects';
import { ACTION_TYPES } from '../../Shared/actionTypes';
import {
  API_RESPONSE_SNACK_MESSAGE,
  AUTH_API_URL,
} from '../../Shared/constants';
import { POST } from '../../Helpers/ApiHelpers';

export function* login(action: any): any {
  try {
    const { data } = yield call(POST, {
      url: `${AUTH_API_URL}/api/login`,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: action.payload,
    });
    yield put({ type: ACTION_TYPES.SET_LOGIN_TOKEN, data });
    yield put({
      type: ACTION_TYPES.REMOVE_LOGIN_ERR_MESSAGE,
    });
    yield put({ type: ACTION_TYPES.SET_LOADER_TRUE });
    action.navigate('/dashboard');
  } catch (error: any) {
    yield put({
      type: ACTION_TYPES.SET_LOGIN_ERR_MESSAGE,
      payload: {
        message: error.response
          ? error.response.data.message
          : API_RESPONSE_SNACK_MESSAGE.errorWhileLogin,
      },
    });
  }
}
