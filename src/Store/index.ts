import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from '../Reducer';
import combinedSaga from '../Sagas';

const saga = createSagaMiddleware();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middlewares: any = [saga];
if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}
const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});
saga.run(combinedSaga);

export default store;
