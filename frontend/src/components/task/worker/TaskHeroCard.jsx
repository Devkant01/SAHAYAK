import {
    CalendarDays,
    ClipboardList,
    MapPin,
    UserRound,
    Wrench,
} from "lucide-react";

export default function TaskHeroCard({
    Task,
    Client,
}) {

    
    const StatusColor = {
        "in-progress":
            "bg-blue-100 text-blue-700",

        "awaiting_review":
            "bg-purple-100 text-purple-700",

        "completed":
            "bg-green-100 text-green-700"
    };

    return (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="p-8">

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">

                    <div>

                        <div className="flex flex-wrap items-center gap-3">

                            <span
                                className={`px-3 py-1 rounded text-sm font-medium capitalize ${StatusColor[Task?.status]}`}
                            >
                                {Task?.status?.replace("-", " ")}
                            </span>

                            {/* <span className="text-sm text-gray-500">
                                Task #{Task?._id?.slice(-6)}
                            </span> */}

                        </div>

                        <h1 className="mt-4 text-3xl font-bold text-gray-900">

                            {Task?.title}

                        </h1>

                        <p className="mt-4 text-gray-600 leading-7 max-w-3xl">

                            {Task?.description}

                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">

                    <div className="flex items-start gap-3">

                        <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center">

                            <UserRound
                                size={20}
                                className="text-teal-600"
                            />

                        </div>

                        <div>

                            <p className="text-sm text-gray-500">
                                Client
                            </p>

                            <p className="font-semibold text-gray-900 mt-1">
                                {Client?.name}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-3">

                        <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center">

                            <Wrench
                                size={20}
                                className="text-teal-600"
                            />

                        </div>

                        <div>

                            <p className="text-sm text-gray-500">
                                Category
                            </p>

                            <p className="font-semibold text-gray-900 mt-1">
                                {Task?.category}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-3">

                        <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center">

                            <MapPin
                                size={20}
                                className="text-teal-600"
                            />

                        </div>

                        <div>

                            <p className="text-sm text-gray-500">
                                Location
                            </p>

                            <p className="font-semibold text-gray-900 mt-1">
                                {Client?.location?.city}, {Client?.location?.state}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-3">

                        <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center">

                            <CalendarDays
                                size={20}
                                className="text-teal-600"
                            />

                        </div>

                        <div>

                            <p className="text-sm text-gray-500">
                                Assigned On
                            </p>

                            <p className="font-semibold text-gray-900 mt-1">
                                {new Date(Task?.assignedAt || Task?.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>

                        </div>

                    </div>

                </div>

                <div className="mt-8 border-t border-gray-100 pt-6 flex items-center gap-3 text-gray-600">

                    <ClipboardList
                        size={18}
                        className="text-teal-600"
                    />

                    <span className="text-sm">
                        Complete the assigned work and mark it as completed once finished. The client will then review your work before closing the task.
                    </span>

                </div>

            </div>

        </section>
    );
}