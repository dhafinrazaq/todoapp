import { combineReducers } from "redux";
import todoReducers from "./todoReducers";
import authReducer from "./authReducers";

export default combineReducers({
  todo: todoReducers,
  auth: authReducer,
});
