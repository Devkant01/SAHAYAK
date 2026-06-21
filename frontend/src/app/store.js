import { configureStore } from "@reduxjs/toolkit";
import CountReducer from "../features/count/countSlice";

export const Store = configureStore({
    reducer: {
        count: CountReducer
    }
});