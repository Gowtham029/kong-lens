/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-param-reassign */
import { combineReducers } from 'redux';
import serviceReducer from './serviceReducer';
import toastReducer from './toastReducer';
import loadingData from './loadingReducer';
import routeReducer from './routeReducer';
import rawViewReducer from './rawViewReducer';

const rootReducer = combineReducers({
  loadingData,
  serviceReducer,
  routeReducer,
  toastReducer,
  rawViewReducer,
});

export default rootReducer;
