import { createStore, applyMiddleware, combineReducers, StoreCreator, Store } from 'redux';
import { logger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducer';
import rootSaga from './saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store: Store<any, any> = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));

// then run the saga
sagaMiddleware.run(rootSaga);

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe: any = store.subscribe(() => console.debug(store.getState()));

// Stop listening to state updates
//unsubscribe();

export default store;

// Log only in development
// const middlewares = [];

// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`);

//   middlewares.push(logger);
// }

// const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);
