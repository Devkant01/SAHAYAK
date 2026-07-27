import { useState } from "react";
import {
    Star,
    Send,
} from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RefreshToken } from "../../../utils/RefreshToken";

export default function ReviewForm({
    task,
    refetch,
}) {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");
    const [loading, setLoading] = useState(false);
    const accessToken = useSelector(state => state.user.accessToken);

    async function HandleSubmit(e, retried = false) {

        e.preventDefault();

        if (!rating) {
            alert("Please select a rating.");
            return;
        }

        try {

            setLoading(true);

            await axios.put(
                `/client/mark-task-completed/${task.task._id}`,
                {
                    rating,
                    review,
                },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );

            refetch();
        } catch (error) {
            if (error.response && error.response.status === 401 && !retried) {
                const newAccessToken = await RefreshToken(error);
                if (newAccessToken) {
                    await HandleSubmit(e, true);
                }
            }else
                console.error("Error submitting review:", error);
        }finally {
            setLoading(false);
        }

    }

    return (

        <section className="rounded-3xl border border-slate-200 bg-white shadow-lg">

            <div className="border-b border-slate-200 px-8 py-6">

                <h2 className="text-2xl font-bold text-slate-900">

                    Rate Your Experience

                </h2>

                <p className="mt-2 text-sm text-slate-500">

                    Your feedback helps other customers choose reliable workers.

                </p>

            </div>

            <form
                onSubmit={HandleSubmit}
                className="space-y-8 p-8"
            >

                <div>

                    <p className="mb-5 text-sm font-semibold uppercase tracking-wide text-slate-500">

                        Overall Rating

                    </p>

                    <div className="flex flex-wrap gap-3">

                        {
                            [1, 2, 3, 4, 5].map(value => (

                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setRating(value)}
                                    onMouseEnter={() => setHover(value)}
                                    onMouseLeave={() => setHover(0)}
                                    className="transition-transform hover:scale-110"
                                >

                                    <Star
                                        size={38}
                                        className={
                                            value <= (hover || rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-slate-300"
                                        }
                                    />

                                </button>

                            ))
                        }

                    </div>

                    <p className="mt-4 text-sm text-slate-500">

                        {
                            rating === 0 &&
                            "Select a rating"
                        }

                        {
                            rating === 1 &&
                            "Poor"
                        }

                        {
                            rating === 2 &&
                            "Fair"
                        }

                        {
                            rating === 3 &&
                            "Good"
                        }

                        {
                            rating === 4 &&
                            "Very Good"
                        }

                        {
                            rating === 5 &&
                            "Excellent"
                        }

                    </p>

                </div>

                <div>

                    <label className="mb-3 block text-sm font-semibold uppercase tracking-wide text-slate-500">

                        Review

                    </label>

                    <textarea
                        rows={6}
                        value={review}
                        maxLength={500}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Share your experience with this worker..."
                        className="
                            w-full
                            resize-none
                            rounded-2xl
                            border
                            border-slate-300
                            p-5
                            outline-none
                            transition
                            focus:border-teal-500
                            focus:ring-4
                            focus:ring-teal-100
                        "
                    />

                    <div className="mt-3 flex justify-end">

                        <span className="text-sm text-slate-400">

                            {review.length}/500

                        </span>

                    </div>

                </div>

                <div className="rounded-2xl bg-teal-50 p-5">

                    <h3 className="font-semibold text-teal-800">

                        Before submitting

                    </h3>

                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-teal-700">

                        <li>Review the completed work carefully.</li>

                        <li>Your rating becomes visible to future clients.</li>

                        <li>Reviews cannot be edited after submission.</li>

                    </ul>

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-2xl
                        bg-gradient-to-r
                        from-teal-600
                        to-emerald-600
                        px-6
                        py-4
                        font-semibold
                        text-white
                        transition
                        hover:from-teal-700
                        hover:to-emerald-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >

                    <Send size={18} />

                    {
                        loading
                            ? "Submitting..."
                            : "Submit Review"
                    }

                </button>

            </form>

        </section>

    );

}