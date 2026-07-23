import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../Button";
import { useSelector } from "react-redux";

export default function TasksHeader({
    Total
}) {
    const role = useSelector((state) => state.user.userRole);
    return (
        <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

            <div>

                <div className="flex items-center gap-3">

                    <h1 className="text-3xl font-bold text-gray-900">
                        My Tasks
                    </h1>

                    {/* <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                        {Total}
                    </span> */}

                </div>

                <p className="mt-2 text-gray-500">
                    {role === "client" ? "Track, manage, and monitor all your service requests." : "Track and manage your assigned work."}
                </p>

            </div>

            {role == "client" && (
                <Link to="/publish-task">
                    <Button className="px-5 py-3 font-semibold text-xl">
                        <Plus size={18} />
                        Create New Task
                    </Button>
                </Link>
            )}

        </section >
    );
}