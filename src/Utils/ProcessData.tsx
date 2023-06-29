/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */
import { Dispatch } from 'redux';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { API_RESPONSE_SNACK_MESSAGE, PROCESS_TYPE } from '../Shared/constants';
import { RouteDetails, ServiceDetails } from '../interfaces';

// to avoid null or undefined inputs in the text fields and send null values for non updated string values
export const processServiceData = (
  data: ServiceDetails,
  processType: string
): ServiceDetails => {
  const keyList = Object.keys(data);
  for (let i = 0; i < keyList.length; i += 1) {
    const key = keyList[i];
    if (
      (data[key as keyof ServiceDetails] === null ||
        data[key as keyof ServiceDetails] === undefined ||
        data[key as keyof ServiceDetails] === '') &&
      processType === PROCESS_TYPE.PRE_PROCESS
    ) {
      data = { ...data, [key]: '' };
    } else if (data[key as keyof ServiceDetails] === '')
      data = { ...data, [key]: null };
  }
  return data;
};

export const processRouteData = (
  data: RouteDetails,
  processType: string,
  dispatch: Dispatch
): RouteDetails => {
  if (processType === PROCESS_TYPE.PRE_PROCESS) {
    const keyList = Object.keys(data);
    for (let i = 0; i < keyList.length; i += 1) {
      const key = keyList[i];
      if (
        data[key as keyof typeof data] === null ||
        data[key as keyof typeof data] === undefined
      )
        data = { ...data, [key]: '' };
    }
    if (Object.keys(data.headers).length === 0) {
      data = { ...data, headers: [] };
    } else if (data.headers) {
      const headers = [];
      const keys = Object.keys(data.headers);
      for (let j = 0; j < keys.length; j += 1) {
        headers.push(keys[j].concat(`:${data.headers[keys[j]]}`));
      }
      data = { ...data, headers };
    }
  } else {
    if (
      data.protocols.length !== 0 &&
      data.sources.length === 0 &&
      data.destinations.length === 0
    ) {
      data = { ...data, sources: null, destinations: null };
    }
    if (data.headers.length === 0) data = { ...data, headers: {} };
    else {
      try {
        const header = data.headers;
        const res: any = {};
        for (let i = 0; i < header.length; i += 1) {
          const current = header[i].split(':');
          res[current[0]] = current[1].split(',');
        }
        data = { ...data, headers: res };
      } catch (error) {
        dispatch({
          type: ACTION_TYPES.TOAST_NOTIFICATION,
          payload: {
            message: API_RESPONSE_SNACK_MESSAGE.incorrectHeader,
            severity: 'error',
          },
        });
      }
    }
  }
  return data;
};
