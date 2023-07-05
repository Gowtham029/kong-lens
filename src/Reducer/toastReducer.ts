/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers } from 'redux';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { snackMessageProp } from '../interfaces';

const snackBarInterface: snackMessageProp = {
  message: '',
  severity: 'success',
};

const toastMessage = (
  state = snackBarInterface,
  action: { type: string; payload: snackMessageProp }
) => {
  switch (action.type) {
    case ACTION_TYPES.TOAST_NOTIFICATION:
      return action.payload;
    default:
      return state;
  }
};

const isOpen = (state = false, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.TOAST_NOTIFICATION:
      return true;
    case ACTION_TYPES.TOAST_DISABLE:
      return false;
    default:
      return state;
  }
};

const toastReducer = combineReducers({ toastMessage, isOpen });
export default toastReducer;
