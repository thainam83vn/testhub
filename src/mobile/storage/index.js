import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import reducer from "../reducers";
var action, store;
export default () => {
  console.log("require storage....");
  if (!action && !store) {
    console.log("create storage....");
    const sagaMiddleware = createSagaMiddleware();
    store = createStore(reducer, applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);

    action = (type, payload) => store.dispatch({ type, payload });
  }
  return { action, store };
};
