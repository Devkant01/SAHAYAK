import {
    BriefcaseBusiness,
    MapPin,
    Phone,
    Star,
    MessageCircle,
    BadgeCheck,
} from "lucide-react";

export default function AssignedWorkerCard({ task }) {
    const Worker = task.worker;

    return (
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
            <div className="relative h-64">
                <img
                    src={Worker.image}
                    alt={Worker.name}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div className="text-white">
                        <h2 className="text-3xl font-bold">
                            {Worker.name}
                        </h2>

                        <p className="mt-1 text-sm text-slate-200">
                            {Worker.specialization}
                        </p>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg">
                        <Star
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                        />

                        <span className="font-semibold">
                            {Worker.rating}
                        </span>
                    </div>
                </div>
            </div>

            <div className="space-y-8 p-7">
                <div className="grid gap-4 sm:grid-cols-2">
                    <InfoCard
                        icon={<BriefcaseBusiness size={20} />}
                        title="Experience"
                        value={`${Worker.experience} Years`}
                    />

                    <InfoCard
                        icon={<MapPin size={20} />}
                        title="Distance"
                        value={`${Worker.distance} km`}
                    />

                    <InfoCard
                        icon={<BadgeCheck size={20} />}
                        title="Completed Jobs"
                        value={Worker.completedJobs}
                    />

                    <InfoCard
                        icon={<Phone size={20} />}
                        title="Contact"
                        value={Worker.phone}
                    />
                </div>

                <div>
                    <h3 className="mb-4 text-lg font-semibold text-slate-900">
                        About
                    </h3>

                    <p className="leading-7 text-slate-600">
                        {Worker.bio}
                    </p>
                </div>

                <div>
                    <h3 className="mb-4 text-lg font-semibold text-slate-900">
                        Skills
                    </h3>

                    <div className="flex flex-wrap gap-3">
                        {Worker.skills?.map((skill) => (
                            <span
                                key={skill}
                                className="rounded-full bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <button
                        className="
                            flex items-center justify-center gap-2
                            rounded-xl
                            border
                            border-teal-600
                            py-3
                            font-semibold
                            text-teal-700
                            transition-all
                            hover:bg-teal-50
                        "
                    >
                        <MessageCircle size={18} />

                        Message
                    </button>

                    <button
                        className="
                            flex items-center justify-center gap-2
                            rounded-xl
                            bg-teal-600
                            py-3
                            font-semibold
                            text-white
                            transition-all
                            hover:bg-teal-700
                        "
                    >
                        <Phone size={18} />

                        Call Worker
                    </button>
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
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-teal-200 hover:bg-white">
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