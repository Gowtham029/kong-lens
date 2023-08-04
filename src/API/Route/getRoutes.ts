/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put } from 'redux-saga/effects';
import { GET } from '../../Helpers/ApiHelpers';
import {
  API_RESPONSE_SNACK_MESSAGE,
  BASE_API_URL,
} from '../../Shared/constants';
import { ACTION_TYPES } from '../../Shared/actionTypes';

export function* getRoutes(): any {
  try {
    yield put({ type: ACTION_TYPES.SET_LOADER_TRUE });
    let { data }: any = yield call(GET, {
      url: `${BASE_API_URL}/routes/`,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    let service = yield call(GET, {
      url: `${BASE_API_URL}/services/`,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });
    data = yield data.data;
    service = yield service.data.data;
    yield put({
      type: ACTION_TYPES.SET_ROUTE_DATA,
      payload: { data, service },
    });
    yield put({ type: ACTION_TYPES.SET_ROUTE_RAW_VIEW, payload: data });
    yield put({
      type: ACTION_TYPES.TOAST_NOTIFICATION,
      payload: {
        message: API_RESPONSE_SNACK_MESSAGE.fetchedData,
        severity: 'success',
      },
    });
    yield put({ type: ACTION_TYPES.SET_LOADER_FALSE });
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
