import {
    Clock3,
    Hammer,
    ListTodo,
    FileText,
    BadgeCheck,
    CircleCheckBig,
    BriefcaseBusiness,
} from "lucide-react";

export default function TaskStats({
    Loading,
    Stats
}) {

    const Cards = [
        {
            Title: "Total",
            Value: Stats?.total || 0,
            Icon: FileText
        },
        {
            Title: "Pending",
            Value: Stats?.pending || 0,
            Icon: Clock3
        },
        {
            Title: "In Progress",
            Value: Stats?.active || 0,
            Icon: Hammer
        },
        {
            Title: "Awaiting Review",
            Value: Stats?.awaiting_review || 0,
            Icon: BadgeCheck
        },
        {
            Title: "Completed",
            Value: Stats?.completed || 0,
            Icon: CircleCheckBig
        }
    ];

    if (Loading) {
        return (
            <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">

                {Array.from({
                    length: 5
                }).map((_, Index) => (
                    <div
                        key={Index}
                        className="h-28 rounded-2xl bg-gray-100 animate-pulse"
                    />
                ))}

            </section>
        );
    }

    return (
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">

            {Cards.map((Card) => (

                <div
                    key={Card.Title}
                    className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm"
                >

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-sm text-gray-500">
                                {Card.Title}
                            </p>

                            <h3 className="mt-2 text-3xl font-bold">
                                {Card.Value}
                            </h3>

                        </div>

                        <Card.Icon
                            size={24}
                            className="text-teal-600"
                        />

                    </div>

                </div>

            ))}

        </section>
    );
}