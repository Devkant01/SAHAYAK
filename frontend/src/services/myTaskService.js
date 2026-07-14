import axios from "axios";
import { RefreshToken } from "../utils/RefreshToken";

export async function GetMyTasks(AccessToken, Retried = false) {
    try {
        const res = await axios.get(
            "/client/my-tasks",
            {
                withCredentials: true,
                headers: {
                    Authorization:
                        `Bearer ${AccessToken}`
                }
            }
        );
        console.log("GetMyTasks response:", res);
        return res;
    } catch (err) {
        if (err.response?.status === 401 && !Retried) {
            const newAccessToken = await RefreshToken(err);
            return GetMyTasks(newAccessToken, true);
        } else
            throw err;
    }
}