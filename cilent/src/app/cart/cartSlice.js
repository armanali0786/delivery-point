import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
  items: [],
  vendor: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const findIndex = state.cart.findIndex((item) => item._id === action.payload._id);
      if (findIndex >= 0) {
        state.cart[findIndex].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    getCartTotal: (state) => {
      let totalQuantity = 0;
      let totalPrice = 0;

      state.cart.forEach((cartItem) => {
        if (cartItem && cartItem.price && cartItem.quantity) {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          totalPrice += itemTotal;
          totalQuantity += quantity;
        }
      });

      state.totalPrice = parseFloat(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    removeItem: (state, action) => {
      const updatedCart = state.cart.filter((item) => item._id !== action.payload);
      state.cart = updatedCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    decreaseItemQuantity: (state, action) => {
      const updatedCart = state.cart.map((item) => {
        if (item._id === action.payload) {
          const updatedItem = { ...item, quantity: item.quantity - 1 };
          if (updatedItem.quantity <= 0) {
            return null;
          }
          return updatedItem;
        }
        return item;
      }).filter((item) => item !== null);

      state.cart = updatedCart;
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    },

    setItems: (state, action) => {
      state.items = action.payload;
      state.vendorName = action.vendorName;
      state.vendorAddress = action.vendorAddress;
      state.vendorCoverImages = action.coverImages;
      state.vendorId = action.vendorId;
    },
  },
});

export const {
  addToCart,
  getCartTotal,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  setItems,
} = cartSlice.actions;

export default cartSlice.reducer;
