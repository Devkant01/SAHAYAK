import {
    Users,
    Eye,
    BadgeIndianRupee,
    Calendar
} from "lucide-react";

export default function TaskStatsGrid({
    task
}) {
    return (
        <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl border p-5">
                <Users />
                <p className="text-sm text-gray-500 mt-2">
                    Nearby Workers
                </p>
                <h3 className="text-xl font-bold">
                    {task.stats?.nearbyWorkers || 0}
                </h3>
            </div>

            <div className="bg-white rounded-2xl border p-5">
                <Eye />
                <p className="text-sm text-gray-500 mt-2">
                    Views
                </p>
                <h3 className="text-xl font-bold">
                    {task.stats?.views || 0}
                </h3>
            </div>

            <div className="bg-white rounded-2xl border p-5">
                <BadgeIndianRupee />
                <p className="text-sm text-gray-500 mt-2">
                    Budget
                </p>
                <h3 className="text-xl font-bold">
                    ₹{task.budget}
                </h3>
            </div>

            <div className="bg-white rounded-2xl border p-5">
                <Calendar />
                <p className="text-sm text-gray-500 mt-2">
                    Created
                </p>
                <h3 className="text-xl font-bold">
                    {new Date(task.createdAt)
                        .toLocaleDateString()}
                </h3>
            </div>

        </div>
    );
}