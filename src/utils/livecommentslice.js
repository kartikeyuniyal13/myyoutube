import { createSlice } from "@reduxjs/toolkit";

const MAX_MESSAGES = 30;

const livecommentslice = createSlice({
  name: "livecomment",
  initialState: {
    message: [],
  },
  reducers: {
    addMessage: (state, action) => {
      
      state.message.unshift(action.payload);

      state.message = state.message.slice(0, MAX_MESSAGES);
    },
  },
});

export const { addMessage } = livecommentslice.actions;
export default livecommentslice.reducer;
