/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigateFunction } from 'react-router-dom';
import { ACTION_TYPES } from '../Shared/actionTypes';

export const getCurrentUpstreamData = (id: string) => {
  return {
    type: ACTION_TYPES.GET_CURRENT_UPSTREAMS_DATA,
    payload: id,
  };
};

export const getUpstreamsData = () => {
  return {
    type: ACTION_TYPES.GET_UPSTREAMS_DATA,
  };
};

export const postCurrentUpstreamData = (data: any, func: NavigateFunction) => {
  return {
    type: ACTION_TYPES.POST_CURRENT_UPSTREAM_DATA,
    payload: data,
    navigate: func,
  };
};

export const deleteUpstreamData = (id: string, index: number) => {
  return {
    type: ACTION_TYPES.DELETE_UPSTREAM_DATA,
    payload: { id, index },
  };
};
