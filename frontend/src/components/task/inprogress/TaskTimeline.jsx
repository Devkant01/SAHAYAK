import {
    BadgeCheck,
    ClipboardList,
    Hammer,
    SearchCheck,
} from "lucide-react";

export default function TaskTimeline({
    timeline = [],
}) {

    return (

        <section className="rounded-3xl border border-slate-200 bg-white shadow-lg">

            <div className="border-b border-slate-200 px-7 py-6">

                <h2 className="text-2xl font-bold text-slate-900">
                    Task Journey
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                    Overall task progress from creation to completion.
                </p>

            </div>

            <div className="p-7">

                {
                    timeline.length === 0 ? (

                        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-slate-300">

                            <p className="text-slate-500">
                                Timeline unavailable.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-7">

                            {
                                timeline.map((item, index) => (

                                    <TimelineItem
                                        key={index}
                                        item={item}
                                        isLast={index === timeline.length - 1}
                                    />

                                ))
                            }

                        </div>

                    )
                }

            </div>

        </section>

    );

}

function TimelineItem({
    item,
    isLast,
}) {

    const Completed = item.completed;

    return (

        <div className="relative flex gap-5">

            {
                !isLast && (

                    <div
                        className={`absolute left-5 top-12 w-0.5 h-[calc(100%+1.75rem)]
                        ${Completed
                                ? "bg-teal-500"
                                : "bg-slate-200"
                            }`}
                    />

                )
            }

            <div
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full
                ${Completed
                        ? "bg-teal-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
            >

                <TimelineIcon
                    type={item.type}
                />

            </div>

            <div className="flex-1">

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                    <div className="flex items-center justify-between gap-4">

                        <h3 className="font-semibold text-slate-900">

                            {item.title}

                        </h3>

                        <span className="text-xs text-slate-400">

                            {item.time || "--"}

                        </span>

                    </div>

                    {
                        item.description && (

                            <p className="mt-2 text-sm leading-6 text-slate-600">

                                {item.description}

                            </p>

                        )
                    }

                </div>

            </div>

        </div>

    );

}

function TimelineIcon({
    type,
}) {

    switch (type) {

        case "created":
            return <ClipboardList size={18} />;

        case "assigned":
            return <SearchCheck size={18} />;

        case "working":
            return <Hammer size={18} />;

        case "completed":
            return <BadgeCheck size={18} />;

        default:
            return <ClipboardList size={18} />;

    }

}