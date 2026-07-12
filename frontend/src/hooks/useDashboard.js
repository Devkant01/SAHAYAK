import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    GetDashboardData,
    // GetDashboardStats,
    // GetActiveTasks,
    // GetTopRatedHelpers,
    // GetEmergencyServices
} from "../services/dashboardService";

export default function useDashboard() {

    const [Loading, setLoading] = useState(true);

    const [Stats, setStats] = useState([]);
    const [Tasks, setTasks] = useState([]);
    const [Helpers, setHelpers] = useState([]);
    const [Services, setServices] = useState([]);

    const AccessToken = useSelector(
        state => state.user.accessToken
    );

    useEffect(() => {
        FetchDashboard();
    }, []);

    async function FetchDashboard() {
        try {
            const res = await GetDashboardData(AccessToken);
            console.log("Dashboard data fetched successfully", res.data);
            console.log("Dashboard data fetched successfully", res.data.data);
            const {
                Stats,
                Tasks,
                Helpers,
                Services
            } = res.data.data;

            setStats(Stats);
            setTasks(Tasks);
            setHelpers(Helpers);
            setServices(Services);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return {
        Loading,
        Stats,
        Tasks,
        Helpers,
        Services
    };
}