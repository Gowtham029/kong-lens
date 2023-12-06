/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from 'react-router-dom';
import { ACTION_TYPES } from '../Shared/actionTypes';

export const getCurrentConsumerData = (id: string) => {
  return {
    type: ACTION_TYPES.GET_CURRENT_CONSUMER_DATA,
    payload: id,
  };
};

export const getConsumerData = () => {
  return {
    type: ACTION_TYPES.GET_CONSUMER_DATA,
  };
};

export const deleteConsumerData = (id: string, index: number) => {
  return {
    type: ACTION_TYPES.DELETE_CURRENT_CONSUMER_DATA,
    payload: { id, index },
  };
};

export const patchCurrentConsumerData = (data: any, id: string) => {
  return {
    type: ACTION_TYPES.PATCH_CURRENT_CONSUMER_DATA,
    payload: { data, id },
  };
};

export const postCurrentConsumerData = (data: any, func: NavigateFunction) => {
  return {
    type: ACTION_TYPES.POST_CURRENT_CONSUMER_DATA,
    payload: data,
    navigate: func,
  };
};

export const getAccessibleRoutesAction = (id: any) => {
  return {
    type: ACTION_TYPES.GET_CONSUMER_ACCESS_ROUTES,
    payload: id,
  };
};
