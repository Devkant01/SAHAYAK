import TaskCard from "./TaskCard";

function TaskSkeleton() {

    return (
        <div className="h-64 rounded-2xl bg-gray-100 animate-pulse" />
    );
}

function EmptyState() {

    return (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

            <h3 className="text-xl font-semibold text-gray-900">
                No Tasks Found
            </h3>

            <p className="mt-2 text-gray-500">
                No tasks match the selected filter.
            </p>

        </div>
    );
}

export default function TaskList({
    Loading,
    Tasks
}) {

    if (Loading) {

        return (
            <section className="grid">

                {Array.from({
                    length: 6
                }).map((_, Index) => (
                    <TaskSkeleton
                        key={Index}
                    />
                ))}

            </section>
        );
    }

    if (!Tasks?.length) {
        return <EmptyState />;
    }

    return (
        <section className="grid gap-5">

            {Tasks.map((Task) => (

                <TaskCard
                    key={Task._id}
                    Task={Task}
                />

            ))}

        </section>
    );
}