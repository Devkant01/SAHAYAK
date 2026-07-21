import {
    CalendarDays,
    Clock3,
    MapPin,
    UserRound,
    CircleDollarSign,
    Users,
    ArrowRight,
    Wrench,
    Zap,
    Hammer,
    Paintbrush,
    Sparkles,
    Trees,
    CircleHelp
} from "lucide-react";

export default function TaskHeroCard({ task }) {
    const iconMap = {
        plumber: Wrench,
        electrician: Zap,
        carpenter: Hammer,
        painter: Paintbrush,
        cleaner: Sparkles,
        gardener: Trees,
        other: CircleHelp
    };
    const Task = task.task;
    const CategoryIcon = iconMap[Task.category?.toLowerCase()] || iconMap.other;

    const TimelineItems = getTimeline(Task);

    return (
        <section className="overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-xl">

            <div className="grid gap-8 p-8 lg:grid-cols-[1fr_340px]">

                <div>

                    <div className="mb-4 flex flex-wrap items-center gap-3">

                        <span className="rounded-full bg-teal-100 px-4 py-2 uppercase text-sm font-semibold text-teal-700 flex justify-center items-center">
                            <CategoryIcon size={16} className="mr-1 inline-block" />
                            {Task.category}
                        </span>

                    </div>

                    <h1 className="mb-5 text-4xl font-bold tracking-tight text-slate-900">
                        {Task.title}
                    </h1>

                    <p className="leading-7 text-slate-500">
                        {Task.description}
                    </p>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

                        <InfoCard
                            icon={<MapPin size={20} />}
                            title="Location"
                            value={`${Task.location?.city}, ${Task.location?.state}`}
                        />

                        <InfoCard
                            icon={<Clock3 size={20} />}
                            title="Status"
                            value={formatStatus(Task.status)}
                        />

                        {
                            Task.workerName &&
                            <InfoCard
                                icon={<UserRound size={20} />}
                                title="Worker"
                                value={Task.workerName}
                            />
                        }

                    </div>

                </div>

                <aside className="rounded-2xl bg-slate-50 p-6">

                    <h3 className="mb-6 text-lg font-semibold">
                        Timeline
                    </h3>

                    <div className="space-y-6">

                        {
                            TimelineItems.map((item) => (

                                <div
                                    key={item.title}
                                    className="flex gap-4"
                                >

                                    <div className="mt-1 rounded-full bg-teal-100 p-2 text-teal-700">
                                        <item.icon size={18} />
                                    </div>

                                    <div>

                                        <p className="font-semibold text-slate-800">
                                            {item.title}
                                        </p>

                                        <p className="mt-1 text-sm text-slate-500">
                                            {item.value}
                                        </p>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                </aside>

            </div>

        </section>
    );
}

function InfoCard({
    icon,
    title,
    value,
}) {

    return (

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex gap-2 mb-3 text-teal-600">
                {icon}
            <span className="text-sm text-slate-500">
                {title}
            </span>
            </div>


            <p className="mt-1 font-semibold text-slate-800">
                {value}
            </p>

        </div>

    );

}

function getTimeline(Task) {

    switch (Task.status) {

        case "pending":

            return [

                {
                    title: "Posted",
                    value: formatDate(Task.createdAt),
                    icon: CalendarDays,
                },

                {
                    title: "Expected Start",
                    value: "ASAP",
                    icon: Clock3,
                },

            ];

        case "in-progress":

            return [

                {
                    title: "Posted",
                    value: formatDate(Task.createdAt),
                    icon: CalendarDays,
                },

                {
                    title: "Hiring Date",
                    value: formatDate(Task.hiredAt),
                    icon: Clock3,
                },

                {
                    title: "Assigned To",
                    value: Task.workerName,
                    icon: UserRound,
                },

            ];

        case "awaiting-review":

            return [

                {
                    title: "Posted",
                    value: formatDate(Task.createdAt),
                    icon: CalendarDays,
                },

                {
                    title: "Hiring Date",
                    value: formatDate(Task.hiredAt),
                    icon: Clock3,
                },

                {
                    title: "Completed By",
                    value: Task.workerName,
                    icon: UserRound,
                },

            ];

        case "completed":

            return [

                {
                    title: "Posted",
                    value: formatDate(Task.createdAt),
                    icon: CalendarDays,
                },

                {
                    title: "Started",
                    value: formatDate(Task.hiredAt),
                    icon: Clock3,
                },

                {
                    title: "Completed",
                    value: formatDate(Task.completedAt),
                    icon: CalendarDays,
                },

            ];

        default:

            return [];

    }

}

function formatStatus(status) {

    return status
        .split("-")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");

}

function formatDate(date) {

    if (!date) return "--";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });

}