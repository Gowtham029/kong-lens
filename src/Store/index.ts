import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from '../Reducer';
import combinedSaga from '../Sagas';

const saga = createSagaMiddleware();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const middlewares: any = [saga];
if (process.env.NODE_ENV === `development`) {
  const logger = createLogger();
  middlewares.push(logger);
}
const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
});
saga.run(combinedSaga);

export default store;
