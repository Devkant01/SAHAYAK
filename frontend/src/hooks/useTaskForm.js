import { useState } from "react";
import { PublishTask } from "../services/taskService";
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
                console.log("Error in useTaskForm~HandleSubmit", err);
            } finally {

                setLoading(false);

            }
        };

    return {
        TaskData,
        Loading,
        UpdateField,
        HandleSubmit
    };
}