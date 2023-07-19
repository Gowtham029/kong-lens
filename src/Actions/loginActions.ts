/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NavigateFunction } from 'react-router-dom';
import { ACTION_TYPES } from '../Shared/actionTypes';

export const loginUser = (data: any, func: NavigateFunction) => {
  return {
    type: ACTION_TYPES.LOGIN_USER,
    payload: data,
    navigate: func,
  };
};

export const setLoginToken = (data: any) => {
  return {
    type: ACTION_TYPES.SET_LOGIN_TOKEN,
    data,
    onlyReducer: true,
  };
};

export const logOut = (func: NavigateFunction) => {
  return {
    type: ACTION_TYPES.LOGOUT,
    navigate: func,
  };
};
