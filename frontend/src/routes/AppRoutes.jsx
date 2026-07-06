import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import PublishTask from "../pages/PublishTask";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Loader from "../components/Loader";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AppRoutes() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const authLoading = useSelector(
        (state) => state.user.authLoading
    );

    if (authLoading) {
        return <Loader />;
    }
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={isAuthenticated
                    ? <Navigate to="/dashboard" replace />
                    : <Home />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                
                //specific to client
                <Route element={<ClientRoute />}>
                    <Route path="/publish-task" element={<PublishTask />} />
                </Route>

                //specific to worker
            </Route>

            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
        </Routes>
    );
}

function ProtectedRoute() {
    const user = useSelector((state) => state.user);
    console.log("protected route:",user);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    console.log("ProtectedRoute: isAuthenticated =", isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

function ClientRoute() {
    const userRole = useSelector((state) => state.user.userRole); //add toast: you are not authorized to access this page
    console.log("ClientRoute: userRole =", userRole);
    return userRole === "client" ? <Outlet /> : <Navigate to="/login?role=client" replace />;
}

function HomeRedirect() {
    const isAuthenticated = useSelector(
        (state) => state.user.isAuthenticated
    );

    return isAuthenticated
        ? <Navigate to="/dashboard" replace />
        : <Home />;
}

export default AppRoutes;