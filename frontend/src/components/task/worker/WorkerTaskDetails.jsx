import { Navigate, useParams } from "react-router-dom";
import { useWorkerTaskDetails } from "../../../hooks/useTaskDetails";

import TaskHeroCard from "./TaskHeroCard";
import TaskProgressTracker from "./TaskProgressTracker";
import TaskStatusContent from "./TaskStatusContent";

import LoadingSkeleton from "../shared/LoadingSkeleton";
import ErrorState from "../shared/ErrorState";
import EmptyState from "../shared/EmptyState";

export default function WorkerTaskDetails() {

    const { taskId } = useParams();
    
    
    // const {
        //     Loading,
        //     Task,
        //     Refresh,
        // } = useWorkerTaskDetails();
        const {
            task,
            loading,
            error,
            refetch,
        } = useWorkerTaskDetails(taskId);
    if (!taskId) {
        return <Navigate to="/worker/my-tasks" replace />;
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-8">
                    <LoadingSkeleton />
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <ErrorState
                    message={error}
                    onRetry={refetch}
                />
            </div>
        );
    }

    if (!task) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <EmptyState
                    title="Task not found"
                    description="The requested task doesn't exist or may have been removed."
                />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50">

            <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">

                <TaskHeroCard
                    Task={task.task}
                    Client={task.client}
                />

                <TaskProgressTracker
                    Status={task.task.status}
                />

                <TaskStatusContent
                    Task={task.task}
                    Client={task.client}
                    Review={task.review}
                    Timeline={task.timeline}
                    refetch={refetch}
                />

            </div>

        </main>
    );
}