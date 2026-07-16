import {
    Phone,
    Mail,
    BadgeCheck
} from "lucide-react";

export default function InProgressSection({ task }) {

    const Worker =
        task.assignedWorker;

    return (
        <div className="space-y-6">

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-xl font-semibold mb-5">
                    Assigned Worker
                </h2>

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                    <div className="flex items-center gap-4">

                        <img
                            src={Worker.image}
                            alt={Worker.name}
                            className="w-20 h-20 rounded-full object-cover"
                        />

                        <div>

                            <div className="flex items-center gap-2">

                                <h3 className="text-lg font-semibold">
                                    {Worker.name}
                                </h3>

                                {Worker.isVerified && (
                                    <BadgeCheck
                                        size={18}
                                        className="text-teal-600"
                                    />
                                )}

                            </div>

                            <p className="text-gray-500">
                                {Worker.profession}
                            </p>

                            <p>
                                ⭐ {Worker.rating}
                            </p>

                        </div>

                    </div>

                    <div className="flex gap-3">

                        <button className="border px-4 py-2 rounded-xl flex items-center gap-2">
                            <Phone size={16} />
                            Call
                        </button>

                        <button className="border px-4 py-2 rounded-xl flex items-center gap-2">
                            <Mail size={16} />
                            Email
                        </button>

                    </div>

                </div>

            </div>

            <div className="bg-white border rounded-2xl p-6">

                <div className="flex justify-between mb-2">

                    <span>
                        Progress
                    </span>

                    <span>
                        {task.progress?.percentage || 0}%
                    </span>

                </div>

                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">

                    <div
                        className="bg-teal-600 h-3"
                        style={{
                            width: `${task.progress?.percentage || 0}%`
                        }}
                    />

                </div>

            </div>

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-xl font-semibold mb-5">
                    Progress Updates
                </h2>

                <div className="space-y-5">

                    {task.updates?.map((update) => (

                        <div
                            key={update._id}
                            className="border rounded-xl p-4"
                        >

                            <p>
                                {update.message}
                            </p>

                            {update.image && (
                                <img
                                    src={update.image}
                                    alt=""
                                    className="mt-3 rounded-xl"
                                />
                            )}

                            <p className="text-sm text-gray-500 mt-3">

                                {new Date(
                                    update.createdAt
                                ).toLocaleString()}

                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}