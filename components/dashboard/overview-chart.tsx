"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { getVentasMensuales } from "@/app/lib/ventas";

const monthLabels: { [key: string]: string } = {
  "01": "Ene",
  "02": "Feb",
  "03": "Mar",
  "04": "Abr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Ago",
  "09": "Sep",
  "10": "Oct",
  "11": "Nov",
  "12": "Dic",
};

export function Overview() {
  const [data, setData] = useState<{ name: string; total: number }[]>([]);

  useEffect(() => {
    getVentasMensuales()
      .then((res) => {
        console.log("📊 Ventas mensuales recibidas:", res); // 👈 AGREGÁ ESTO

        const parsed = Object.entries(res)
          .map(([key, total]) => {
            const [year, month] = key.split("-");
            return {
              name: `${monthLabels[month]} ${year}`, // Ej: "Abr 2025"
              total: Math.round(Number(total)),
            };
          })
          .sort(
            (a, b) => new Date(a.name).getTime() - new Date(b.name).getTime()
          );

        setData(parsed);
      })
      .catch(console.error);
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" barSize={100} fill="#000" />
      </BarChart>
    </ResponsiveContainer>
  );
}
