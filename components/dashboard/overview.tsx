"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Ene",
    total: 18000,
  },
  {
    name: "Feb",
    total: 22000,
  },
  {
    name: "Mar",
    total: 30000,
  },
  {
    name: "Abr",
    total: 25000,
  },
  {
    name: "May",
    total: 32000,
  },
  {
    name: "Jun",
    total: 28000,
  },
  {
    name: "Jul",
    total: 35000,
  },
  {
    name: "Ago",
    total: 42000,
  },
  {
    name: "Sep",
    total: 38000,
  },
  {
    name: "Oct",
    total: 45000,
  },
  {
    name: "Nov",
    total: 50000,
  },
  {
    name: "Dic",
    total: 65000,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Ventas"]} labelFormatter={(label) => `Mes: ${label}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

