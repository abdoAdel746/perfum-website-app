import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recentItems: [],
};

const recentViewSlice = createSlice({
  name: "recentView",
  initialState,
  reducers: {
    addRecent: (state, action) => {
      const { singleItem } = action.payload;

      const existingProductIndex = state.recentItems.findIndex(
        (item) => item.singleItem.id === singleItem.id
      );

      if (existingProductIndex === -1) {
        // Product ID does not exist, add new product
        state.recentItems.push({
          singleItem,
        });
      } else {
        console.log("Product ID exists");
      }
    },
    clearRecentState: () => initialState,
  },
});

export const { clearRecentState, addRecent } = recentViewSlice.actions;

export default recentViewSlice.reducer;
