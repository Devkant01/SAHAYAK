import { TriangleAlert } from "lucide-react";

export default function ErrorState({
    message,
    onRetry,
}) {

    return (

        <div className="max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">

            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600">

                <TriangleAlert size={30} />

            </div>

            <h2 className="text-2xl font-bold">
                Something went wrong
            </h2>

            <p className="mt-3 text-slate-500">
                {message}
            </p>

            <button
                onClick={onRetry}
                className="mt-8 rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white transition hover:bg-teal-700"
            >
                Try Again
            </button>

        </div>

    );

}