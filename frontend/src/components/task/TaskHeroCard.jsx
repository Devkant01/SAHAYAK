import {
    Calendar,
    IndianRupee,
    MapPin,
    Briefcase
} from "lucide-react";

export default function TaskHeroCard({ task }) {
    const StatusStyles = {
        pending:
            "bg-amber-100 text-amber-700",

        "in-progress":
            "bg-teal-100 text-teal-700",

        "awaiting-review":
            "bg-orange-100 text-orange-700",

        completed:
            "bg-emerald-100 text-emerald-700"
    };

    return (
        <div className="bg-white border rounded-2xl p-6 shadow-sm">

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                <div>

                    <div className="flex items-center gap-3 mb-3">

                        <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${StatusStyles[task.status]}`}
                        >
                            {task.status}
                        </span>

                        {/* <span className="text-gray-500 text-sm">
                            #{task._id}
                        </span> */}

                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        {task.title}
                    </h1>

                    <p className="mt-3 text-gray-600">
                        {task.description}
                    </p>

                </div>

                {/* <div className="text-left lg:text-right">

                    <div className="flex items-center gap-1 text-teal-600 font-bold text-3xl justify-start lg:justify-end">

                        <IndianRupee size={28} />

                        {task.budget}

                    </div>

                    <p className="text-sm text-gray-500">
                        Budget
                    </p>

                </div> */}

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

                <div className="flex items-center gap-2 text-gray-600">
                    <Briefcase size={18} />
                    {task.category}
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin size={18} />
                    {task.location?.address}
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} />
                    {new Date(task.createdAt).toLocaleDateString()}
                </div>

            </div>

        </div>
    );
}