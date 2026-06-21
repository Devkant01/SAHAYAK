import {
    FileText,
    Users,
    CheckCircle,
} from "lucide-react";

const Steps = [
    {
        icon: FileText,
        step: "01",
        title: "Publish Task",
        description:
            "Create a task with details, budget, and requirements.",
    },
    {
        icon: Users,
        step: "02",
        title: "Hire Professionals",
        description:
            "Receive applications from interested providers and select the best match.",
    },
    {
        icon: CheckCircle,
        step: "03",
        title: "Get It Done",
        description:
            "Track progress and mark the task complete when finished.",
    },
];

function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="mx-auto max-w-7xl px-4 py-20"
        >
            <div className="text-center">
                <h2 className="text-3xl font-semibold">
                    How It Works
                </h2>

                <p className="mt-3 text-lg text-slate-600">
                    Three simple steps to get your task completed.
                </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
                {Steps.map(
                    ({
                        icon: Icon,
                        step,
                        title,
                        description,
                    }) => (
                        <div
                            key={step}
                            className="text-center"
                        >
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600 text-white">
                                <Icon className="h-7 w-7" />
                            </div>

                            <p className="mt-4 text-sm font-semibold text-teal-600">
                                STEP {step}
                            </p>

                            <h3 className="mt-2 text-xl font-semibold">
                                {title}
                            </h3>

                            <p className="mt-2 text-slate-500">
                                {description}
                            </p>
                        </div>
                    )
                )}
            </div>
        </section>
    );
}

export default HowItWorks;