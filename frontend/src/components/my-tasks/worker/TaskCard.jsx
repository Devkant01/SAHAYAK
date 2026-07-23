import { Link } from "react-router-dom";
import {
    MapPin,
    Users,
    CalendarDays,
    ArrowRight,
    Wrench,
    Zap,
    Hammer,
    Paintbrush,
    Sparkles,
    Trees,
    CircleHelp,
    Phone
} from "lucide-react";



import TaskStatusBadge from "./TaskStatusBadge";

export default function TaskCard({
    Task
}) {
    const iconMap = {
        plumber: Wrench,
        electrician: Zap,
        carpenter: Hammer,
        painter: Paintbrush,
        cleaner: Sparkles,
        gardener: Trees,
        other: CircleHelp
    };

    const CategoryIcon = iconMap[Task.category?.toLowerCase()] || iconMap.other;

    return (
        <div>
            <div className="grid grid-cols-2">
                <div className="">
                    <h3 className=" text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition">
                        {Task.title}
                        <TaskStatusBadge
                            Status={Task.status}
                        />
                    </h3>

                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {Task.description}
                    </p>

                </div>
                {/* future task */}
                {/* <div className="flex justify-end items-start">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users size={16} />
                        <span>
                            {Task.worker ? Task.worker.name : Task.availableWorkers}
                        </span>
                    </div>
                </div> */}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-8 text-sm text-gray-600">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CategoryIcon size={16} />
                        <span className="capitalize">
                            {Task.category}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} />
                        <span>
                            {Task.location || "N/A"}
                        </span>
                    </div>
                </div>

                <div className="flex justify-end gap-8 text-sm text-gray-600">
                    <div title={`Created at: ${Task.createdAt}`} className="flex items-center gap-2 text-sm text-gray-600">
                        <CalendarDays size={16} />
                        <span >
                            {new Date(
                                Task.createdAt
                            ).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            }
                            )}
                        </span>
                    </div>
                </div>

            </div>

            {Task.worker && (
                <div className="mt-4 border-t pt-4">

                    <p className="text-sm text-gray-500">
                        Assigned Worker
                    </p>

                    <p className="font-medium text-gray-900">
                        {Task.worker.name}
                    </p>

                </div>
            )}

            {Task.status === "awaiting_review" && (

                <div className="mt-4 rounded-xl bg-purple-50 border border-purple-200 px-4 py-3">

                    <p className="text-sm font-medium text-purple-700">
                        Review Required
                    </p>

                    <p className="text-xs text-purple-600 mt-1">
                        Worker has marked this task as completed.
                    </p>

                </div>

            )}

            <div className="mt-5 flex items-center justify-end">

                <ArrowRight
                    size={18}
                    className="text-blue-600 group-hover:translate-x-1 transition"
                />

            </div>

            <div className="mt-5 flex justify-between items-center">
                <Link
                    to={`/task/${Task._id}`}
                    className={`
                block group rounded-2xl border bg-white p-5 shadow-sm transition

                ${Task.status === "awaiting_review"
                            ? "border-purple-300 hover:border-purple-400"
                            : "border-gray-200 hover:border-blue-300"
                        }

                hover:shadow-md
            `}
                >
                    View Details {">"}
                </Link>

                {Task.status === "active" && (
                    <button className="mt-3 flex items-center justify-center gap-2 w-full bg-green-50 border border-green-200 rounded-lg py-2 text-green-700 hover:bg-green-100 transition">
                        <Phone size={16} />
                        Call Client
                    </button>
                )}
            </div>
        </div>

        // </Link >
    );
}