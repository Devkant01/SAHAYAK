import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { getTaskDetails } from "../services/getTaskDetails";

import TaskHeroCard from "../components/task/TaskHeroCard";
import TaskProgressTracker from "../components/task/TaskProgressTracker";
import TaskStatsGrid from "../components/task/TaskStatsGrid";
import TaskStatusContent from "../components/task/TaskStatusContent";

export default function TaskDetailsPage() {
  const { taskId } = useParams();

  const { accessToken } = useSelector((state) => state.user);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  async function FetchTask() {
    try {
      const Data = await getTaskDetails(
        taskId,
        accessToken
      );

      setTask(Data);
    }
    catch (err) {
      console.log(err);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    FetchTask();
  }, [taskId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!task) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Task not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">

      <TaskHeroCard task={task} />

      <TaskProgressTracker
        status={task.status}
      />

      <TaskStatsGrid
        task={task}
      />

      <TaskStatusContent
        task={task}
      />

    </div>
  );
}