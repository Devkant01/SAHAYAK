import {
    CalendarClock,
    Clock3,
    Hammer,
    CircleDashed,
} from "lucide-react";

export default function ProgressBar({ task }) {

    const Task = task.task;

    const Progress = Task.progress || 0;

    const LastUpdate = task.updates?.length
        ? task.updates[task.updates.length - 1]
        : null;

    const CurrentPhase =
        Task.currentPhase ||
        LastUpdate?.title ||
        "Work In Progress";

    const EstimatedCompletion =
        Task.expectedCompletion ||
        "--";

    return (

        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg">

            <div className="flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium text-slate-500">
                        Current Progress
                    </p>

                    <h2 className="mt-2 text-5xl font-bold text-slate-900">
                        {Progress}%
                    </h2>

                </div>

                <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 p-4 text-white shadow-lg">

                    <Hammer size={26} />

                </div>

            </div>

            <div className="mt-8">

                <div className="mb-3 flex justify-between text-sm">

                    <span className="font-medium text-slate-500">
                        Overall Completion
                    </span>

                    <span className="font-semibold text-teal-700">
                        {Progress}%
                    </span>

                </div>

                <div className="h-4 overflow-hidden rounded-full bg-slate-200">

                    <div
                        className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-teal-500
                            via-emerald-500
                            to-green-500
                            transition-all
                            duration-700
                        "
                        style={{
                            width: `${Progress}%`,
                        }}
                    />

                </div>

            </div>

            <div className="mt-8 grid gap-4">

                <InfoRow
                    icon={<CircleDashed size={18} />}
                    title="Current Phase"
                    value={CurrentPhase}
                />

                <InfoRow
                    icon={<CalendarClock size={18} />}
                    title="Estimated Completion"
                    value={EstimatedCompletion}
                />

                <InfoRow
                    icon={<Clock3 size={18} />}
                    title="Last Updated"
                    value={LastUpdate?.time || "--"}
                />

            </div>

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 p-5">

                <p className="text-sm font-medium text-slate-500">

                    Status

                </p>

                <div className="mt-3 flex items-center gap-3">

                    <span className="h-3 w-3 animate-pulse rounded-full bg-green-500" />

                    <p className="font-semibold text-slate-800">

                        Worker is actively working on this task.

                    </p>

                </div>

            </div>

        </section>

    );

}

function InfoRow({
    icon,
    title,
    value,
}) {

    return (

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-teal-200 hover:bg-white">

            <div className="rounded-full bg-teal-100 p-3 text-teal-700">

                {icon}

            </div>

            <div className="flex-1">

                <p className="text-xs uppercase tracking-wide text-slate-500">

                    {title}

                </p>

                <p className="mt-1 font-semibold text-slate-900">

                    {value}

                </p>

            </div>

        </div>

    );

}