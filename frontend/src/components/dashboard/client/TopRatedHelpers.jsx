import { Star, MapPin, BriefcaseBusiness } from "lucide-react";

export default function TopRatedHelpers({
    Loading,
    Helpers
}) {

    if (Loading) {
        return (
            <section>
                <div className="mb-6">
                    <div className="h-6 w-56 rounded bg-gray-100 animate-pulse" />
                    <div className="h-4 w-72 rounded bg-gray-100 animate-pulse mt-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, Index) => (
                        <div
                            key={Index}
                            className="h-72 rounded-2xl bg-gray-100 animate-pulse"
                        />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section>

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-gray-900">
                    Top-Rated Sahayaks Nearby
                </h2>

                <p className="text-gray-500 mt-1">
                    Trusted professionals ready to help
                </p>

            </div>

            {!Helpers?.length ? (
                <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

                    <h3 className="text-lg font-semibold text-gray-900">
                        No Helpers Available
                    </h3>

                    <p className="mt-2 text-gray-500">
                        Please check again later.
                    </p>

                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {Helpers.map((Helper) => (

                        <div
                            key={Helper._id}
                            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                        >

                            <div className="flex items-center gap-4">

                                <img
                                    src={
                                        Helper.image ||
                                        "https://ui-avatars.com/api/?name=User"
                                    }
                                    alt={Helper.name}
                                    className="h-16 w-16 rounded-full object-cover"
                                />

                                <div>

                                    <h3 className="font-semibold text-gray-900">
                                        {Helper.name}
                                    </h3>

                                    <div className="flex items-center gap-1 mt-1 text-yellow-500">
                                        <Star
                                            size={16}
                                            fill="currentColor"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            {Helper.rating.average || "4.8"}
                                        </span>
                                    </div>

                                </div>

                            </div>

                            <div className="mt-5 space-y-3">

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <BriefcaseBusiness size={16} />
                                    <span>
                                        {Helper.skill || "General Services"}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin size={16} />
                                    <span>
                                        {Helper.location || "Nearby"}
                                    </span>
                                </div>

                            </div>

                            <div className="mt-5 flex items-center justify-between border-t pt-4">

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Completed Jobs
                                    </p>

                                    <p className="font-semibold text-gray-900">
                                        {Helper.completedJobs || 0}
                                    </p>
                                </div>

                                <button
                                    className="rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 transition"
                                >
                                    Invite
                                </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </section>
    );
}