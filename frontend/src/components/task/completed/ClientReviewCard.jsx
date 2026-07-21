import {
    Quote,
    Star,
} from "lucide-react";

export default function ClientReviewCard({
    review,
}) {

    return (

        <section className="rounded-3xl border border-slate-200 bg-white shadow-lg">

            <div className="border-b border-slate-200 px-7 py-6">

                <h2 className="text-2xl font-bold text-slate-900">

                    Your Review

                </h2>

                <p className="mt-1 text-sm text-slate-500">

                    Feedback submitted after task completion.

                </p>

            </div>

            <div className="space-y-6 p-7">

                <div className="flex gap-2">

                    {
                        [...Array(5)].map((_, index) => (

                            <Star
                                key={index}
                                size={24}
                                className={
                                    index < review.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-slate-300"
                                }
                            />

                        ))
                    }

                </div>

                <div className="rounded-2xl bg-slate-50 p-6">

                    <Quote
                        size={24}
                        className="mb-4 text-emerald-500"
                    />

                    <p className="leading-7 text-slate-700">

                        {review.comment || "No written review was provided."}

                    </p>

                </div>

                <div className="flex items-center justify-between border-t border-slate-200 pt-5">

                    <div>

                        <p className="text-xs uppercase tracking-wide text-slate-500">

                            Submitted On

                        </p>

                        <p className="mt-1 font-medium text-slate-900">

                            {review.createdAt || "--"}

                        </p>

                    </div>

                    <div className="rounded-full bg-emerald-100 px-4 py-2">

                        <span className="font-semibold text-emerald-700">

                            {review.rating}/5

                        </span>

                    </div>

                </div>

            </div>

        </section>

    );

}