import { useSelector } from "react-redux";
import ClientDashboard from "../components/dashboard/client/ClientDashboard";
import WorkerDashboard from "../components/dashboard/worker/WorkerDashboard";
export default function Dashboard() {

  const role = useSelector(
    state => state.user.userRole
  );
  return (
    <>
      {role === "client" ? (
        <ClientDashboard />
      ) : (
        <WorkerDashboard />
      )}
    </>
  );
}