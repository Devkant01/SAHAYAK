import { useParams } from "react-router-dom";

import { useClientTaskDetails } from "../../hooks/useTaskDetails";

import TaskHeroCard from "./TaskHeroCard";
import TaskProgressTracker from "./TaskProgressTracker";
import TaskStatusContent from "./TaskStatusContent";

import LoadingSkeleton from "./shared/LoadingSkeleton";
import ErrorState from "./shared/ErrorState";
import EmptyState from "./shared/EmptyState";

export default function ClientTaskDetails() {
    const { taskId } = useParams();
    const {
        task,
        loading,
        error,
        refetch,
    } = useClientTaskDetails(taskId);
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 py-8">
                    <LoadingSkeleton />
                </div>
            </div>
        );
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
        <main className="min-h-screen bg-slate-50">
            <div className="mx-auto max-w-7xl space-y-10 px-4 py-8">

                <TaskHeroCard task={task} />

                <TaskProgressTracker
                    status={task.task.status}
                />

                <TaskStatusContent
                    task={task}
                    refetch={refetch}
                />

            </div>
        </main>
    );
}