import { combineReducers } from "@reduxjs/toolkit";
import todoReducer from "../features/todoSlice";

const rootReducer = combineReducers({
  todos: todoReducer,
});

export default rootReducer;
