import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../Reducer';
import combinedSaga from '../Sagas';

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: rootReducer,
  middleware: [saga],
});
saga.run(combinedSaga);

export default store;
