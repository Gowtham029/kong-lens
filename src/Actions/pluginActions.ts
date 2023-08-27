/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from 'react-router-dom';
import { ACTION_TYPES } from '../Shared/actionTypes';

export const getCurrentPluginData = (id: string) => {
  return {
    type: ACTION_TYPES.GET_CURRENT_PLUGIN_DATA,
    payload: id,
  };
};

export const getPluginData = () => {
  return {
    type: ACTION_TYPES.GET_PLUGIN_DATA,
  };
};

export const deletePluginData = (id: string, index: number) => {
  return {
    type: ACTION_TYPES.DELETE_CURRENT_PLUGIN_DATA,
    payload: { id, index },
  };
};

export const patchCurrentPluginData = (data: any, id: string) => {
  return {
    type: ACTION_TYPES.PATCH_CURRENT_PLUGIN_DATA,
    payload: { data, id },
  };
};

export const postCurrentPluginData = (data: any, func: NavigateFunction) => {
  return {
    type: ACTION_TYPES.POST_CURRENT_PLUGIN_DATA,
    payload: data,
    navigate: func,
  };
};
