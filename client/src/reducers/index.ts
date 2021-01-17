import { combineReducers } from "redux";
import todoReducers from "./todoReducers";
// import authReducer from "./authReducer";

export default combineReducers({
  todo: todoReducers,
  //   auth: authReducer,
});
