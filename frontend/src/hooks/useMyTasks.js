import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RefreshToken } from "../utils/RefreshToken";

import {
    GetClientMyTasks,
    GetWorkerMyTasks
} from "../services/myTaskService";

export function useClientMyTasks() {

    const AccessToken =
        useSelector(
            State => State.user.AccessToken
        );

    const [Loading, setLoading] =
        useState(true);

    const [Stats, setStats] =
        useState(null);

    const [Tasks, setTasks] =
        useState([]);

    const [Filter, setFilter] =
        useState("all");

    useEffect(() => {
        FetchTasks();
    }, []);

    async function FetchTasks() {

        try {

            const Response =
                await GetClientMyTasks(
                    AccessToken
                );

            setStats(
                Response.data.stats
            );

            setTasks(
                Response.data.tasks
            );
            console.log("Fetched tasks:", Response.data);
        } catch (err) {
            console.log(err);
        }

        finally {
            setLoading(false);
        }
    }

    const FilteredTasks =
        Filter === "all"
            ? Tasks
            : Tasks.filter(
                Task =>
                    Task.status ===
                    Filter
            );

    return {
        Loading,

        Stats,

        Tasks:
            FilteredTasks,

        Filter,

        setFilter
    };
}

export function useWorkerMyTasks() {

    const AccessToken =
        useSelector(
            State => State.user.AccessToken
        );

    const [Loading, setLoading] =
        useState(true);

    const [Stats, setStats] =
        useState(null);

    const [Tasks, setTasks] =
        useState([]);

    const [Filter, setFilter] =
        useState("all");

    useEffect(() => {
        FetchTasks();
    }, []);

    async function FetchTasks() {

        try {

            const Response =
                await GetWorkerMyTasks(
                    AccessToken
                );

            setStats(
                Response.data.stats
            );

            setTasks(
                Response.data.tasks
            );
            console.log("Fetched tasks:", Response.data);
        } catch (err) {
            console.log(err);
        }

        finally {
            setLoading(false);
        }
    }

    const FilteredTasks =
        Filter === "all"
            ? Tasks
            : Tasks.filter(
                Task =>
                    Task.status ===
                    Filter
            );

    return {
        Loading,

        Stats,

        Tasks:
            FilteredTasks,

        Filter,

        setFilter
    };
}