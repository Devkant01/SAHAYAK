import axios from "axios";
import { useSelector } from "react-redux";
import { RefreshToken } from "../utils/RefreshToken";

export async function GetClientDashboardData(
    AccessToken,
    Retried = false
) {
    try {
        return axios.get("/client/dashboardStats", {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            }
        });
    } catch (err) {
        if (err.response?.status === 401 && !Retried) {
            const newAccessToken = await RefreshToken(err);
            return GetClientDashboardData(newAccessToken, true);
        } else
            throw err;
    }
}

export async function GetWorkerDashboardData(
    AccessToken,
    Retried = false
) {
    try {
        return axios.get("/worker/dashboardStats", {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            }
        });
    } catch (err) {
        if (err.response?.status === 401 && !Retried) {
            const newAccessToken = await RefreshToken(err);
            return GetWorkerDashboardData(newAccessToken, true);
        } else
            throw err;
    }
}

export async function GetDashboardStats() {
    return axios.get("/dashboard/stats");
}

export async function GetActiveTasks() {
    return axios.get("/tasks/active");
}

export async function GetTopRatedHelpers() {
    return axios.get("/workers/top-rated");
}

export async function GetEmergencyServices() {
    return axios.get("/services/emergency");
}