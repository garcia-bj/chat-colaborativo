"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
    const handleLogin = () => {
        window.location.href = "http://localhost:3000/auth/google";
    };

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-xl border-border/50 bg-card/95 backdrop-blur-sm">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-6 w-6 text-primary"
                        >
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                    </div>
                    <CardTitle className="text-3xl font-bold tracking-tight text-primary">
                        Chat Colaborativo
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                        Bienvenido de nuevo. Inicia sesión para continuar.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 pt-4">
                    <Button
                        onClick={handleLogin}
                        className="w-full py-6 text-base font-medium transition-all hover:scale-[1.02]"
                        size="lg"
                    >
                        <svg
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fab"
                            data-icon="google"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 488 512"
                        >
                            <path
                                fill="currentColor"
                                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                            ></path>
                        </svg>
                        Iniciar sesión con Google
                    </Button>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-xs text-muted-foreground">
                        Acceso seguro y protegido
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
