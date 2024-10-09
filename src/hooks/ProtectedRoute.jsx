import { Navigate, Outlet } from "react-router-dom";
import useAuth from './useAuth'

export default function ProtectedRoute() {
    const user = useAuth();

    if (!user.token) return <Navigate to="/login" />;
    return <Outlet />;
};