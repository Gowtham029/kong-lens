/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put } from 'redux-saga/effects';
import { GET } from '../../Helpers/ApiHelpers';
import { API_RESPONSE_SNACK_MESSAGE, BASE_API_URL } from '../../Shared/constants';
import { ACTION_TYPES } from '../../Shared/actionTypes';

export function* getConsumer(action: any): any {
  try {
    yield put({ type: ACTION_TYPES.SET_LOADER_TRUE });
    const { data }: any = yield call(GET, {
      url: `${BASE_API_URL}/consumer/${action.payload}`,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    yield put({ type: ACTION_TYPES.SET_CURRENT_CONSUMER_DATA, payload: data });
    yield put({ type: ACTION_TYPES.SET_LOADER_FALSE });
    yield put({
      type: ACTION_TYPES.TOAST_NOTIFICATION,
      payload: {
        message: API_RESPONSE_SNACK_MESSAGE.fetchedData,
        severity: 'success',
      },
    });
  } catch (error: any) {
    yield put({
      type: ACTION_TYPES.TOAST_NOTIFICATION,
      payload: {
        message: error.response
          ? error.response.data.message
          : API_RESPONSE_SNACK_MESSAGE.unableToFetchData,
        severity: 'error',
      },
    });
  } finally {
    yield put({ type: ACTION_TYPES.SET_LOADER_FALSE });
  }
}
