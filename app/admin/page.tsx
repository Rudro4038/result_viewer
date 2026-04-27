"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRole } from "@/context/role-context";

export default function AdminPage() {
  const router = useRouter();
  const { role } = useRole();

  useEffect(() => {
    if (!role) {
      router.replace("/login");
      return;
    }

    if (role !== "admin") {
      router.replace("/user");
    }
  }, [role, router]);

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p>You are viewing the admin route.</p>
    </main>
  );
}