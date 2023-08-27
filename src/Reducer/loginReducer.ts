/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers } from 'redux';
import { ACTION_TYPES } from '../Shared/actionTypes';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const loginUser = (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOGIN_TOKEN:
      if (!action.onlyReducer)
        localStorage.setItem('user', JSON.stringify(action.data));
      return {
        ...state,
        user: action.data,
        isAuthenticated: true,
      };
    case ACTION_TYPES.LOGOUT:
      localStorage.removeItem('user');
      action.navigate('/');
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const showLoginErrorMessage = (state = {}, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOGIN_ERR_MESSAGE:
      return { ...action.payload, show: true };
    case ACTION_TYPES.REMOVE_LOGIN_ERR_MESSAGE:
      return { ...state, message: '', show: false };
    default:
      return state;
  }
};

const setPreserveRoute = (state = false, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PRESERVE_ROUTE_FALSE:
      return false;
    case ACTION_TYPES.SET_PRESERVE_ROUTE_TRUE:
      return true;
    default:
      return state;
  }
};

const loginReducer = combineReducers({
  loginUser,
  showLoginErrorMessage,
  setPreserveRoute,
});

export default loginReducer;
