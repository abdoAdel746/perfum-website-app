// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    clearCart: (state) => {
      // Reset the state to initial state or empty state
      return [];
    },
    addItem: (state, action) => {
      const productToAdd = action.payload;
      const existingProduct = state.find((item) => item.id === productToAdd.id);
      let price_const = productToAdd.price ;
      if (existingProduct) {
        // If the product already exists in the cart, increment its quantity
        // console.log(productToAdd);
        if (productToAdd.discount > 0) {
          productToAdd.price -=
            (productToAdd.discount * price_const) / 100;
          console.log(productToAdd.price);
        }
        existingProduct.stoke++;
      } else {
        // console.log(productToAdd);
        if (productToAdd.discount > 0) {
          productToAdd.price -=
            (productToAdd.discount * price_const) / 100;
          console.log(productToAdd.price);
        }
        // Otherwise, add it as a new item in the cart
        state.push({ ...productToAdd, stoke: 1 });
      }
    },
    removeItem: (state, action) => {
      // Remove the item from the cart by ID
      return state.filter((item) => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      // Increment the stoke of an item in the cart by ID
      console.log("item");
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.stoke++;
      }
    },
    decrementQuantity: (state, action) => {
      // Decrement the quantity of an item in the cart by ID
      const item = state.find((item) => item.id === action.payload);
      if (item && item.stoke > 1) {
        item.stoke--;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;
