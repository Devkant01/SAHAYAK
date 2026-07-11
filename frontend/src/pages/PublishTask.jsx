import useTaskForm from "../hooks/useTaskForm";

import TaskForm from "../components/publish-task/TaskForm";
import TaskPreview from "../components/publish-task/TaskPreview";
import ProgressBar from "../components/publish-task/ProgressBar";

export default function PublishTask() {

  const {
    TaskData,
    UpdateField,
    Loading,
    HandleSubmit
  } = useTaskForm();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">



      <div className="grid lg:grid-cols-[1.7fr_1fr] gap-8">
        <div className="">
          <div className="mb-10">
            <h1 className="text-5xl font-bold">
              Publish a New Task
            </h1>

            <p className="mt-3 text-gray-500 w-4/5">
              Describe your requirements accurately to attract the best service professionals in your area. Professional details ensure better matches.
            </p>
          </div>

          <ProgressBar
            TaskData={TaskData}
          />
          
          <TaskForm
            TaskData={TaskData}
            UpdateField={UpdateField}
          />
        </div>

        <TaskPreview
          TaskData={TaskData}
          Loading={Loading}
          HandleSubmit={HandleSubmit}
        />

      </div>

    </section>
  );
}