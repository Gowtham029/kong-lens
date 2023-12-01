/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers } from 'redux';
import { ACTION_TYPES } from '../Shared/actionTypes';

const showServiceRawView = (state = {}, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_SERVICE_RAW_VIEW:
      const tempState = new Map<string, boolean>();
      for (let i = 0; i < action.payload.length; i += 1) {
        tempState.set(action.payload[i].id, false);
      }
      return Object.fromEntries(tempState);
    case ACTION_TYPES.HANDLE_SERVICE_RAW_VIEW:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

const showRouteRawView = (state = {}, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ROUTE_RAW_VIEW:
      const tempState = new Map<string, boolean>();
      for (let i = 0; i < action.payload.length; i += 1) {
        tempState.set(action.payload[i].id, false);
      }
      return Object.fromEntries(tempState);
    case ACTION_TYPES.HANDLE_ROUTE_RAW_VIEW:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

const showConsumerRawView = (state = {}, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CONSUMER_RAW_VIEW:
      const tempState = new Map<string, boolean>();
      for (let i = 0; i < action.payload.length; i += 1) {
        tempState.set(action.payload[i].id, false);
      }
      return Object.fromEntries(tempState);
    case ACTION_TYPES.HANDLE_CONSUMER_RAW_VIEW:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

const showPluginRawView = (state = {}, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_PLUGIN_RAW_VIEW:
      const tempState = new Map<string, boolean>();
      for (let i = 0; i < action.payload.length; i += 1) {
        tempState.set(action.payload[i].id, false);
      }
      return Object.fromEntries(tempState);
    case ACTION_TYPES.HANDLE_PLUGIN_RAW_VIEW:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

const showAccessibleRoutesRawView = (state = {}, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ACCESS_ROUTE_RAW_VIEW:
      const tempState = new Map<string, boolean>();
      for (let i = 0; i < action.payload.length; i += 1) {
        tempState.set(action.payload[i].id, false);
      }
      return Object.fromEntries(tempState);
    case ACTION_TYPES.HANDLE_ACCESS_ROUTE_RAW_VIEW:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

const rawViewReducer = combineReducers({
  showServiceRawView,
  showRouteRawView,
  showConsumerRawView,
  showPluginRawView,
  showAccessibleRoutesRawView,
});
export default rawViewReducer;
