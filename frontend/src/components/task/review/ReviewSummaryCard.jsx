import {
    BadgeCheck,
    Calendar,
    CircleDollarSign,
    Clock3,
    Hammer,
    Star,
    User,
} from "lucide-react";

export default function ReviewSummaryCard({
    task,
}) {

    const Task = task.task;
    const Worker = task.worker;

    return (

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

            <div className="bg-gradient-to-r from-teal-600 to-emerald-600 p-8 text-white">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">

                            <BadgeCheck size={18} />

                            <span className="font-medium">
                                Work Completed
                            </span>

                        </div>

                        <h2 className="mt-5 text-3xl font-bold">

                            Please Review Your Experience

                        </h2>

                        <p className="mt-2 max-w-2xl text-teal-100">

                            Your worker has marked this task as completed.
                            Review the work before closing the task.

                        </p>

                    </div>

                    <div className="rounded-2xl bg-white/15 px-8 py-6 backdrop-blur">

                        <p className="text-sm text-teal-100">
                            Task Status
                        </p>

                        <h3 className="mt-2 text-2xl font-bold">
                            Awaiting Review
                        </h3>

                    </div>

                </div>

            </div>

            <div className="grid gap-6 p-8 lg:grid-cols-2">

                <InfoCard
                    icon={<Hammer size={20} />}
                    title="Task"
                    value={Task.title}
                />

                <InfoCard
                    icon={<User size={20} />}
                    title="Worker"
                    value={Worker.name}
                />

                <InfoCard
                    icon={<CircleDollarSign size={20} />}
                    title="Budget"
                    value={`₹${Task.budget}`}
                />

                <InfoCard
                    icon={<Calendar size={20} />}
                    title="Completed On"
                    value={Task.completedAt || "--"}
                />

                <InfoCard
                    icon={<Clock3 size={20} />}
                    title="Duration"
                    value={Task.duration || "--"}
                />

                <InfoCard
                    icon={<Star size={20} />}
                    title="Worker Rating"
                    value={`${Worker.rating} / 5`}
                />

            </div>

            <div className="border-t border-slate-200 bg-slate-50 px-8 py-6">

                <div className="flex items-start gap-4">

                    <img
                        src={Worker.image}
                        alt={Worker.name}
                        className="h-16 w-16 rounded-full object-cover"
                    />

                    <div>

                        <h3 className="text-lg font-semibold text-slate-900">

                            {Worker.name}

                        </h3>

                        <p className="mt-1 text-slate-600">

                            {Worker.specialization}

                        </p>

                        <div className="mt-3 flex flex-wrap gap-2">

                            {
                                Worker.skills?.map(skill => (

                                    <span
                                        key={skill}
                                        className="rounded-full bg-teal-100 px-3 py-1 text-sm font-medium text-teal-700"
                                    >

                                        {skill}

                                    </span>

                                ))
                            }

                        </div>

                    </div>

                </div>

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

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

            <div className="mb-4 inline-flex rounded-full bg-teal-100 p-3 text-teal-700">

                {icon}

            </div>

            <p className="text-xs uppercase tracking-wide text-slate-500">

                {title}

            </p>

            <p className="mt-2 text-lg font-semibold text-slate-900">

                {value}

            </p>

        </div>

    );

}