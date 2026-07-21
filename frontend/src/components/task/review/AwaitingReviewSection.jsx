import ReviewSummaryCard from "./ReviewSummaryCard";
import ReviewForm from "./ReviewForm";

export default function AwaitingReviewSection({
    task,
}) {

    return (

        <section className="space-y-8">

            <ReviewSummaryCard
                task={task}
            />

            <ReviewForm
                task={task}
            />

        </section>

    );

}