import { configureStore } from "@reduxjs/toolkit";
import docslice from "./docsslice.JS";

const store = configureStore({
    reducer:{
doc:docslice
    }
})

export default store