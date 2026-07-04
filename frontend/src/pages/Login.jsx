import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserRole } from "../features/authRole/authRoleSlice";
import RoleSelector from "../components/RoleSelector";
import LoginForm from "../components/auth/LoginForm";

function Login() {
  const Dispatch = useDispatch();
  const role = useSelector((state) => state.authRole.authRole);
  const handleRoleSelection = (role) => {
    Dispatch(setUserRole(role));
  };

  return (
    <>
      <RoleSelector
        onSelect={handleRoleSelection}
        loginLink="/login"
        display={`${role ? "hidden" : ""}`}
      />

      {role && <LoginForm role={role} />}
    </>
  );
}

export default Login;