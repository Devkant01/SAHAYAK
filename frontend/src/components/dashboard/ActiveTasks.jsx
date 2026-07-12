import { Link } from "react-router-dom";
import {
    ArrowRight,
    MapPin,
    Users
} from "lucide-react";

function GetStatusStyles(Status) {

    switch (Status?.toLowerCase()) {

        case "assigned":
            return "bg-blue-100 text-blue-700";

        case "in-progress":
            return "bg-purple-100 text-purple-700";

        case "completed":
            return "bg-green-100 text-green-700";

        default:
            return "bg-yellow-100 text-yellow-700";
    }
}

export default function ActiveTasks({
    Loading,
    Tasks
}) {

    if (Loading) {
        return (
            <section>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <div className="h-6 w-40 bg-gray-100 rounded animate-pulse" />
                        <div className="h-4 w-64 bg-gray-100 rounded mt-2 animate-pulse" />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, Index) => (
                        <div
                            key={Index}
                            className="h-52 rounded-2xl bg-gray-100 animate-pulse"
                        />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section>

            <div className="flex items-center justify-between mb-6">

                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Active Tasks
                    </h2>

                    <p className="text-gray-500 mt-1">
                        Manage and track your ongoing tasks
                    </p>
                </div>

                <Link
                    to="/my-tasks"
                    className="hidden md:flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700"
                >
                    View All
                    <ArrowRight size={18} />
                </Link>

            </div>

            {!Tasks?.length ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

                    <h3 className="text-lg font-semibold text-gray-900">
                        No Active Tasks
                    </h3>

                    <p className="mt-2 text-gray-500">
                        Start by posting your first task.
                    </p>

                    <Link
                        to="/publish-task"
                        className="inline-flex mt-6 rounded-lg bg-teal-600 px-5 py-3 text-white font-medium hover:bg-teal-700 transition"
                    >
                        Post Task
                    </Link>

                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                    {Tasks.map((Task) => (

                        <Link
                            key={Task._id}
                            to={`/tasks/${Task._id}`}
                            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                        >

                            <div className="flex items-start justify-between">

                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition">
                                    {Task.title}
                                </h3>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium ${GetStatusStyles(Task.status)}`}
                                >
                                    {Task.status}
                                </span>

                            </div>

                            <div className="mt-4 flex items-center gap-2 text-gray-500 text-sm">
                                <MapPin size={16} />
                                {Task.location || "Location Not Available"}
                            </div>

                            <div className="mt-4 flex items-center justify-between">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Budget
                                    </p>

                                    <p className="text-xl font-bold text-gray-900">
                                        ₹{Task.budget}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm text-gray-500">
                                        Applications
                                    </p>

                                    <div className="flex items-center justify-end gap-2 mt-1">
                                        <Users size={16} />
                                        <span className="font-semibold">
                                            {Task.applications?.length || 0}
                                        </span>
                                    </div>
                                </div>

                            </div>

                            <div className="mt-5 flex items-center justify-between border-t pt-4">

                                <span className="text-sm text-gray-500">
                                    View Details
                                </span>

                                <ArrowRight
                                    size={18}
                                    className="text-teal-600 group-hover:translate-x-1 transition"
                                />

                            </div>

                        </Link>

                    ))}

                </div>
            )}

        </section>
    );
}