import { useClientMyTasks } from "../../../hooks/useMyTasks";

import TasksHeader from "./TasksHeader";
import TaskStats from "./TaskStats";
import TaskFilters from "./TaskFilters";
import TaskList from "./TaskList";

export default function ClientMyTasks() {

    const {
        Loading,
        Stats,
        Tasks,
        Filter,
        setFilter
    } = useClientMyTasks();

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