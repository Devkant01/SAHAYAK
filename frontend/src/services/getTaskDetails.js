import axios from "axios";
import { RefreshToken } from "../utils/RefreshToken";

export async function getTaskDetails(taskId, AccessToken, Retried = false) {
    try {
        const Response = await axios.get(
            `/client/my-task/${taskId}`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            }
        );
        return Response.data.data;
    } catch (err) {
        if (err.response?.status === 401 && !Retried) {
            const newAccessToken = await RefreshToken(err);
            return getTaskDetails(taskId, newAccessToken, true);
        } else
            throw err;
    }

}