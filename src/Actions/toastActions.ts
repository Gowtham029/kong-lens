/* eslint-disable @typescript-eslint/no-explicit-any */
import { ACTION_TYPES } from '../Shared/actionTypes';

export const toastDisable = (): any => {
  return {
    type: ACTION_TYPES.TOAST_DISABLE,
  };
};
