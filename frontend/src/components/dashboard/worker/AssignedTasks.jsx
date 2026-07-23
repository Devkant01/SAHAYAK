import {
    ArrowRight,
    CalendarDays,
    MapPin,
    UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";


export default function AssignedTasks({
    Loading,
    Tasks,
}) {

    if (Loading) {
        return (
            <section className="space-y-6">

                <div className="flex items-center justify-between">

                    <div>

                        <div className="h-7 w-52 animate-pulse rounded bg-gray-200" />

                        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-gray-100" />

                    </div>

                    <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-200" />

                </div>

                <div className="grid gap-6 lg:grid-cols-2">

                    {[1, 2].map(Item => (
                        <div
                            key={Item}
                            className="h-60 animate-pulse rounded-2xl bg-white shadow-sm"
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

                        Assigned Tasks

                    </h2>

                    <p className="mt-1 text-gray-500">

                        Tasks currently assigned to you.

                    </p>

                </div>

                <Link
                    to="/worker/my-tasks"
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
                                <TaskCard
                                    key={Task._id}
                                    Task={Task}
                                />
                            ))
                        }

                    </div>

                ) : (

                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-20 text-center">

                        <h3 className="text-xl font-semibold text-gray-800">

                            No Assigned Tasks

                        </h3>

                        <p className="mt-2 text-gray-500">

                            New tasks assigned by clients will appear here.

                        </p>

                    </div>

                )
            }

        </section>
    );
}


function TaskCard({
    Task,
}) {

    return (
        <div className="group rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between gap-4">

                <div>

                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-600">

                        {Task.category}

                    </span>

                    <h3 className="mt-4 text-xl font-semibold text-gray-900">

                        {Task.title}

                    </h3>

                </div>

                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">

                    {Task.status}

                </span>

            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-600">

                <div className="flex items-center gap-2">

                    <UserRound className="h-4 w-4 text-teal-600" />

                    {Task.clientName}

                </div>

                <div className="flex items-center gap-2">

                    <MapPin className="h-4 w-4 text-teal-600" />

                    {Task.address}

                </div>

                <div className="flex items-center gap-2">

                    <CalendarDays className="h-4 w-4 text-teal-600" />

                    {Task.scheduledAt}

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