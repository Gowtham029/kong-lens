/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers } from 'redux';
import { ACTION_TYPES } from '../Shared/actionTypes';

const loginUser = (_state = false, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOGIN_TOKEN:
      localStorage.setItem('token', action.data.token);
      localStorage.setItem('refreshToken', action.data.refreshToken);
      return true;
    case ACTION_TYPES.LOGIN_USER:
      return true;
    default:
      return false;
  }
};

const showLoginErrorMessage = (state = {}, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOGIN_ERR_MESSAGE:
      return { ...action.payload, show: true };
    default:
      return { message: '', show: false };
  }
};

const loginReducer = combineReducers({
  loginUser,
  showLoginErrorMessage,
});

export default loginReducer;
