import {
    CalendarDays,
    MessageSquareQuote,
    Star,
    UserRound,
} from "lucide-react";

export default function ClientReviewCard({
    Client,
    Review,
}) {
    console.log("ClientReviewCard", { Client, Review });

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            <div className="px-6 py-5 border-b border-gray-100">

                <h2 className="text-lg font-semibold text-gray-900">
                    Client Review
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
                        className="w-16 h-16 rounded-full object-cover border"
                    />

                    <div>

                        <h3 className="text-lg font-semibold text-gray-900">
                            {Client?.name}
                        </h3>

                        <div className="flex items-center gap-1 mt-2">

                            {Array.from({ length: 5 }).map((_, Index) => (

                                <Star
                                    key={Index}
                                    size={18}
                                    className={
                                        Index < (Review?.rating || 0)
                                            ? "fill-amber-400 text-amber-400"
                                            : "text-gray-300"
                                    }
                                />

                            ))}

                        </div>

                    </div>

                </div>

                <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">

                    <div className="flex items-center gap-2 mb-4">

                        <MessageSquareQuote
                            size={18}
                            className="text-teal-600"
                        />

                        <h4 className="font-semibold text-gray-900">
                            Feedback
                        </h4>

                    </div>

                    <p className="text-gray-600 leading-7 whitespace-pre-line">

                        {Review?.review ||
                            "The client didn't leave any written feedback."}

                    </p>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">

                    <div className="flex items-start gap-3">

                        <CalendarDays
                            size={18}
                            className="text-teal-600 mt-1"
                        />

                        <div>

                            <p className="text-sm text-gray-500">
                                Reviewed On
                            </p>

                            <p className="font-semibold text-gray-900">
                                {new Date(Review?.createdAt).toLocaleDateString("en-Gn", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }) || "--"}
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-3">

                        <UserRound
                            size={18}
                            className="text-teal-600 mt-1"
                        />

                        <div>

                            <p className="text-sm text-gray-500">
                                Reviewed By
                            </p>

                            <p className="font-semibold text-gray-900">
                                {Client?.name}
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}