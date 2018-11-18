import {
    createStore, applyMiddleware, combineReducers,
} from "redux";
import logger from 'redux-logger';

import userApp from '../app/user/reducers';

const store = createStore(userApp, applyMiddleware(logger));

// Every time the state changes, log it
// Note that subscribe() returns a function for unregistering the listener
const unsubscribe = store.subscribe(() => console.debug(store.getState()))

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