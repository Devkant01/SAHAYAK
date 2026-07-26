import {
    MapPin,
    Phone,
    MessageCircle,
    Star,
} from "lucide-react";

export default function ClientCard({
    Client,
}) {

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="p-6 border-b border-gray-100">

                <h2 className="text-lg font-semibold text-gray-900">
                    Client Information
                </h2>

            </div>

            <div className="p-6">

                <div className="flex items-center gap-4">

                    <img
                        src={
                            Client?.image ||
                            "https://placehold.co/80x80?text=User"
                        }
                        alt={Client?.name}
                        className="w-20 h-20 rounded-full object-cover border"
                    />

                    <div>

                        <h3 className="text-lg font-semibold text-gray-900">
                            {Client?.name}
                        </h3>

                        <div className="flex items-center gap-1 mt-1 text-amber-500">

                            <Star
                                size={16}
                                fill="currentColor"
                            />

                            <span className="text-sm font-medium">
                                {Client?.rating || "New Client"}
                            </span>

                        </div>

                    </div>

                </div>

                <div className="mt-6 space-y-4">

                    <div className="flex items-center gap-3 text-gray-600">

                        <MapPin
                            size={18}
                            className="text-teal-600"
                        />

                        <span>
                            {Client?.location.city}, {Client?.location.state}
                        </span>

                    </div>

                    <div className="flex items-center gap-3 text-gray-600">

                        <Phone
                            size={18}
                            className="text-teal-600"
                        />

                        <span>
                            {Client?.phone || "Not Available"}
                        </span>

                    </div>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">

                    <button
                        className="flex items-center justify-center gap-2 rounded-xl border border-teal-600 text-teal-600 py-3 font-medium hover:bg-teal-50 transition"
                    >

                        <Phone size={18} />

                        Call

                    </button>

                    <button
                        className="flex items-center justify-center gap-2 rounded-xl bg-teal-600 text-white py-3 font-medium hover:bg-teal-700 transition"
                    >

                        <MessageCircle size={18} />

                        Message

                    </button>

                </div>

            </div>

        </div>
    );
}