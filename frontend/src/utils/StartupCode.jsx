import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setCredentials, setAuthLoading } from "../features/user/userSlice";

function StartupCode() {
    const Dispatch = useDispatch();

    useEffect(() => {
        async function RefreshSession() {
            try {
                const Response =
                    await axios.post(
                        "/auth/refresh-token",
                        {},
                        {
                            withCredentials: true,
                        }
                    );

                Dispatch(
                    setCredentials(
                        Response.data
                    )
                );
            } catch (err) {
                console.log(
                    "No active session"
                );
            }finally {
                Dispatch(setAuthLoading(false));
            }
        }

        RefreshSession();
    }, []);

    return null;
}

export default StartupCode;