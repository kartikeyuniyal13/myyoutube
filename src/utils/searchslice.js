import { createSlice } from "@reduxjs/toolkit";

const searchslice=createSlice({

    name:"search",
    initialState:{

    },
    reducers:{
        cachedResults:(state,action)=>{
            state=Object.assign(state,action.payload);
        }

    }
})
export const  {cachedResults}=searchslice.actions;
export default searchslice.reducer;