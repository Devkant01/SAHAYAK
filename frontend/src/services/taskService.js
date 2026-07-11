import axios from "axios";
import { RefreshToken } from "../utils/RefreshToken";

export async function PublishTask(TaskData, AccessToken, Retried = false) {
    const Data = new FormData();

    Data.append(
        "title",
        TaskData.title
    );

    Data.append(
        "description",
        TaskData.description
    );

    Data.append(
        "category",
        TaskData.category
    );

    TaskData.attachments.forEach(file => {
        Data.append(
            "attachments",
            file
        );
    });
    try {
        const Response = await axios.post(
            "/client/publish-task",
            Data,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${AccessToken}`
                }
            }
        );
        return Response.data;
    } catch (err) {
        if (err.response?.status === 401 && !Retried) {
            const newAccessToken = await RefreshToken(err);
            return PublishTask(TaskData, newAccessToken, true);
        } else
            throw err;
    }

}