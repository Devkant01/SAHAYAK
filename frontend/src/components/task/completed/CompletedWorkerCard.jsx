import {
    BadgeCheck,
    BriefcaseBusiness,
    MapPin,
    Phone,
    Star,
} from "lucide-react";

export default function CompletedWorkerCard({
    task,
}) {

    const Worker = task.worker;

    return (

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">

            <div className="relative h-56">

                <img
                    src={Worker.image}
                    alt={Worker.name}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">

                    <div className="text-white">

                        <h2 className="text-2xl font-bold">

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

            <div className="space-y-5 p-6">

                <InfoCard
                    icon={<BriefcaseBusiness size={18} />}
                    title="Experience"
                    value={`${Worker.experience} Years`}
                />

                <InfoCard
                    icon={<BadgeCheck size={18} />}
                    title="Jobs Completed"
                    value={Worker.completedJobs}
                />

                <InfoCard
                    icon={<MapPin size={18} />}
                    title="Distance"
                    value={`${Worker.distance} km`}
                />

                <InfoCard
                    icon={<Phone size={18} />}
                    title="Phone"
                    value={Worker.phone}
                />

                <div>

                    <h3 className="mb-3 font-semibold text-slate-900">

                        Skills

                    </h3>

                    <div className="flex flex-wrap gap-2">

                        {
                            Worker.skills?.map(skill => (

                                <span
                                    key={skill}
                                    className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700"
                                >

                                    {skill}

                                </span>

                            ))
                        }

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

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">

            <div className="rounded-full bg-emerald-100 p-3 text-emerald-700">

                {icon}

            </div>

            <div>

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