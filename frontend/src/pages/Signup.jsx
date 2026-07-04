import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole } from "../features/authRole/authRoleSlice";
import RoleSelector from "../components/RoleSelector";
import SignupForm from "../components/auth/SignupForm";

function Signup() {
    const Dispatch = useDispatch();
    const role = useSelector((state) => state.role.role);
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