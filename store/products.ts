import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Products } from "../types";

const init: {
  products: Products[];
  filter: Products[];
} = {
  products: [],
  filter: [],
};

const products = createSlice({
  name: "products",
  initialState: init,
  reducers: {
    getProducts: (state, action: PayloadAction<Products[]>) => {
      state.products.push(...action.payload);
      state.filter.push(...action.payload);
    },
    filterProducts: (state, action: PayloadAction<{ category: string }>) => {
      if (action.payload.category !== "All") {
        state.filter = state.products.filter((item) => {
          return (
            item.category.toLowerCase() ===
            action.payload.category.toLowerCase()
          );
        });
      } else {
        state.filter = state.products;
      }
    },
    addProductNew: (state, action: PayloadAction<Products>) => {
      state.products.push(action.payload);
      state.filter.push(action.payload);
    },
  },
});

export const { getProducts, filterProducts, addProductNew } = products.actions;
export default products.reducer;
