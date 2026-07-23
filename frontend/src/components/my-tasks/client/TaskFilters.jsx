
export default function TaskFilters({
    Stats,
    Filter,
    SetFilter
}) {
    const Filters = [
        {
            Label: "All",
            Value: "all",
            Count: Stats?.total || 0
        },
        {
            Label: "Pending",
            Value: "pending",
            Count: Stats?.pending || 0
        },
        {
            Label: "In Progress",
            Value: "in-progress",
            Count: Stats?.active || 0
        },
        {
            Label: "Awaiting Review",
            Value: "awaiting_review",
            Count: Stats?.awaiting_review || 0
        },
        {
            Label: "Completed",
            Value: "completed",
            Count: Stats?.completed || 0
        }
    ];

    return (
        <section className="overflow-x-auto">

            <div className="flex gap-3 min-w-max">

                {Filters.map((Item) => (

                    <button
                        key={Item.Value}
                        onClick={() =>
                            SetFilter(Item.Value)
                        }
                        className={`px-5 py-2 rounded-full font-medium transition
                        
                        ${Filter === Item.Value
                                ? "bg-teal-600 text-white"
                                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                            }
                        
                        `}
                    >
                        {Item.Label}
                        {" "}
                        (
                        {Item.Count}
                        )
                    </button>

                ))}

            </div>

        </section>
    );
}