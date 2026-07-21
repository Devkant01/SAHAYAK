import AssignedWorkerCard from "./AssignedWorkerCard";
import ProgressBar from "./ProgressBar";
import ProgressUpdates from "./ProgressUpdates";
import TaskTimeline from "./TaskTimeline";

export default function InProgressSection({ task }) {
    return (
        <section className="space-y-8">
            <div className="grid gap-8 xl:grid-cols-[1.35fr_0.9fr]">
                <AssignedWorkerCard task={task} />
                <ProgressBar task={task} />
            </div>

            <div className="grid gap-8 xl:grid-cols-[1.45fr_0.9fr]">
                <ProgressUpdates updates={task.updates} />
                <TaskTimeline timeline={task.timeline} />
            </div>
        </section>
    );
}