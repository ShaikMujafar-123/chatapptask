
import { configureStore } from "@reduxjs/toolkit";

// Import the productReducer from the Addproductslice slice
import chatReducer from '../redux/slice'

// Configure and create the Redux store
export const store = configureStore({
  reducer: {
    Chat: chatReducer, 
  },
});


export default store;