/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NavigateFunction } from 'react-router-dom';
import { ACTION_TYPES } from '../Shared/actionTypes';

export const getCurrentServiceData = (id: string) => {
  return {
    type: ACTION_TYPES.GET_CURRENT_SERVICE_DATA,
    payload: id,
  };
};

export const handleCurrentServiceData = (key: string, value: any) => {
  return {
    type: ACTION_TYPES.HANDLE_CURRENT_SERVICE_DATA,
    payload: { key, value },
  };
};

export const setCurrentServiceData = (data: any) => {
  return {
    type: ACTION_TYPES.SET_CURRENT_SERVICE_DATA,
    payload: data,
  };
};

export const getServiceData = () => {
  return {
    type: ACTION_TYPES.GET_SERVICE_DATA,
  };
};

export const getCurrentServiceRouteData = (id: string) => {
  return {
    type: ACTION_TYPES.GET_CURRENT_SERVICE_ROUTE_DATA,
    payload: id,
  };
};

export const patchCurrentServiceData = (data: any, id: string) => {
  return {
    type: ACTION_TYPES.PATCH_CURRENT_SERVICE_DATA,
    payload: { data, id },
  };
};

export const postCurrentServiceData = (data: any, func: NavigateFunction) => {
  return {
    type: ACTION_TYPES.POST_CURRENT_SERVICE_DATA,
    payload: data,
    navigate: func,
  };
};

export const deleteServiceData = (id: string, index: number) => {
  return {
    type: ACTION_TYPES.DELETE_SERVICE_DATA,
    payload: { id, index },
  };
};
