/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ACTION_TYPES } from '../Shared/actionTypes';

export const getRouteData = () => {
  return {
    type: ACTION_TYPES.GET_ROUTE_DATA,
  };
};

export const getCurrentRouteData = (id: string) => {
  return {
    type: ACTION_TYPES.GET_CURRENT_ROUTE_DATA,
    payload: id,
  };
};

export const handleCurrentRouteData = (key: string, value: any) => {
  return {
    type: ACTION_TYPES.HANDLE_CURRENT_ROUTE_DATA,
    payload: { key, value },
  };
};

export const patchCurrentRouteData = (data: any, id: string) => {
  return {
    type: ACTION_TYPES.PATCH_CURRENT_ROUTE_DATA,
    payload: { data, id },
  };
};

export const postCurrentRouteData = (data: any) => {
  return {
    type: ACTION_TYPES.POST_CURRENT_ROUTE_DATA,
    payload: data,
  };
};

export const deleteRouteData = (id: string, index: number) => {
  return {
    type: ACTION_TYPES.DELETE_ROUTE_DATA,
    payload: { id, index },
  };
};

export const getRoutePluginsAction = (id: string) => {
  return {
    type: ACTION_TYPES.GET_ROUTE_PLUGIN_DATA,
    payload: id,
  };
};
