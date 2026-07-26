import { useState } from "react";
import {
    CircleCheckBig,
    ClipboardCheck,
    Hammer,
} from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RefreshToken } from "../../../../utils/RefreshToken";

export default function ActionCard({
    Task,
    refetch,
}) {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const accessToken = useSelector((state) => state.user.accessToken);
    const [loading, setLoading] = useState(false);
    async function HandleComplete(retried = false) {
        try {
            setLoading(true);
            await axios.put(`/worker/mark-task-completed/${taskId}`, {}, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });
            await refetch();
        } catch (error) {
            if (error.response && error.response.status === 401 && !retried) {
                const newAccessToken = await RefreshToken(error);
                if (newAccessToken) {
                    await HandleComplete(true);
                }
            }else {
                console.error("Error marking task as completed:", error);
            }

        } finally {
            // Any cleanup or final actions can be performed here
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b border-gray-100">

                <h2 className="text-lg font-semibold text-gray-900">
                    Task Status
                </h2>

            </div>

            <div className="p-6">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">

                        <Hammer
                            size={22}
                            className="text-teal-600"
                        />

                    </div>

                    <div>

                        <h3 className="font-semibold text-gray-900">
                            In Progress
                        </h3>

                        <p className="text-sm text-gray-500">
                            You're currently working on this task.
                        </p>

                    </div>

                </div>

                <div className="mt-8 rounded-2xl bg-teal-50 border border-teal-100 p-5">

                    <div className="flex items-start gap-3">

                        <ClipboardCheck
                            size={20}
                            className="text-teal-600 mt-1"
                        />

                        <div>

                            <h4 className="font-semibold text-gray-900">
                                Ready to Finish?
                            </h4>

                            <p className="mt-2 text-sm text-gray-600 leading-6">
                                Once you mark this task as completed,
                                the client will be notified to review
                                your work. You won't be able to modify
                                the task afterwards.
                            </p>

                        </div>

                    </div>

                </div>

                <button
                    disabled={loading}
                    onClick={HandleComplete}
                    className={`mt-8 w-full h-12 rounded-xl bg-teal-600 hover:bg-teal-700 transition text-white font-semibold flex items-center justify-center gap-2 ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-teal-600 hover:bg-teal-700"}`}
                >

                    <CircleCheckBig size={20} />

                    Mark as Completed

                </button>

            </div>

        </div>
    );
}