import type React from "react";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Providers } from "@/components/providers";
import type { Metadata } from "next"; // Importa Metadata

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}