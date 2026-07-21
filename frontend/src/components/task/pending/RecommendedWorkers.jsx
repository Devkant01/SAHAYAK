import { useMemo, useState } from "react";
import { MapPin, Star } from "lucide-react";

import WorkersGrid from "./WorkersGrid";
import EmptyState from "../shared/EmptyState";

export default function RecommendedWorkers({
    workers = [],
    taskId,
    refetch,
}) {

    const [sortBy, setSortBy] = useState("rating");

    const FilteredWorkers = useMemo(() => {

        const Data = [...workers];

        if (sortBy === "distance") {
            return Data.sort((a, b) => a.distance - b.distance);
        }

        return Data.sort((a, b) => b.rating - a.rating);

    }, [workers, sortBy]);

    return (

        <section className="space-y-6">

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h3 className="text-xl font-bold text-slate-900">
                            Recommended Workers
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Choose the best professional for your task.
                        </p>

                    </div>

                    <div className="flex flex-wrap gap-3">

                        <FilterButton
                            active={sortBy === "rating"}
                            icon={<Star size={18} />}
                            title="Highest Rated"
                            onClick={() => setSortBy("rating")}
                        />

                        <FilterButton
                            active={sortBy === "distance"}
                            icon={<MapPin size={18} />}
                            title="Nearest"
                            onClick={() => setSortBy("distance")}
                        />

                    </div>

                </div>

            </div>

            {
                FilteredWorkers.length === 0 ? (

                    <EmptyState
                        title="No Workers Found"
                        description="No workers are available for this task."
                    />

                ) : (

                    <WorkersGrid
                        workers={FilteredWorkers}
                        taskId={taskId}
                        refetch={refetch}
                    />

                )
            }

        </section>

    );

}

function FilterButton({
    active,
    icon,
    title,
    onClick,
}) {

    return (

        <button
            onClick={onClick}
            className={`
                flex items-center gap-2 rounded-full border px-5 py-2.5
                text-sm font-semibold transition-all duration-300

                ${active
                    ? "border-teal-600 bg-teal-600 text-white shadow-md"
                    : "border-slate-300 bg-white text-slate-600 hover:border-teal-600 hover:text-teal-600"
                }
            `}
        >

            {icon}

            {title}

        </button>

    );

}