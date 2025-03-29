"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils" 

export function MainNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      active: pathname === "/",
    },

    {
      href: "/clients",
      label: "Clientes",
      active: pathname === "/clients",
    },

    {
      href: "/ventas", // <--- esto debe decir "ventas"
      label: "Ventas",
      active: pathname === "/ventas",
    },
    
    
    {
      href: "/leads",
      label: "Leads",
      active: pathname === "/leads",
    },
    {
      href: "/users",
      label: "Usuarios",
      active: pathname === "/users",
    },
    {
      href: "/services",
      label: "Servicios",
      active: pathname === "/services",
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active ? "text-primary" : "text-muted-foreground",
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}

