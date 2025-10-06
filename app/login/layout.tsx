// ✅ app/login/layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login - Ovelink CRM",
  description: "Pantalla de acceso al CRM multitenant",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className={inter.className}>{children}</main>;
}
