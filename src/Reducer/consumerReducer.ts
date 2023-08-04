/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers } from 'redux';
import { ACTION_TYPES } from '../Shared/actionTypes';
import { CONSUMER_DETAILS_INTERFACE } from '../Shared/constants';

const consumerData = (
  state = [],
  action: { type: string; payload: any; index: number }
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_CONSUMER_DATA:
      return state;
    case ACTION_TYPES.SET_CONSUMER_DATA:
      return action.payload;
    case ACTION_TYPES.ADD_CONSUMER_DATA:
      return [...state, action.payload];
    case ACTION_TYPES.CONFIRM_CONSUMER_DELETE:
      state.splice(action.index, 1);
      return [...state];
    default:
      return state;
  }
};

const currentConsumerData = (
  state = CONSUMER_DETAILS_INTERFACE,
  action: { type: string; payload: any; index: number }
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_CURRENT_CONSUMER_DATA:
      return state;
    case ACTION_TYPES.SET_CURRENT_CONSUMER_DATA:
      return action.payload;
    default:
      return state;
  }
};

const consumerReducer = combineReducers({
  consumerData,
  currentConsumerData,
});
export default consumerReducer;
