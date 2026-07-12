import {
    BriefcaseBusiness,
    CircleCheckBig,
    Clock3,
    FileText
} from "lucide-react";

export default function StatsSection({
    Loading,
    Stats
}) {

    const Cards = [
        {
            Title: "Total Tasks",
            Value: Stats?.TotalTasks || 0,
            Icon: FileText
        },
        {
            Title: "Completed Tasks",
            Value: Stats?.CompletedTasks || 0,
            Icon: CircleCheckBig
        },
        {
            Title: "Active Tasks",
            Value: Stats?.ActiveTasks || 0,
            Icon: BriefcaseBusiness
        },
        {
            Title: "Pending Applications",
            Value: Stats?.PendingApplications || 0,
            Icon: Clock3
        }
    ];

    if (Loading) {
        return (
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, Index) => (
                    <div
                        key={Index}
                        className="h-32 rounded-2xl bg-gray-100 animate-pulse"
                    />
                ))}
            </section>
        );
    }

    return (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {Cards.map((Card) => (
                <div
                    key={Card.Title}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                >

                    <div className="flex items-center justify-between">

                        <div>
                            <p className="text-sm text-gray-500">
                                {Card.Title}
                            </p>

                            <h3 className="mt-2 text-3xl font-bold text-gray-900">
                                {Card.Value}
                            </h3>
                        </div>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                            <Card.Icon size={24} />
                        </div>

                    </div>

                </div>
            ))}

        </section>
    );
}