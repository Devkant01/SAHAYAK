import useMyTasks from "../hooks/useMyTasks";

import TasksHeader from "../components/my-tasks/TasksHeader";
import TaskStats from "../components/my-tasks/TaskStats";
import TaskFilters from "../components/my-tasks/TaskFilters";
import TaskList from "../components/my-tasks/TaskList";

export default function MyTasks() {

    const {
        Loading,
        Stats,
        Tasks,
        Filter,
        setFilter
    } = useMyTasks();

    return (
        <main className="min-h-screen bg-gray-50">

            <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">

                <TasksHeader
                    Total={
                        Stats?.total || 0
                    }
                />

                <TaskStats
                    Loading={Loading}
                    Stats={Stats}
                />

                <TaskFilters
                    Stats={Stats}
                    Filter={Filter}
                    SetFilter={setFilter}
                />

                <TaskList
                    Loading={Loading}
                    Tasks={Tasks}
                />

            </div>

        </main>
    );
}