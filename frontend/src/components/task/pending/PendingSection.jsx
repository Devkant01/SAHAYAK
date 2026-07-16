import {
    MapPin,
    Star,
    BadgeCheck,
    Phone,
    UserPlus
} from "lucide-react";

export default function PendingSection({ task }) {

    const Workers =
        task.availableWorkers || [];

    return (
        <div className="space-y-6">

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-xl font-semibold mb-2">
                    Recommended Workers
                </h2>

                <p className="text-gray-500">
                    Hire a professional for this task.
                </p>

            </div>

            <div className="grid lg:grid-cols-3 gap-5">

                {Workers.map((worker) => (

                    <div
                        key={worker._id}
                        className="bg-white border rounded-2xl p-5"
                    >

                        <div className="flex items-center gap-4">

                            <img
                                src={worker.image}
                                alt={worker.name}
                                className="w-16 h-16 rounded-full object-cover"
                            />

                            <div>

                                <div className="flex items-center gap-2">

                                    <h3 className="font-semibold">
                                        {worker.name}
                                    </h3>

                                    {worker.isVerified && (
                                        <BadgeCheck
                                            size={16}
                                            className="text-teal-600"
                                        />
                                    )}

                                </div>

                                <p className="text-sm text-gray-500">
                                    {worker.profession}
                                </p>

                            </div>

                        </div>

                        <div className="mt-5 space-y-2">

                            <div className="flex items-center gap-2">

                                <Star
                                    size={16}
                                    className="text-yellow-500"
                                />

                                {worker.rating}

                            </div>

                            <div className="flex items-center gap-2">

                                <MapPin
                                    size={16}
                                />

                                {worker.distance} km away

                            </div>

                            <div>
                                {worker.completedTasks} tasks completed
                            </div>

                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-5">

                            <button
                                className="border rounded-xl py-2 flex items-center justify-center gap-2"
                            >
                                <Phone size={16} />
                                Contact
                            </button>

                            <button
                                className="bg-teal-600 text-white rounded-xl py-2 flex items-center justify-center gap-2"
                            >
                                <UserPlus size={16} />
                                Hire
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}