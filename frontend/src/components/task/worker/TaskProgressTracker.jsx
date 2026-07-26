import {
    CircleCheckBig,
    ClipboardCheck,
    Hammer,
} from "lucide-react";

export default function TaskProgressTracker({
    Status,
}) {

    const Steps = [
        {
            Key: "in-progress",
            Label: "In Progress",
            Icon: Hammer,
        },
        {
            Key: "awaiting_review",
            Label: "Awaiting Review",
            Icon: ClipboardCheck,
        },
        {
            Key: "completed",
            Label: "Completed",
            Icon: CircleCheckBig,
        },
    ];

    const CurrentIndex = Steps.findIndex(
        Step => Step.Key === Status
    );

    return (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            <div className="flex items-center justify-between">

                {Steps.map((Step, Index) => {

                    const Completed =
                        Index < CurrentIndex;

                    const Active =
                        Index === CurrentIndex;

                    return (
                        <div
                            key={Step.Key}
                            className="flex items-center flex-1 last:flex-none"
                        >

                            <div className="flex flex-col items-center">

                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                    
                                    ${Completed
                                            ? "bg-teal-600 border-teal-600 text-white"
                                            : Active
                                                ? "bg-teal-50 border-teal-600 text-teal-600"
                                                : "bg-gray-100 border-gray-300 text-gray-400"
                                        }`}
                                >

                                    <Step.Icon size={22} />

                                </div>

                                <p
                                    className={`mt-3 text-sm font-medium text-center

                                    ${Completed || Active
                                            ? "text-gray-900"
                                            : "text-gray-400"
                                        }`}
                                >
                                    {Step.Label}
                                </p>

                            </div>

                            {Index !== Steps.length - 1 && (

                                <div
                                    className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300

                                    ${Completed
                                            ? "bg-teal-600"
                                            : "bg-gray-200"
                                        }`}
                                />

                            )}

                        </div>
                    );
                })}

            </div>

        </section>
    );
}