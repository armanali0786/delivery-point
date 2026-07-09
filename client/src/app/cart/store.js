import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../cart/cartSlice";
import wishSlice from "./wishlistSlice";
export const store = configureStore({
  reducer: {
    allCart: cartReducer,
    wishlists: wishSlice
  },
});
