import { applyMiddleware, combineReducers, createStore } from "redux";
import { postsReducer } from "./reducers/postsSlice";
import { usersReducer } from "./reducers/usersSlice";
import thunkMiddleware from "redux-thunk";

const rootReducer = combineReducers({
  posts: postsReducer,
  users: usersReducer,
});

const enhancers = applyMiddleware(thunkMiddleware);

const store = createStore(rootReducer, enhancers);

export default store;
