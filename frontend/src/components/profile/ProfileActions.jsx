import Button from "../Button";
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ProfileActions() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [Loading, setLoading] = useState(false);

    async function handleLogout() {
        setLoading(true);

        try {
            await axios.post("/auth/logout", {}, {
                withCredentials: true,
            });

            dispatch(logout());
            setTimeout(() => {
                navigate("/", { replace: true });
            }, 0);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="mt-6 flex flex-wrap gap-3">

            <Button>
                Edit Profile
            </Button>

            <Button onClick={handleLogout} disabled={Loading}>
                {Loading ? "Logging out..." : "Logout"}
            </Button>

            <Button className="bg-red-600 hover:bg-red-700">
                Delete Profile
            </Button>
        </div>
    );
}

export default ProfileActions;