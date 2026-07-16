import { useState } from "react";

export default function AwaitingReviewSection({ task }) {

    const [rating, setRating] =
        useState(0);

    const [review, setReview] =
        useState("");

    return (
        <div className="space-y-6">

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5">

                Work has been marked as completed.
                Please review the worker.

            </div>

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-xl font-semibold mb-5">
                    Task Summary
                </h2>

                <div className="grid md:grid-cols-3 gap-4">

                    <div>
                        <p className="text-sm text-gray-500">
                            Started
                        </p>

                        <p>
                            {task.hiredAt
                                ? new Date(task.hiredAt).toLocaleDateString()
                                : "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Completed
                        </p>

                        <p>
                            {task.completedAt
                                ? new Date(task.completedAt).toLocaleDateString()
                                : "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Worker
                        </p>

                        <p>
                            {task.assignedWorker?.name}
                        </p>
                    </div>

                </div>

            </div>

            <div className="bg-white border rounded-2xl p-6">

                <h2 className="text-xl font-semibold mb-5">
                    Write Review
                </h2>

                <select
                    value={rating}
                    onChange={(e) =>
                        setRating(e.target.value)
                    }
                    className="w-full border rounded-xl p-3 mb-4"
                >
                    <option value="">
                        Select Rating
                    </option>

                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>

                </select>

                <textarea
                    rows={5}
                    value={review}
                    onChange={(e) =>
                        setReview(e.target.value)
                    }
                    placeholder="Write your review"
                    className="w-full border rounded-xl p-3"
                />

                <button
                    className="mt-4 bg-teal-600 text-white px-5 py-3 rounded-xl"
                >
                    Submit Review
                </button>

            </div>

        </div>
    );
}