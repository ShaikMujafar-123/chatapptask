// slice.jsx
import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "CHAT",
  initialState: [], 
  reducers: {
    addChat: (state, action) => {
      state.push(action.payload); 
    },
  },
});

export const { addChat } = chatSlice.actions;

export default chatSlice.reducer;
