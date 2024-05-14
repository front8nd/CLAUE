import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "./ProductsSlice";
import CartSlice from "./CartSlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
  reducer: {
    Products: ProductsSlice,
    Cart: CartSlice,
    User: UserSlice,
  },
});
