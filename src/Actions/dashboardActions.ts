/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACTION_TYPES } from '../Shared/actionTypes';

export const getDashboardData = (): any => {
  return {
    type: ACTION_TYPES.GET_DASHBOARD_DATA,
  };
};

export const getDashboardResultData = (): any => {
  return {
    type: ACTION_TYPES.GET_DASHBOARD_RESULT_DATA,
  };
};
