import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from "./CartSlice";
import SearchSlice from "../search/SearchSlice";
import wishlistReducer from "../wishlist/WishlistSlice";
import paidReducer from "./Paidpoductsslice"
import Recentreducer from './recentview/Recentview'
// Function to create a store with dynamic persist configuration
const createStore = (user_id) => {
  const persistConfig = {
    key: user_id ? `user_${user_id}` : 'root',
    version: 1,
    storage,
  };

  const rootReducer = combineReducers({
    cart: cartReducer,
    products: SearchSlice,
    wishlist: wishlistReducer,
    paid: paidReducer,
    recentView: Recentreducer, // Use a unique key, for example, recentView
  });

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// Initialize the store with the user ID from localStorage
const user_id = localStorage.getItem("user id");
export const reinitializeStore = (new_user_id) => {
  const newStore = createStore(new_user_id);
  
  // You can add additional logic to handle the transition between stores
  return newStore;
};

export const store = createStore(user_id);

// Reinitialize the store with a new user ID

