import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const userProgressData = [
  { name: "John Doe", progress: 75 },
  { name: "Jane Smith", progress: 50 },
  { name: "Alex Johnson", progress: 20 },
  { name: "Samuel Green", progress: 85 },
  { name: "Emily Davis", progress: 40 },
  { name: "Michael Brown", progress: 60 },
  { name: "Jessica Taylor", progress: 30 },
  { name: "Jessica Taylor", progress: 90 },
  { name: "Jessica Taylor", progress: 90 },
];

const DashboardUserProgress: React.FC = () => {
  // Función para determinar el color basado en el porcentaje
  const getBarColor = (progress: number) => {
    if (progress >= 75) return "#4caf50"; // Verde para 75% o más
    if (progress >= 50) return "#ffcc00"; // Amarillo para 50% o más
    return "#fd7323"; // Rojo para menos de 50%
  };

  return (
    <div style={{ width: "100%", margin: "0 auto", color: "black" }}>
      <h3>Users Goal Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={userProgressData} className="text-white">
          <CartesianGrid strokeDasharray="3 3" className="text-white" />
          <XAxis dataKey="name" />
          <YAxis ticks={[0, 25, 50, 75, 100]} />
          <Tooltip />
          <Bar
            dataKey="progress"
            barSize={50}
            color="#4caf50"
            className="text-white"
          >
            {userProgressData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.progress)} /> // Aplicar color condicional
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardUserProgress;
