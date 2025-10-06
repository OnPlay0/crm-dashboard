"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/app/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/clients",
      label: "Clientes",
      active: pathname === "/dashboard/clients",
    },
    {
      href: "/dashboard/ventas",
      label: "Ventas",
      active: pathname === "/dashboard/ventas",
    },
    {
      href: "/dashboard/users",
      label: "Usuarios",
      active: pathname === "/dashboard/users",
    },
    {
      href: "/dashboard/services",
      label: "Servicios",
      active: pathname === "/dashboard/services",
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
