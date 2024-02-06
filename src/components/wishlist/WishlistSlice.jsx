import { createSlice } from "@reduxjs/toolkit";

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      const productToAdd = action.payload;
      const isAlreadyInWishlist = state.some(
        (item) => item.id === productToAdd.id
      );

      if (!isAlreadyInWishlist) {
        state.push(productToAdd);
      } else {
        console.log("added before");
      }
    },
    removeFromWishlist: (state, action) => {
      const productIdToRemove = action.payload;
      const updatedWishlist = state.filter(
        (item) => item.id !== productIdToRemove
      );
      return updatedWishlist;
    },
    checkforprodcuct: (state, action) => {
      const productIdToRemove1 = action.payload;
      const updatedWishlist1 = state.filter(
        (item) => item.id === productIdToRemove1
      );
      return "1";
    },
    removeAllFromWishlist: (state) => {
      return [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  removeAllFromWishlis,
  checkforprodcuct,
  removeAllFromWishlist,
} = WishlistSlice.actions;

export default WishlistSlice.reducer;
