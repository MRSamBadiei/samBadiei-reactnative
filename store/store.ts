import { configureStore } from "@reduxjs/toolkit";
import products from "./products";
import category from "./categories";

const store = configureStore({
  reducer: {
    products: products,
    category: category,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
