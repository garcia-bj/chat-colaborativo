"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al registrarse");
            }

            // Save token and redirect to chat
            localStorage.setItem("token", data.access_token);
            router.push("/chat");
        } catch (err: any) {
            setError(err.message || "Error al registrarse");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Panel - Register Form */}
            <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-primary via-primary/90 to-secondary">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo and Title */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center p-2">
                            <img src="/logo.jpg" alt="ColaboSim" className="h-full w-full object-contain" />
                        </div>
                        <h1 className="text-2xl font-bold text-white">ColaboSim</h1>
                    </div>

                    {/* Welcome Text */}
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-white">Crear Cuenta</h2>
                        <p className="text-white/80">Regístrate para comenzar a colaborar</p>
                    </div>

                    {/* Register Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        {/* Name Input */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                            </div>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Nombre completo"
                                value={formData.name}
                                onChange={handleChange}
                                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-white/40"
                                required
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                </svg>
                            </div>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={handleChange}
                                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-white/40"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                                </svg>
                            </div>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Contraseña (mínimo 6 caracteres)"
                                value={formData.password}
                                onChange={handleChange}
                                className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/15 focus:border-white/40"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white/80"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Register Button */}
                        <Button
                            type="submit"
                            className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-6 shadow-lg"
                            disabled={loading}
                        >
                            {loading ? "Registrando..." : "Crear Cuenta"}
                        </Button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-primary text-white/80">O regístrate con</span>
                            </div>
                        </div>

                        {/* Google Register Button */}
                        <Button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="w-full bg-white hover:bg-white/90 text-primary font-semibold py-6 shadow-lg"
                        >
                            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    fill="#1693A5"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="#45B5C4"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="#7ECECA"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="#A0DED6"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </Button>

                        {/* Login Link */}
                        <p className="text-center text-sm text-white/80 mt-6">
                            ¿Ya tienes una cuenta?{" "}
                            <a href="/login" className="text-white font-semibold hover:underline">
                                Inicia Sesión
                            </a>
                        </p>
                    </form>
                </div>
            </div>

            {/* Right Panel - Welcome Message */}
            <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-gradient-to-br from-accent/20 via-background to-muted/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,147,165,0.1),transparent_50%)]"></div>
                <div className="relative z-10 text-center space-y-6 max-w-lg">
                    <div className="mx-auto w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-16 h-16 text-primary"
                        >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <h2 className="text-5xl font-bold text-foreground">
                        Únete a<br />Nosotros.
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Colabora en tiempo real con tu equipo<br />
                        y lleva tus proyectos al siguiente nivel.
                    </p>
                </div>
            </div>
        </div>
    );
}
