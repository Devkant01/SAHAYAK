import {
    CalendarDays,
    CircleCheckBig,
    Clock3,
    UserRound,
} from "lucide-react";

export default function CompletionStatusCard({
    Task,
    Client,
    Timeline,
}) {

    const CompletedAt =
        Timeline?.find(
            Item => Item.type === "completed"
        )?.time;

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-fit">

            <div className="px-6 py-5 border-b border-gray-100">

                <h2 className="text-lg font-semibold text-gray-900">
                    Completion Summary
                </h2>

            </div>

            <div className="p-6 space-y-6">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">

                        <UserRound
                            size={20}
                            className="text-teal-600"
                        />

                    </div>

                    <div>

                        <p className="text-sm text-gray-500">
                            Client
                        </p>

                        <h3 className="font-semibold text-gray-900">
                            {Client?.name}
                        </h3>

                    </div>

                </div>

                <div className="border-t border-gray-100 pt-6 space-y-5">

                    <div className="flex items-start gap-3">

                        <CircleCheckBig
                            size={18}
                            className="text-green-600 mt-1"
                        />

                        <div>

                            <p className="text-sm text-gray-500">
                                Current Status
                            </p>

                            <p className="font-semibold text-gray-900">
                                Awaiting Client Review
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-3">

                        <CalendarDays
                            size={18}
                            className="text-teal-600 mt-1"
                        />

                        <div>

                            <p className="text-sm text-gray-500">
                                Submitted On
                            </p>

                            <p className="font-semibold text-gray-900">
                                {CompletedAt
                                    ? new Date(CompletedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                                    : new Date(Task?.submittedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                                }
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-3">

                        <Clock3
                            size={18}
                            className="text-teal-600 mt-1"
                        />

                        <div>

                            <p className="text-sm text-gray-500">
                                Review Status
                            </p>

                            <p className="font-semibold text-amber-600">
                                Waiting for Client
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}