"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 p-6">{children}</div>
      </div>
    </AuthGuard>
  );
}
