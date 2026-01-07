import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (res) => {
            alert("Login berhasil");
            localStorage.setItem("token", res.token);
            navigate("/dashboard");
        },
        onError: (error) => {
            alert(error.response?.data?.message);
        },
    });

    const onSubmit = (values) => {
        loginMutation.mutate(values);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-blue-500 to-purple-500 relative overflow-hidden">

            <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-md p-8 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">

                <h1 className="text-3xl font-bold text-white text-center mb-2">
                    Selamat Datang 👋
                </h1>
                <p className="text-white/80 text-center mb-8">
                    Login untuk mengelola data siswa
                </p>

                <form className="space-y-5 mb-2" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm text-white/80 mb-1">
                            Email
                        </label>
                        <input
                            {...register("email", { required: "Email wajib diisi" })}
                            type="email"
                            placeholder="admin@sekolah.id"
                            className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                        />
                        { errors.email && <small className="text-red-300">{errors.email.message}</small> }
                    </div>

                    <div>
                        <label className="block text-sm text-white/80 mb-1">
                            Password
                        </label>
                        <input
                            {...register("password", { required: "Password wajib diisi" })}
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-xl bg-white/30 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-white/60"
                        />
                        { errors.password && <small className="text-red-300">{errors.password.message}</small> }
                    </div>

                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full py-2 rounded-xl bg-white text-indigo-600 cursor-pointer font-semibold hover:bg-white/90 transition"
                    >
                        {loginMutation.isPending ? "Loading..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-sm text-white/80 mt-6">
                    Belum punya akun?{" "}
                    <Link to="/register" className="font-semibold underline hover:text-white">
                        Register
                    </Link>
                </p>

                <p className="text-center text-sm text-white/70 mt-5">
                    © {new Date().getFullYear()} Sistem Informasi Siswa
                </p>
            </div>
        </div>
    );
};

export default LoginPage;