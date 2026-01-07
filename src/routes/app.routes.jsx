import { Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/login.page";
import RegisterPage from "../pages/auth/register.page";
import DashboardLayout from "../layouts/dashboard.layout";
import DashboardPage from "../pages/dashboard/dashboard.page";
import AuthGuard from "./auth-guard";
import JurusanPage from "../pages/dashboard/jurusan.page";
import KelasPage from "../pages/dashboard/kelas.page";
import SiswaPage from "../pages/dashboard/siswa.page";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<AuthGuard />}>
                <Route element={<DashboardLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/jurusan" element={<JurusanPage />} />
                    <Route path="/kelas" element={<KelasPage />} />
                    <Route path="/siswa" element={<SiswaPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes;