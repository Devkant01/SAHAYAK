import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RefreshToken } from "../utils/RefreshToken";
import { getTaskDetails } from "../services/getTaskDetails";

export default function useTaskDetails(taskId) {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const AccessToken = useSelector(State => State.user.accessToken);
    const fetchTask = async () => {
        try {
            setLoading(true);
            setError("");

            const data = await getTaskDetails(taskId, AccessToken);

            setTask(data.data);
        } catch (err) {
            setError(
                err?.response?.data?.message ||
                "Unable to load task details."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, []);

    return {
        task,
        loading,
        error,
        refetch: fetchTask,
    };
}