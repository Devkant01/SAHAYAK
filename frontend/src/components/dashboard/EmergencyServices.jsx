import {
    Zap,
    Wrench,
    Snowflake,
    BrushCleaning,
    KeyRound,
    Hammer
} from "lucide-react";

const Icons = {
    Electrician: Zap,
    Plumber: Wrench,
    "AC Repair": Snowflake,
    Cleaner: BrushCleaning,
    Locksmith: KeyRound,
    Handyman: Hammer
};

export default function EmergencyServices({
    Services
}) {

    return (
        <section>

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-gray-900">
                    Emergency Services
                </h2>

                <p className="text-gray-500 mt-1">
                    Get immediate help for urgent issues
                </p>

            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

                {Services?.map((Service, Index) => {

                    const Icon =
                        Icons[Service.name] || Hammer;

                    return (
                        <button
                            key={Index}
                            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md hover:border-teal-200 transition"
                        >

                            <div className="flex justify-center">

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 group-hover:scale-110 transition">

                                    <Icon size={26} />

                                </div>

                            </div>

                            <h3 className="mt-4 text-center font-semibold text-gray-900">
                                {Service.name}
                            </h3>

                            <p className="mt-1 text-center text-xs text-gray-500">
                                Book Now
                            </p>

                        </button>
                    );
                })}

            </div>

        </section>
    );
}