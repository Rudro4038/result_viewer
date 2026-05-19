"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/context/role-context";

export default function Home() {
    const router = useRouter();
    const { role } = useRole();

    useEffect(() => {
        if (!role) {
            router.replace("/login");
            return;
        }

        router.replace(role === "admin" ? "/admin" : "/user");
    }, [role, router]);

    return <h1 className="p-6 text-xl">Redirecting...</h1>;
}
