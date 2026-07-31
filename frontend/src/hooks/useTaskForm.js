import { useState } from "react";
import { PublishTask, GetDescription } from "../services/taskService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function useTaskForm() {

    const [Loading, setLoading] =
        useState(false);

    const [TaskData, setTaskData] =
        useState({
            title: "",
            description: "",
            category: "",
            attachments: []
        });

    const AccessToken = useSelector(
        state => state.user.accessToken
    );
    const Navigate = useNavigate();

    const UpdateField = (
        Field,
        Value
    ) => {
        setTaskData(prev => ({
            ...prev,
            [Field]: Value
        }));
    };

    const HandleSubmit =
        async () => {
            try {
                setLoading(true);

                await PublishTask(
                    TaskData,
                    AccessToken
                );

                setTaskData({
                    title: "",
                    description: "",
                    category: "",
                    attachments: []
                });
                Navigate("/dashboard");
            } catch (err) {
                console.log("Error in hooks/useTaskForm~HandleSubmit", err);
            }finally {
                setLoading(false);
            }
        };

    const HandleAISubmit =
        async () => {
            console.log("HandleAISubmit called");
            try {
                const res = await GetDescription(
                    TaskData,
                    AccessToken
                );

                setTaskData({
                    ...TaskData,
                    category: res.category ? res.category : TaskData.category,
                    description: res.description,
                });
                // Navigate("/dashboard");
            } catch (err) {
                console.log("Error in hooks/useTaskForm~HandleAISubmit", err);
            }
        };
    
    return {
        TaskData,
        Loading,
        UpdateField,
        HandleSubmit,
        HandleAISubmit
    };
}