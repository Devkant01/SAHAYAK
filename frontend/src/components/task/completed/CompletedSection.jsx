import CompletionSummary from "./CompletionSummary";
import CompletedWorkerCard from "./CompletedWorkerCard";
import ClientReviewCard from "./ClientReviewCard";

export default function CompletedSection({
    task,
}) {

    return (

        <section className="space-y-8">

            <CompletionSummary
                task={task}
            />

            <div className="grid gap-8 xl:grid-cols-[1fr_420px]">

                <CompletedWorkerCard
                    task={task}
                />

                <ClientReviewCard
                    review={task.review}
                />

            </div>

        </section>

    );

}