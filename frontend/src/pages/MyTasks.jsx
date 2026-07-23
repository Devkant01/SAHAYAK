import ClientMyTasks from "../components/my-tasks/client/ClientMyTask";
import WorkerMyTasks from "../components/my-tasks/worker/WorkerMyTask";
import { useSelector } from "react-redux";

export default function MyTasks() {
    const role = useSelector((state) => state.user.userRole);

    return (
        <>
            {role === "client" ? (
                <ClientMyTasks />
            ) : (
                <WorkerMyTasks />
            )}
        </>
    );
}