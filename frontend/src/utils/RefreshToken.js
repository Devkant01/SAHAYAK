import axios from "axios";
import { Store } from "../app/store";

import {
    setCredentials,
    logout
} from "../features/user/userSlice";

export async function RefreshToken(err) {
    if (err.response?.status !== 401) {
        throw err;
    }

    try {
        const Response = await axios.post(
            "/auth/refresh-token",
            {},
            {
                withCredentials: true
            }
        );

        Store.dispatch(
            setCredentials(Response.data)
        );

        return Response.data.accessToken;
    } catch (RefreshError) {
        Store.dispatch(logout());

        throw RefreshError;
    }
}