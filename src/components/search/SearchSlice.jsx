import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosConfig } from "./../../axiosconfig/AxiosConfig";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async (query) => {
      try {
        const { data } = await AxiosConfig({ url: "/items", method: "get" });
        
        if (!query) return data; // Return all data if no query
  
        const queryLower = query.toLowerCase();
  
        // Filter and score products based on the query
        const scoredProducts = data.map(product => {
          let score = 0;
          if (product.product_name.toLowerCase().includes(queryLower)) {
            score += 2; // Higher score for name match
          }
          if (product.product_description && product.product_description.toLowerCase().includes(queryLower)) {
            score += 1; // Lower score for description match
          }
          return { ...product, score };
        });
  
        // Filter out products with no match and sort by score
        const filteredData = scoredProducts
          .filter(product => product.score > 0)
          .sort((a, b) => b.score - a.score);
  
        return filteredData.map(({ score, ...product }) => product); // Return products without the score field
      } catch (error) {
        // Handle or throw the error as appropriate
        throw error;
      }
    }
  );
  
  

const productsSlice = createSlice({
    name: 'products',
    initialState: {
      products: [],
      loading: false,
      error: null,
    },
    reducers: {
      // Define your other reducers here if needed
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchProducts.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
          state.loading = false;
          state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });

export default productsSlice.reducer;
