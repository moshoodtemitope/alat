import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from "../redux/reducers";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "../redux-flow-all/sagas/sagas";

const loggerMiddleware = createLogger();

export const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);
