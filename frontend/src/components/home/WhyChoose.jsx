import {
    BadgeCheck,
    Zap,
    FileText,
    Clock,
} from "lucide-react";

const Features = [
    {
        icon: BadgeCheck,
        title: "Verified Professionals",
        description:
            "Work with trusted and verified service providers.",
    },
    {
        icon: Zap,
        title: "Easy Hiring",
        description:
            "Post a task and receive applications quickly.",
    },
    {
        icon: FileText,
        title: "Transparent Process",
        description:
            "Review profiles, ratings, and choose confidently.",
    },
    {
        icon: Clock,
        title: "Fast Completion",
        description:
            "Get your work done efficiently and on time.",
    },
];

function WhyChoose() {
    return (
        <section className="bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 py-20">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold">
                        Why Choose Sahayak?
                    </h2>

                    <p className="mt-3 text-lg text-slate-600">
                        A platform built around trust,
                        speed, and quality.
                    </p>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {Features.map(
                        ({
                            icon: Icon,
                            title,
                            description,
                        }) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-slate-200 bg-white p-6"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600 text-white">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <h3 className="mt-4 text-lg font-semibold">
                                    {title}
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    {description}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </section>
    );
}

export default WhyChoose;