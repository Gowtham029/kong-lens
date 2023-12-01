/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers } from 'redux';
import { ACTION_TYPES } from '../Shared/actionTypes';

const dashboardConnectionReducer = (
  state = {},
  action: { type: string; payload: any; index: number }
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_DASHBOARD_DATA:
      return state;
    case ACTION_TYPES.SET_DASHBOARD_DATA:
      return action.payload;
    default:
      return state;
  }
};

const dashboardResultReducer = (
  state = {},
  action: { type: string; payload: any; index: number }
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_DASHBOARD_RESULT_DATA:
      return state;
    case ACTION_TYPES.SET_DASHBOARD_RESULT_DATA:
      return action.payload;
    default:
      return state;
  }
};

const dashboardReducer = combineReducers({
  dashboardConnectionReducer,
  dashboardResultReducer,
});
export default dashboardReducer;
