import { configureStore } from "@reduxjs/toolkit";
import CountReducer from "../features/count/countSlice";
import AuthRoleReducer from "../features/authRole/authRoleSlice";
import UserReducer from "../features/user/userSlice";

export const Store = configureStore({
    reducer: {
        count: CountReducer,
        authRole: AuthRoleReducer,
        user: UserReducer
    }
});