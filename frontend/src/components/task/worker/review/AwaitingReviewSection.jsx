import {
    CircleCheckBig,
    Clock3,
} from "lucide-react";

import CompletionStatusCard from "./CompletionStatusCard";

export default function AwaitingReviewSection({
    Task,
    Client,
    Timeline,
}) {

    return (
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            <div className="xl:col-span-2">

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                    <div className="px-6 py-5 border-b border-gray-100">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Awaiting Client Review
                        </h2>

                    </div>

                    <div className="p-6">

                        <div className="flex items-start gap-4">

                            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">

                                <CircleCheckBig
                                    size={26}
                                    className="text-green-600"
                                />

                            </div>

                            <div>

                                <h3 className="text-lg font-semibold text-gray-900">
                                    Task Submitted Successfully
                                </h3>

                                <p className="mt-2 text-gray-600 leading-7">
                                    You have marked this task as completed.
                                    The client has been notified and will
                                    review your work before closing the task.
                                </p>

                            </div>

                        </div>

                        <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">

                            <div className="flex items-start gap-3">

                                <Clock3
                                    size={20}
                                    className="text-amber-600 mt-0.5"
                                />

                                <div>

                                    <h4 className="font-semibold text-gray-900">
                                        Waiting for Client
                                    </h4>

                                    <p className="mt-2 text-sm text-gray-600 leading-6">
                                        No further action is required from
                                        your side. Once the client reviews
                                        your work, this task will move to
                                        the Completed stage.
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <CompletionStatusCard
                Task={Task}
                Client={Client}
                Timeline={Timeline}
            />

        </section>
    );
}