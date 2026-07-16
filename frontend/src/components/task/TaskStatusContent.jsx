import PendingSection from "./pending/PendingSection";
import InProgressSection from "./inprogress/InProgressSection";
import AwaitingReviewSection from "./review/AwaitingReviewSection";
import CompletedSection from "./completed/CompletedSection";

export default function TaskStatusContent({ task }) {

    switch (task.status) {

        case "pending":
            return (
                <PendingSection
                    task={task}
                />
            );

        case "in-progress":
            return (
                <InProgressSection
                    task={task}
                />
            );

        case "awaiting-review":
            return (
                <AwaitingReviewSection
                    task={task}
                />
            );

        case "completed":
            return (
                <CompletedSection
                    task={task}
                />
            );

        default:
            return null;
    }
}