import {
    CalendarDays,
    Clock3,
    FileText,
    MapPin,
    Wrench,
} from "lucide-react";

export default function TaskInfoCard({
    Task,
    Client,
}) {

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b border-gray-100">

                <h2 className="text-lg font-semibold text-gray-900">
                    Task Information
                </h2>

            </div>

            <div className="p-6 space-y-8">

                <div>

                    <h3 className="text-base font-semibold text-gray-900 flex items-center gap-2">

                        <FileText
                            size={18}
                            className="text-teal-600"
                        />

                        Description

                    </h3>

                    <p className="mt-3 text-gray-600 leading-7 whitespace-pre-line">
                        {Task?.description}
                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="flex items-start gap-3">

                        <Wrench
                            size={20}
                            className="text-teal-600 mt-0.5"
                        />

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

                        <MapPin
                            size={20}
                            className="text-teal-600 mt-0.5"
                        />

                        <div>

                            <p className="text-sm text-gray-500">
                                Location
                            </p>

                            <p className="font-semibold text-gray-900 mt-1">
                                {Client?.location.street}, {Client?.location.city}, {Client?.location.state}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-3">

                        <CalendarDays
                            size={20}
                            className="text-teal-600 mt-0.5"
                        />

                        <div>

                            <p className="text-sm text-gray-500">
                                Assigned On
                            </p>

                            <p className="font-semibold text-gray-900 mt-1">
                                {new Date(Task?.acceptedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-3">

                        <Clock3
                            size={20}
                            className="text-teal-600 mt-0.5"
                        />

                        <div>

                            <p className="text-sm text-gray-500">
                                Expected Duration
                            </p>

                            <p className="font-semibold text-gray-900 mt-1">
                                {Task?.duration || "Not Specified"}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}