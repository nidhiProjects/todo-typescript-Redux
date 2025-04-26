import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TODO } from "../types/Todo";
// import { v4 as uuidv4 } from "uuid";
import { RootState } from "../app/store";

const initialState: TODO[] = [];

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TODO>) => {
      // const todo = {
      //   id: uuidv4(),
      //   item: action.payload.item,
      //   description: action.payload.description,
      //   isCompleted: false,
      // };
      state.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<TODO>) => {
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
      );
    },
    deleteTodo: (state, action: PayloadAction<{ id: string }>) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    toggleComplete: (state, action: PayloadAction<{ id: string }>) => {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      );
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleComplete } =
  todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos;
export default todoSlice.reducer;
