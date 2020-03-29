import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../_reducers";

const loggerMiddleware = createLogger();

export const iStore = createStore(
  rootReducer,
  compose(applyMiddleware(thunkMiddleware, loggerMiddleware))
);
