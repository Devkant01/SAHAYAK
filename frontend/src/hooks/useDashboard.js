import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    GetClientDashboardData,
    GetWorkerDashboardData,
    // GetDashboardStats,
    // GetActiveTasks,
    // GetTopRatedHelpers,
    // GetEmergencyServices
} from "../services/dashboardService";

export function useClientDashboard() {

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
            const res = await GetClientDashboardData(AccessToken);
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


export function useWorkerDashboard() {

    const [Loading, setLoading] = useState(true);

    const [Stats, setStats] = useState({});
    const [AssignedTasksData, setAssignedTasksData] = useState([]);
    const [CompletedTasksData, setCompletedTasksData] = useState([]);

    const AccessToken = useSelector(
        state => state.user.accessToken
    );

    useEffect(() => {
        FetchDashboard();
    }, []);

    async function FetchDashboard() {
        try {

            const res = await GetWorkerDashboardData(AccessToken);

            const {
                Stats,
                AssignedTasks,
                CompletedTasks,
            } = res.data.data;

            setStats(Stats);
            setAssignedTasksData(AssignedTasks);
            setCompletedTasksData(CompletedTasks);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    }

    return {
        Loading,
        Stats,
        AssignedTasksData,
        CompletedTasksData,
    };
}