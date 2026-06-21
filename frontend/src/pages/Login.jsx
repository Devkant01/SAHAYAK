import { useNavigate } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";

function Login() {
  const Navigate = useNavigate();
  const role = null;
  const HandleRoleSelection = (role) => {
    role = role;
  };

  return (
    <RoleSelector
      onSelect={HandleRoleSelection}
      loginLink="/login"
    />
  );
}

export default Login;