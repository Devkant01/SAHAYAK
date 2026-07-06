import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setUserRole } from "../features/authRole/authRoleSlice";
import RoleSelector from "../components/RoleSelector";
import SignupForm from "../components/auth/SignupForm";

function Signup() {
    const [searchParams] = useSearchParams();
    const roleParam = searchParams.get("role")?.toLowerCase();
    if(roleParam) {
        return (
            <SignupForm role={roleParam} />
        );
    }
    const Dispatch = useDispatch();
    const role = useSelector((state) => state.authRole.authRole);
    const handleRoleSelection = (role) => {
        Dispatch(setUserRole(role));
    };

    return (
        <>
            <RoleSelector
                onSelect={handleRoleSelection}
                loginLink="/signup"
                display={`${role ? "hidden" : ""}`}
            />

            {role && <SignupForm role={role} />}
        </>
    );
}

export default Signup;