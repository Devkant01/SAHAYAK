import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
    count: 0
};

const CountSlice = createSlice({
    name: "count",
    initialState: InitialState,
    reducers: {
        Increase: (state) => {
            state.count += 1;
        },
        Decrease: (state) => {
            state.count -= 1;
        }
    }
});

export const { Increase, Decrease } = CountSlice.actions;
export default CountSlice.reducer;