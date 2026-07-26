import ClientReviewCard from "./ClientReviewCard";
import CompletionSummary from "./CompletionSummary";

export default function CompletedSection({
    Task,
    Client,
    Review,
    Timeline,
}) {

    return (
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            <div className="xl:col-span-2">

                <ClientReviewCard
                    Client={Client}
                    Review={Review}
                />

            </div>

            <CompletionSummary
                Task={Task}
                Client={Client}
                Timeline={Timeline}
            />

        </section>
    );
}