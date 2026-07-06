import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setUserRole } from "../features/authRole/authRoleSlice";
import RoleSelector from "../components/RoleSelector";
import LoginForm from "../components/auth/LoginForm";

function Login() {
  const [searchParams] = useSearchParams();
  // support URLs like /login?role=client — normalize and sync to store
  const roleParam = searchParams.get("role")?.toLowerCase();
  if (roleParam) {
    return (
        <LoginForm role={roleParam} />
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
        loginLink="/login"
        display={`${role ? "hidden" : ""}`}
      />

      {role && <LoginForm role={role} />}
    </>
  );
}

export default Login;