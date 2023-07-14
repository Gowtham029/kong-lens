/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NavigateFunction } from 'react-router-dom';
import { ACTION_TYPES } from '../Shared/actionTypes';

export const setLoginToken = (data: any, func: NavigateFunction) => {
  return {
    type: ACTION_TYPES.LOGIN_USER,
    payload: data,
    navigate: func,
  };
};
