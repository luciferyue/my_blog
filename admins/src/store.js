import { applyMiddleware, combineReducers, createStore } from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import * as reducers from "./reducers";
import rootSaga from "./sagas";

export const history = createBrowserHistory({
	basename: APP_ENV === "local" ? "/" : "/",
});

export const rootReducer = combineReducers({
	router: connectRouter(history),
	...reducers,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];
const middleWareEnhancer = applyMiddleware(...middleware);
export const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));
sagaMiddleware.run(rootSaga);

