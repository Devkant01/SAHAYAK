import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import AssignedTasks from "./AssignedTasks";
import CompletedTasks from "./CompletedTasks";

import { useWorkerDashboard } from "../../../hooks/useDashboard";

export default function Dashboard() {

    const {
        Loading,
        Stats,
        AssignedTasksData,
        CompletedTasksData,
    } = useWorkerDashboard();

    return (
        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 space-y-8">

                <HeroSection />

                <StatsSection
                    Loading={Loading}
                    Stats={Stats}
                />

                <AssignedTasks
                    Loading={Loading}
                    Tasks={AssignedTasksData}
                />

                <CompletedTasks
                    Loading={Loading}
                    Tasks={CompletedTasksData}
                />

            </div>

        </main>
    );
}