"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Users,
  ShoppingCart,
  UserPlus,
  Package,
  Settings,
  LifeBuoy,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { logoutUser } from "@/app/lib/auth";
import { cn } from "@/app/lib/utils";
import { Button } from "@/components/ui/button";

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);
  }, []);

  return (
    <div className="hidden border-r bg-muted/40 lg:block lg:w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Image
              src="ovelinkfondo.png"
              alt="Logo Ovelink"
              width={120}
              height={40}
            />
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/" && "bg-muted text-primary"
              )}
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/clients"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/clients" && "bg-muted text-primary"
              )}
            >
              <Users className="h-4 w-4" />
              Clientes
            </Link>
            <Link
              href="/dashboard/ventas"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/ventas" && "bg-muted text-primary"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              Ventas
            </Link>
            {/* ✅ Mostrar solo si el rol es ADMIN */}
            {role === "ROLE_ADMIN" && (
              <Link
                href="/dashboard/users"
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === "/users" && "bg-muted text-primary"
                )}
              >
                <Users className="h-4 w-4" />
                Usuarios
              </Link>
            )}

            <Link
              href="/dashboard/services"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/services" && "bg-muted text-primary"
              )}
            >
              <Package className="h-4 w-4" />
              Servicios
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <nav className="grid items-start gap-2 text-sm font-medium">
            <Link
              href="/dashboard/settings"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/settings" && "bg-muted text-primary"
              )}
            >
              <Settings className="h-4 w-4" />
              Configuración
            </Link>
            <Link
              href="/dashboard/help"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                pathname === "/help" && "bg-muted text-primary"
              )}
            >
              <LifeBuoy className="h-4 w-4" />
              Ayuda
            </Link>
            <Button
              onClick={logoutUser}
              variant="ghost"
              className="flex items-center gap-3 w-full justify-start text-muted-foreground hover:text-primary"
            >
              <LogOut className="h-4 w-4" />
              Cerrar sesión
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}
