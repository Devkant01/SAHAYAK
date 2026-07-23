import { useParams } from "react-router-dom";

import useTaskDetails from "../hooks/useTaskDetails";

import TaskHeroCard from "../components/task/TaskHeroCard";
import TaskProgressTracker from "../components/task/TaskProgressTracker";
import TaskStatusContent from "../components/task/TaskStatusContent";

import LoadingSkeleton from "../components/task/shared/LoadingSkeleton";
import ErrorState from "../components/task/shared/ErrorState";
import EmptyState from "../components/task/shared/EmptyState";

export default function TaskDetails() {
  const { taskId } = useParams();

  const {
    task,
    loading,
    error,
    refetch,
  } = useTaskDetails(taskId);

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