import HeroSection from "../components/dashboard/HeroSection";
import StatsSection from "../components/dashboard/StatsSection";
import ActiveTasks from "../components/dashboard/ActiveTasks";
import TopRatedHelpers from "../components/dashboard/TopRatedHelpers";
import EmergencyServices from "../components/dashboard/EmergencyServices";

import useDashboard from "../hooks/useDashboard";

export default function Dashboard() {

  const {
    Loading,
    Stats,
    Tasks,
    Helpers,
    Services
  } = useDashboard();

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