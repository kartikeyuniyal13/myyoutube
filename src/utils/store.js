import { configureStore } from "@reduxjs/toolkit";
import appslice from "./appslice";
import searchslice from "./searchslice";
import livecommentslice from "./livecommentslice";


const store=configureStore({
    reducer:{
        app:appslice,
        search:searchslice,
        livecomment:livecommentslice,

    },
});

export default store;
