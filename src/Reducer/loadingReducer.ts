/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ACTION_TYPES } from '../Shared/actionTypes';

const loadingData = (state = false, action: { type: string }) => {
  switch (action.type) {
    case ACTION_TYPES.SET_LOADER_TRUE:
      return true;
    case ACTION_TYPES.SET_LOADER_FALSE:
      return false;
    default:
      return state;
  }
};

export default loadingData;
