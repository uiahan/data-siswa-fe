import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/login.page";
import RegisterPage from "../pages/auth/register.page";
import DashboardLayout from "../layouts/dashboard.layout";
import Dashboard from "../pages/dashboard/dashboard.page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;