import { configureStore } from "@reduxjs/toolkit";
import appslice from "./appslice";
import searchslice from "./searchslice";
import livecommentslice from "./livecommentslice";
import querysuggestionslice from "./querysuggestionslice";


const store=configureStore({
    reducer:{
        app:appslice,
        search:searchslice,
        livecomment:livecommentslice,
        query:querysuggestionslice,

    },
});

export default store;
