import { useNavigate } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";

function Signup() {
    const Navigate = useNavigate();

    const HandleRoleSelection = (role) => {
        Navigate(`/signup/${role}`);
    };

    return (
        <RoleSelector
            onSelect={HandleRoleSelection}
            loginLink="/login"
        />
    );
}

export default Signup;