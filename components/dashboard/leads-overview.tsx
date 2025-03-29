"use client"
// COMPONENTE DE METRICAS DE LEADS

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "Redes Sociales", value: 40, color: "#8884d8" },
  { name: "Sitio Web", value: 30, color: "#82ca9d" },
  { name: "Referidos", value: 15, color: "#ffc658" },
  { name: "Email", value: 10, color: "#ff8042" },
  { name: "Otros", value: 5, color: "#0088fe" },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

export function LeadsOverview() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
        <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, "Porcentaje"]} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

