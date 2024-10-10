import { Navigate, Outlet } from "react-router-dom";
import useAuth from './useAuth'
import Sidebar from "../../components/layout/Sidebar";

export default function ProtectedRoute() {
    const user = useAuth();

    if (!user.token) return <Navigate to="/login" />;
    
    return (
        <>
            <Sidebar/>
            <Outlet />
        </>
    );
};