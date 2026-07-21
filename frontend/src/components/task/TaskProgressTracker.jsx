import {
    ClipboardList,
    Hammer,
    Star,
    CircleCheckBig,
} from "lucide-react";

const Steps = [
    {
        key: "pending",
        title: "Pending",
        icon: ClipboardList,
    },
    {
        key: "in-progress",
        title: "In Progress",
        icon: Hammer,
    },
    {
        key: "awaiting-review",
        title: "Review",
        icon: Star,
    },
    {
        key: "completed",
        title: "Completed",
        icon: CircleCheckBig,
    },
];

export default function TaskProgressTracker({ status }) {

    const CurrentIndex = Steps.findIndex(
        step => step.key === status
    );

    return (

        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">

            <div className="relative flex items-center justify-between">

                <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-slate-200" />

                <div
                    className="absolute left-0 top-5 h-1 rounded-full bg-teal-600 transition-all duration-700"
                    style={{
                        width: `${(CurrentIndex / (Steps.length - 1)) * 100}%`,
                    }}
                />

                {
                    Steps.map((step, index) => {

                        const Active = index === CurrentIndex;
                        const Completed = index < CurrentIndex;

                        const Icon = step.icon;

                        return (

                            <div
                                key={step.key}
                                className="relative z-10 flex flex-col items-center"
                            >

                                <div
                                    className={`
                                        flex h-11 w-11 items-center justify-center rounded-full border-4 transition-all duration-500

                                        ${Completed
                                            ? "border-teal-600 bg-teal-600 text-white"
                                            : Active
                                                ? "border-teal-600 bg-white text-teal-600 shadow-lg ring-8 ring-teal-100 animate-pulse"
                                                : "border-slate-300 bg-white text-slate-400"
                                        }
                                    `}
                                >
                                    <Icon size={20} />
                                </div>

                                <p
                                    className={`
                                        mt-4 text-sm font-semibold transition-colors

                                        ${Completed
                                            ? "text-teal-700"
                                            : Active
                                                ? "text-slate-900"
                                                : "text-slate-400"
                                        }
                                    `}
                                >
                                    {step.title}
                                </p>

                            </div>

                        );

                    })
                }

            </div>

        </section>

    );

}