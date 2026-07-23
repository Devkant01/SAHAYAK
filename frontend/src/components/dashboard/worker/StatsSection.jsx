import {
    ClipboardList,
    Hammer,
    Clock3,
    CircleCheckBig,
} from "lucide-react";


export default function StatsSection({
    Loading,
    Stats,
}) {

    const Cards = [
        {
            Title: "Assigned Tasks",
            Value: Stats?.assignedTasks,
            Icon: ClipboardList,
            Color: "bg-blue-100 text-blue-600",
        },
        {
            Title: "In Progress",
            Value: Stats?.inProgressTasks,
            Icon: Hammer,
            Color: "bg-amber-100 text-amber-600",
        },
        {
            Title: "Awaiting Review",
            Value: Stats?.awaitingReviewTasks,
            Icon: Clock3,
            Color: "bg-purple-100 text-purple-600",
        },
        {
            Title: "Completed",
            Value: Stats?.completedTasks,
            Icon: CircleCheckBig,
            Color: "bg-emerald-100 text-emerald-600",
        },
    ];

    return (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            {Cards.map(Card => (
                <StatCard
                    key={Card.Title}
                    Loading={Loading}
                    {...Card}
                />
            ))}

        </section>
    );
}

function StatCard({
    Loading,
    Title,
    Value,
    Icon: Icon,
    Color,
}) {

    if (Loading) {
        return (
            <div className="h-36 animate-pulse rounded-2xl bg-white shadow-sm" />
        );
    }

    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-gray-500">

                        {Title}

                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-gray-900">

                        {Value ?? 0}

                    </h2>

                </div>

                <div className={`rounded-xl p-3 ${Color}`}>

                    <Icon className="h-6 w-6" />

                </div>

            </div>

        </div>
    );
}