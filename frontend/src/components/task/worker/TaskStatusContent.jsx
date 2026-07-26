import InProgressSection from "./inprogress/InProgressSection";
import AwaitingReviewSection from "./review/AwaitingReviewSection";
import CompletedSection from "./completed/CompletedSection";

export default function TaskStatusContent({
    Task,
    Client,
    Review,
    Timeline,
    refetch,
}) {

    switch (Task?.status) {

        case "in-progress":
            return (
                <InProgressSection
                    Task={Task}
                    Client={Client}
                    refetch={refetch}
                />
            );

        case "awaiting_review":
            return (
                <AwaitingReviewSection
                    Task={Task}
                    Client={Client}
                    Timeline={Timeline}
                />
            );

        case "completed":
            return (
                <CompletedSection
                    Task={Task}
                    Client={Client}
                    Review={Review}
                    Timeline={Timeline}
                />
            );

        default:
            return null;
    }

}