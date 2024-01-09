import { createSlice } from "@reduxjs/toolkit";

const querysuggestionslice = createSlice({
  name: "suggestion",
  initialState: {
    isSuggestionOpen: true,
  },
  reducers: {
    toggleSuggestions: (state) => {
      state.isSuggestionOpen = !state.isSuggestionOpen;
    },
    closeSuggestions:(state)=>{
      state.isSuggestionOpen=false;
    },
    openSuggestions:(state)=>{
state.isSuggestionOpen=true;
    },
  },
});

export const { toggleSuggestions,closeSuggestions,openSuggestions } = querysuggestionslice.actions;
export default querysuggestionslice.reducer;
