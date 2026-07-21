export default function WorkersGrid({
    workers,
    taskId,
    refetch,
}) {

    return (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {
                workers.map(worker => (

                    <WorkerCard
                        key={worker._id}
                        worker={worker}
                        taskId={taskId}
                        refetch={refetch}
                    />

                ))
            }

        </div>

    );

}