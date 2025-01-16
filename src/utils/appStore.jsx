import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./TaskSlice"

const appStore = configureStore({
    reducer:{
        task : taskReducer , 
    },
})

export default appStore;