
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let find = state.cart.findIndex((item) => item._id === action.payload._id);
      if (find >= 0) {
        state.cart[find].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },

    getCartTotal: (state) => {
      let { totalQuantity, totalPrice } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;
          cartTotal.totalPrice += itemTotal;
          cartTotal.totalQuantity += quantity;
          return cartTotal;
        },
        {
          totalPrice: 0,
          totalQuantity: 0,
        }
      );
      state.totalPrice = parseInt(totalPrice.toFixed(2));
      state.totalQuantity = totalQuantity;
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    },
    // decreaseItemQuantity: (state, action) => {
    //   state.cart = state.cart.map((item) => {
    //     if (item._id === action.payload) {
    //       if(item.quantity <= 0){
           
    //         state.cart = state.cart.filter((item) => item._id !== action.payload);
    //       }
    //       return { ...item, quantity: item.quantity - 1 };
    //     }
    //     return item;
    //   });
    // },
    decreaseItemQuantity: (state, action) => {
      // Use map to create a new array of cart items
      const updatedCart = state.cart.map((item) => {
        // Find the item in the cart that matches the action payload (item _id)
        if (item._id === action.payload) {
          // Decrease the quantity by 1
          const updatedItem = { ...item, quantity: item.quantity - 1 };
    
          // Check if the updated quantity is zero or less
          if (updatedItem.quantity <= 0) {
            // If quantity is zero or negative, filter it out from the cart
            return null; // Return null to remove this item from the cart
          }
    
          // Return the updated item with decreased quantity
          return updatedItem;
        }
        // If the item doesn't match the action payload, return it unchanged
        return item;
      });
      // Filter out any null values (items with quantity <= 0) from the updated cart
      state.cart = updatedCart.filter((item) => item !== null);
    },
    setItems: (state, action) => {
      state.items = action.payload;
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