import { createStore, applyMiddleware } from "redux";
import { logger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [logger, sagaMiddleware];

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

export default store;
