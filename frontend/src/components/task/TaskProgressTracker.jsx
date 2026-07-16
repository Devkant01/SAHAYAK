import {
    CheckCircle
} from "lucide-react";

export default function TaskProgressTracker({
    status
}) {

    const CurrentStep = {
        pending: 1,
        "in-progress": 3,
        "awaiting-review": 4,
        completed: 5
    };

    const ActiveStep =
        CurrentStep[status];

    const Steps = [
        "Published",
        "Worker Hired",
        "In Progress",
        "Review",
        "Completed"
    ];

    return (
        <div className="bg-white border rounded-2xl p-6">

            <div className="flex items-center justify-between">

                {Steps.map(
                    (step, index) => {

                        const StepNumber =
                            index + 1;

                        const Completed =
                            StepNumber <= ActiveStep;

                        return (
                            <div
                                key={step}
                                className="flex flex-col items-center flex-1"
                            >

                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center ${Completed
                                            ? "bg-teal-600 text-white"
                                            : "bg-gray-200 text-gray-500"
                                        }`}
                                >

                                    <CheckCircle
                                        size={18}
                                    />

                                </div>

                                <p className="text-xs text-center mt-2">
                                    {step}
                                </p>

                            </div>
                        );
                    }
                )}

            </div>

        </div>
    );
}