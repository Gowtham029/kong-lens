/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers } from 'redux';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { SERVICE_DETAILS_INTERFACE } from '../Shared/constants';

const serviceData = (
  state = [],
  action: { type: string; payload: any; index: number }
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_SERVICE_DATA:
      return state;
    case ACTION_TYPES.SET_SERVICE_DATA:
      return action.payload;
    case ACTION_TYPES.ADD_SERIVCE_DATA:
      return [...state, action.payload];
    case ACTION_TYPES.CONFIRM_SERVICE_DELETE:
      state.splice(action.index, 1);
      return [...state];
    default:
      return state;
  }
};

const currentServiceData = (
  state = SERVICE_DETAILS_INTERFACE,
  action: { type: string; payload: any; index: number }
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_CURRENT_SERVICE_DATA:
      return state;
    case ACTION_TYPES.SET_CURRENT_SERVICE_DATA:
      return action.payload;
    default:
      return state;
  }
};

const currentServiceRouteData = (state = [], action: any) => {
  switch (action.type) {
    case ACTION_TYPES.GET_CURRENT_SERVICE_ROUTE_DATA:
      return state;
    case ACTION_TYPES.SET_CURRENT_SERVICE_ROUTE_DATA:
      return action.payload;
    case ACTION_TYPES.ADD_CURRENT_SERIVE_ROUTE_DATA:
      return [...state, action.payload];
    case ACTION_TYPES.CONFIRM_ROUTE_DELETE:
      state.splice(action.index, 1);
      return [...state];
    default:
      return state;
  }
};

const currentServicePluginData = (state = [], action: any) => {
  switch (action.type) {
    case ACTION_TYPES.GET_CURRENT_SERVICE_PLUGIN_DATA:
      return state;
    case ACTION_TYPES.SET_CURRENT_SERVICE_PLUGIN_DATA:
      action.payload.forEach((data: any) => {
        if (data.service == null) {
          data.service = { id: 'All EntryPoints' };
          data.scope = 'Global';
        } else {
          data.service;
          data.scope = 'services';
        }
        if (data.consumer == null) {
          data.consumer = { id: 'All Consumers' };
          data.scope = 'Global';
        } else data.consumer;
        delete data.service;
      });
      return action.payload;
    case ACTION_TYPES.ADD_CURRENT_SERIVE_PLUGIN_DATA:
      return [...state, action.payload];
    case ACTION_TYPES.CONFIRM_PLUGIN_DELETE:
      state.splice(action.index, 1);
      return [...state];
    default:
      return state;
  }
};

const serviceReducer = combineReducers({
  serviceData,
  currentServiceData,
  currentServiceRouteData,
  currentServicePluginData,
});
export default serviceReducer;
