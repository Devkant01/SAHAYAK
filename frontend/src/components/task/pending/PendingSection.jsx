import RecommendedWorkers from "./RecommendedWorkers";

export default function PendingSection({
    task,
    refetch,
}) {

    return (

        <section className="space-y-8">

            <div className="rounded-3xl border border-teal-100 bg-gradient-to-r from-teal-50 to-white p-8 shadow-sm">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h2 className="text-3xl font-bold text-slate-900">
                            Workers Near You
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Hire a trusted professional for your task.
                            Compare ratings, experience and distance before hiring.
                        </p>

                    </div>

                    <div className="rounded-2xl bg-teal-100 px-5 py-3">

                        <p className="text-sm font-semibold text-teal-700">
                            {
                                task.recommendedWorkers?.length || 0
                            } Available Workers
                        </p>

                    </div>

                </div>

            </div>

            <RecommendedWorkers
                workers={task.recommendedWorkers}
                taskId={task.task._id}
                refetch={refetch}
            />

        </section>

    );

}