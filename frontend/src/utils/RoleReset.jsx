import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { clearUserRole } from "../features/authRole/authRoleSlice";

function RoleReset() {
    const Location = useLocation();
    const Dispatch = useDispatch();

    useEffect(() => {
        const AuthRoutes = [
            "/login",
            "/signup"
        ];

        if (
            !AuthRoutes.includes(
                Location.pathname
            )
        ) {
            Dispatch(clearUserRole());
        }
    }, [Location.pathname, Dispatch]);

    return null;
}

export default RoleReset;