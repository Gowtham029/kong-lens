/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Service } from '../Mocks/Service.mock';

const stateInterface: Service = {
  created_at: 0,
  updated_at: 0,
  name: '',
  retries: 0,
  protocol: '',
  host: '',
  port: 0,
  path: '',
  connect_timeout: 0,
  write_timeout: 0,
  read_timeout: 0,
};

const serviceReducer = createSlice({
  name: 'service',
  initialState: () => stateInterface,
  reducers: {
    updateValue(state, action: PayloadAction<Service>) {
      state.id = action.payload.id;
      state.created_at = action.payload.created_at;
      state.updated_at = action.payload.updated_at;
      state.name = action.payload.name;
      state.retries = action.payload.retries;
      state.protocol = action.payload.protocol;
      state.host = action.payload.host;
      state.port = action.payload.port;
      state.path = action.payload.path;
      state.connect_timeout = action.payload.connect_timeout;
      state.write_timeout = action.payload.write_timeout;
      state.read_timeout = action.payload.read_timeout;
    },
  },
});

export const { updateValue } = serviceReducer.actions;

export default serviceReducer.reducer;
