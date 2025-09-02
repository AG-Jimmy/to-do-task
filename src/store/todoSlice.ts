import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoState {
  keyword: string;
  open: boolean;
  title: string;
  description: string;
  status: string;
}

const initialState: TodoState = {
  keyword: "",
  open: false,
  title: "",
  description: "",
  status: "",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setKeyword(state, action: PayloadAction<string>) {
      state.keyword = action.payload;
    },
    setOpen(state, action: PayloadAction<boolean>) {
      state.open = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    resetForm(state) {
      state.title = "";
      state.description = "";
      state.status = "";
    },
  },
});

export const {
  setKeyword,
  setOpen,
  setTitle,
  setDescription,
  setStatus,
  resetForm,
} = todoSlice.actions;

export const selectTodo = (state: { todo: TodoState }) => state.todo;

export default todoSlice.reducer;
