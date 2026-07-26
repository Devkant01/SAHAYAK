import {
    ArrowRight,
    CalendarCheck,
    Star,
    UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";


export default function CompletedTasks({
    Loading,
    RecentReviews,
}) {
    console.log("RecentReviews", RecentReviews);

    if (Loading) {
        return (
            <section className="space-y-6">

                <div className="flex items-center justify-between">

                    <div>

                        <div className="h-7 w-56 animate-pulse rounded bg-gray-200" />

                        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-100" />

                    </div>

                    <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-200" />

                </div>

                <div className="grid gap-6 lg:grid-cols-2">

                    {[1, 2].map(Item => (
                        <div
                            key={Item}
                            className="h-48 animate-pulse rounded-2xl bg-white shadow-sm"
                        />
                    ))}

                </div>

            </section>
        );
    }

    return (
        <section className="space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-gray-900">

                        Recent Client Reviews

                    </h2>

                    <p className="mt-1 text-gray-500">

                        See what your recent clients had to say about your work.

                    </p>

                </div>

                <Link
                    to="/my-tasks?status=completed"
                    className="inline-flex items-center gap-2 rounded-xl border border-teal-200 px-4 py-2 text-sm font-medium text-teal-600 transition hover:bg-teal-50"
                >

                    View All

                    <ArrowRight className="h-4 w-4" />

                </Link>

            </div>

            {
                RecentReviews?.length ? (

                    <div className="grid gap-6 lg:grid-cols-2">

                        {
                            RecentReviews.map(review => (
                                <ReviewCard
                                    key={review._id}
                                    Review={review}
                                />
                            ))
                        }

                    </div>

                ) : (

                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">

                        <h3 className="text-xl font-semibold text-gray-800">

                            No Reviews Yet

                        </h3>

                        <p className="mt-2 text-gray-500">

                            You haven't completed any tasks yet. Once you complete a task, you'll be able to see the reviews from your clients here.

                        </p>

                    </div>

                )
            }

        </section>
    );
}



function ReviewCard({
    Review,
}) {
    console.log("Review", Review);
    return (
        <div className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

                <div className="flex items-center gap-4">

                    <img
                        src={Review.clientId?.image}
                        alt={Review.clientId?.name}
                        className="h-14 w-14 rounded-full object-cover border"
                    />

                    <div>

                        <h3 className="font-semibold text-gray-900">
                            {Review.clientId?.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {Review.taskId?.title}
                        </p>

                    </div>

                </div>

                <div className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1">

                    <Star
                        className="h-4 w-4 fill-yellow-500 text-yellow-500"
                    />

                    <span className="font-semibold">
                        {Review.rating}.0
                    </span>

                </div>

            </div>

            <div className="mt-6 rounded-xl border-l-4 border-teal-500 bg-gray-50 p-4">

                <p className="italic text-gray-700 leading-7">

                    "{Review.review}"

                </p>

            </div>

            <div className="mt-6 flex items-center justify-between">

                <div className="text-sm text-gray-500">

                    Reviewed on{" "}
                    <span className="ml-1 font-medium text-gray-700">
                        {new Date(Review.createdAt).toLocaleDateString("en-Gn", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </span>

                </div>

                <Link
                    to={`/task/${Review.taskId?._id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition group-hover:gap-3"
                >

                    View Task

                    <ArrowRight className="h-4 w-4" />

                </Link>

            </div>

        </div>
    );
}