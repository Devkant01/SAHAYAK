import axios from "axios";
import { RefreshToken } from "../utils/RefreshToken";


export async function getTaskDetails(taskId, AccessToken, retried = false) {
    try {
        console.log("getTaskDetails request:", taskId, AccessToken);
        const { data } = await axios.get(
            `client/my-task/${ taskId }`,
            {
                withCredentials: true,
                headers: {
                    Authorization:
                        `Bearer ${AccessToken}`
                }
            }
        );
        console.log("getTaskDetails response:", data);
        return data;
    } catch (err) {
        if (err.response?.status === 401 && !Retried) {
            const newAccessToken = await RefreshToken(err);
            return getTaskDetails(taskId, newAccessToken, true);
        } else
            throw err;
    }
}