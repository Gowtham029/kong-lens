/* eslint-disable no-param-reassign */
/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers } from 'redux';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { PLUGIN_DETAILS_INTERFACE } from '../Shared/constants';

const pluginData = (
  state = [],
  action: { type: string; payload: any; index: number }
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_PLUGIN_DATA:
      return state;
    case ACTION_TYPES.SET_PLUGIN_DATA:
      return action.payload;
    case ACTION_TYPES.ADD_PLUGIN_DATA:
      return [...state, action.payload];
    case ACTION_TYPES.CONFIRM_PLUGIN_DELETE:
      state.splice(action.index, 1);
      return [...state];
    default:
      return state;
  }
};

const tablePluginData = (
  state = [],
  action: { type: string; payload: any; index: number }
) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PLUGIN_DATA:
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
      });
      return action.payload;
    case ACTION_TYPES.CONFIRM_PLUGIN_DELETE:
      state.splice(action.index, 1);
      return [...state];
    default:
      return state;
  }
};

const currentPluginData = (
  state = PLUGIN_DETAILS_INTERFACE,
  action: { type: string; payload: any; index: number }
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_CURRENT_PLUGIN_DATA:
      return state;
    case ACTION_TYPES.SET_CURRENT_PLUGIN_DATA:
      return action.payload;
    default:
      return state;
  }
};

const pluginReducer = combineReducers({
  pluginData,
  tablePluginData,
  currentPluginData,
});
export default pluginReducer;
