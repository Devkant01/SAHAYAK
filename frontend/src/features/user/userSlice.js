import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    credentials: null,
    accessToken: null,
    userRole: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.credentials = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.userRole = action.payload.user.role;
            state.isAuthenticated = true;
        },

        setUserRole: (state, action) => {
            state.userRole = action.user.role;
        },

        clearUserRole: (state) => {
            state.userRole = null;
        },

        logout: (state) => {
            state.credentials = null;
            state.accessToken = null;
            state.userRole = null;
            state.isAuthenticated = false;
        },
    },
});

export const {
    setCredentials,
    setUserRole,
    clearUserRole,
    logout,
} = userSlice.actions;

export default userSlice.reducer;