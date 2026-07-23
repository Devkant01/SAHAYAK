import HeroSection from "./HeroSection";
import StatsSection from "./StatsSection";
import ActiveTasks from "./ActiveTasks";
import TopRatedHelpers from "./TopRatedHelpers";
import EmergencyServices from "./EmergencyServices";

import { useClientDashboard } from "../../../hooks/useDashboard";

export default function Dashboard() {

    const {
        Loading,
        Stats,
        Tasks,
        Helpers,
        Services
    } = useClientDashboard();

    return (
        <main className="min-h-screen bg-gray-50">

            <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 space-y-8">

                <HeroSection />

                <StatsSection
                    Loading={Loading}
                    Stats={Stats}
                />

                <ActiveTasks
                    Loading={Loading}
                    Tasks={Tasks}
                />

                <TopRatedHelpers
                    Loading={Loading}
                    Helpers={Helpers}
                />

                <EmergencyServices
                    Loading={Loading}
                    Services={Services}
                />

            </div>

        </main>
    );
}