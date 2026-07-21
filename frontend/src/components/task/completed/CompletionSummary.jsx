import {
    BadgeCheck,
    Calendar,
    CircleDollarSign,
    Clock3,
    Hammer,
    Receipt,
    User,
} from "lucide-react";

export default function CompletionSummary({
    task,
}) {

    const Task = task.task;
    const Worker = task.worker;

    return (

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">

                            <BadgeCheck size={18} />

                            <span className="font-medium">

                                Completed Successfully

                            </span>

                        </div>

                        <h2 className="mt-5 text-3xl font-bold">

                            Task Finished

                        </h2>

                        <p className="mt-2 max-w-2xl text-emerald-100">

                            This task has been completed successfully.
                            Thank you for using Sahayak.

                        </p>

                    </div>

                    <div className="rounded-2xl bg-white/15 px-8 py-6 backdrop-blur">

                        <p className="text-sm text-emerald-100">

                            Status

                        </p>

                        <h3 className="mt-2 text-2xl font-bold">

                            Completed

                        </h3>

                    </div>

                </div>

            </div>

            <div className="grid gap-6 p-8 md:grid-cols-2 xl:grid-cols-3">

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
                    title="Amount Paid"
                    value={`₹${Task.budget}`}
                />

                <InfoCard
                    icon={<Calendar size={20} />}
                    title="Completed On"
                    value={Task.completedAt}
                />

                <InfoCard
                    icon={<Clock3 size={20} />}
                    title="Duration"
                    value={Task.duration}
                />

                <InfoCard
                    icon={<Receipt size={20} />}
                    title="Payment Status"
                    value={Task.paymentStatus || "Paid"}
                />

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

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-emerald-200 hover:bg-white">

            <div className="mb-4 inline-flex rounded-full bg-emerald-100 p-3 text-emerald-700">

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