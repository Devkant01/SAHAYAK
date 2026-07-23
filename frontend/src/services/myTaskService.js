import axios from "axios";
import { RefreshToken } from "../utils/RefreshToken";

export async function GetClientMyTasks(AccessToken, Retried = false) {
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
            return GetClientMyTasks(newAccessToken, true);
        } else
            throw err;
    }
}
export async function GetWorkerMyTasks(AccessToken, Retried = false) {
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
            return GetWorkerMyTasks(newAccessToken, true);
        } else
            throw err;
    }
}