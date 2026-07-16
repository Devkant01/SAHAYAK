export default function CompletedSection({ task }) {

    return (
        <div className="space-y-6">

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">

                Task completed successfully.

            </div>

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-xl font-semibold mb-5">
                    Completion Summary
                </h2>

                <div className="grid md:grid-cols-4 gap-4">

                    <div>
                        <p className="text-sm text-gray-500">
                            Created
                        </p>

                        <p>
                            {new Date(
                                task.createdAt
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Hired
                        </p>

                        <p>
                            {task.hiredAt
                                ? new Date(
                                    task.hiredAt
                                ).toLocaleDateString()
                                : "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Completed
                        </p>

                        <p>
                            {task.completedAt
                                ? new Date(
                                    task.completedAt
                                ).toLocaleDateString()
                                : "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Budget
                        </p>

                        <p>
                            ₹{task.budget}
                        </p>
                    </div>

                </div>

            </div>

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-xl font-semibold mb-5">
                    Your Review
                </h2>

                <p>
                    ⭐ {task.review?.rating}
                </p>

                <p className="mt-3 text-gray-600">
                    {task.review?.reviewText}
                </p>

            </div>

        </div>
    );
}