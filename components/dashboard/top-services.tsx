"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"

const data = [
  {
    name: "Consultoría",
    value: 45000,
  },
  {
    name: "Desarrollo Web",
    value: 38000,
  },
  {
    name: "Marketing",
    value: 32000,
  },
  {
    name: "Soporte Técnico",
    value: 25000,
  },
  {
    name: "Capacitación",
    value: 18000,
  },
]

export function TopServices() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} layout="vertical">
        <XAxis type="number" fontSize={12} tickFormatter={(value) => `$${value / 1000}k`} />
        <YAxis dataKey="name" type="category" fontSize={12} width={100} />
        <Tooltip
          formatter={(value) => [`$${value.toLocaleString()}`, "Ingresos"]}
          labelFormatter={(label) => `Servicio: ${label}`}
        />
        <Legend />
        <Bar dataKey="value" name="Ingresos" fill="#8884d8" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

