import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../types";

const init: Category[] = [
  {
    _id: "0",
    __v: 0,
    updatedAt: "",
    createdAt: "",
    name: "All",
  },
];

const category = createSlice({
  name: "category",
  initialState: init,
  reducers: {
    getCategory: (state, action: PayloadAction<Category[]>) => {
      state.push(...action.payload);
    },
  },
});

export const { getCategory } = category.actions;
export default category.reducer;
