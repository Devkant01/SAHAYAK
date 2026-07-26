import ClientCard from "./ClientCard";
import TaskInfoCard from "./TaskInfoCard";
import ActionCard from "./ActionCard";

export default function InProgressSection({
    Task,
    Client,
    refetch,
}) {

    return (
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            <div className="xl:col-span-2 space-y-6">

                <TaskInfoCard
                    Task={Task}
                    Client={Client}
                />

            </div>

            <div className="space-y-6">

                <ClientCard
                    Client={Client}
                />

                <ActionCard
                    Task={Task}
                    refetch={refetch}
                />

            </div>

        </section>
    );
}