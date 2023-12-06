/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers } from 'redux';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { ROUTE_DETAILS_INTERFACE } from '../Shared/constants';

const routeData = (
  state = [],
  action: { type: string; payload: any; index: number }
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_ROUTE_DATA:
      return state;
    case ACTION_TYPES.SET_ROUTE_DATA:
      const { data, service } = action.payload;
      const routeServiceMap = new Map<string, number>();
      for (let i = 0; i < service.length; i += 1) {
        routeServiceMap.set(service[i].id, i);
      }
      for (let i = 0; i < data.length; i += 1) {
        const { id } = data[i].service;
        data[i].service = service[routeServiceMap.get(id) as unknown as string];
      }
      return data;
    case ACTION_TYPES.CONFIRM_ROUTE_DELETE:
      state.splice(action.index, 1);
      return [...state];
    default:
      return state;
  }
};

const isRouteOpen = (state = false, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.OPEN_ROUTE_MODAL:
      return true;
    case ACTION_TYPES.CLOSE_ROUTE_MODAL:
      return false;
    default:
      return state;
  }
};

const currentRouteData = (state = ROUTE_DETAILS_INTERFACE, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_CURRENT_ROUTE_DATA:
      return action.payload;
    case ACTION_TYPES.HANDLE_CURRENT_ROUTE_DATA:
      return { ...state, [action.payload.key]: action.payload.value };
    default:
      return state;
  }
};

const routePluginsData = (state = {}, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ROUTE_PLUGIN_DATA:
      return { ...state, [action.payload.id]: action.payload.data };
    default:
      return state;
  }
};

const routeReducer = combineReducers({
  routeData,
  isRouteOpen,
  currentRouteData,
  routePluginsData,
});
export default routeReducer;
