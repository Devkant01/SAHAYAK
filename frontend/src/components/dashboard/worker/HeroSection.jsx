import { BriefcaseBusiness } from "lucide-react";

export default function HeroSection() {

    return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-teal-500 to-teal-600 p-8 text-white shadow-lg">

            <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 left-1/3 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

                <div className="max-w-2xl">

                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur">

                        <BriefcaseBusiness className="h-4 w-4" />

                        Worker Dashboard

                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold leading-tight">

                        Ready to complete your assigned tasks?

                    </h1>

                    <p className="mt-4 max-w-xl text-sm text-teal-50 md:text-base">

                        View your assigned tasks, track ongoing work, and deliver quality service to maintain your reputation.

                    </p>

                </div>

                <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur">

                    <p className="text-sm text-teal-100">

                        Stay Professional

                    </p>

                    <h3 className="mt-2 text-2xl font-semibold">

                        Complete every task on time.

                    </h3>

                </div>

            </div>

        </section>
    );
}