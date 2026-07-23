import {
    ArrowRight,
    CalendarCheck,
    Star,
    UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";


export default function CompletedTasks({
    Loading,
    Tasks,
}) {

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

                        Recently Completed

                    </h2>

                    <p className="mt-1 text-gray-500">

                        Your recently completed tasks.

                    </p>

                </div>

                <Link
                    to="/worker/my-tasks?status=completed"
                    className="inline-flex items-center gap-2 rounded-xl border border-teal-200 px-4 py-2 text-sm font-medium text-teal-600 transition hover:bg-teal-50"
                >

                    View All

                    <ArrowRight className="h-4 w-4" />

                </Link>

            </div>

            {
                Tasks?.length ? (

                    <div className="grid gap-6 lg:grid-cols-2">

                        {
                            Tasks.map(Task => (
                                <CompletedTaskCard
                                    key={Task._id}
                                    Task={Task}
                                />
                            ))
                        }

                    </div>

                ) : (

                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">

                        <h3 className="text-xl font-semibold text-gray-800">

                            No Completed Tasks

                        </h3>

                        <p className="mt-2 text-gray-500">

                            Complete your first task to see it here.

                        </p>

                    </div>

                )
            }

        </section>
    );
}



function CompletedTaskCard({
    Task,
}) {

    return (
        <div className="group rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

                <div>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">

                        Completed

                    </span>

                    <h3 className="mt-4 text-xl font-semibold text-gray-900">

                        {Task.title}

                    </h3>

                </div>

                {
                    Task.rating && (
                        <div className="flex items-center gap-1 rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-600">

                            <Star className="h-4 w-4 fill-current" />

                            {Task.rating}

                        </div>
                    )
                }

            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-600">

                <div className="flex items-center gap-2">

                    <UserRound className="h-4 w-4 text-teal-600" />

                    {Task.clientName}

                </div>

                <div className="flex items-center gap-2">

                    <CalendarCheck className="h-4 w-4 text-teal-600" />

                    {Task.completedAt}

                </div>

            </div>

            <Link
                to={`/worker/my-tasks/${Task._id}`}
                className="mt-8 inline-flex items-center gap-2 font-medium text-teal-600 transition group-hover:gap-3"
            >

                View Details

                <ArrowRight className="h-4 w-4" />

            </Link>

        </div>
    );
}