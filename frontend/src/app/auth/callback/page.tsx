"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function CallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("token", token);
            router.push("/chat");
        } else {
            router.push("/login");
        }
    }, [searchParams, router]);

    return (
        <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
            <p>Autenticando...</p>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={<div>Cargando...</div>}>
            <CallbackContent />
        </Suspense>
    );
}
