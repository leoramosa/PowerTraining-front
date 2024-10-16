import React from 'react';
import Link from 'next/link';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// Definición del tipo de datos de progreso del usuario
interface UserProgress {
  id: number;
  name: string;
  goal: string;
  progress: number;
}

// Datos de progreso mockeados
const userProgressData: UserProgress[] = [
  { id: 1, name: 'John Doe', goal: 'Lose Weight', progress: 75 },
  { id: 2, name: 'Jane Smith', goal: 'Build Muscle', progress: 50 },
  { id: 3, name: 'Alex Johnson', goal: 'Increase Endurance', progress: 20 },
  { id: 4, name: 'Samuel Green', goal: 'Run a Marathon', progress: 85 },
  { id: 5, name: 'Emily Davis', goal: 'Reduce Stress', progress: 40 },
  { id: 6, name: 'Michael Brown', goal: 'Improve Balance', progress: 60 },
  { id: 7, name: 'Jessica Taylor', goal: 'Improve Flexibility', progress: 90 },
  { id: 8, name: 'Daniel Wilson', goal: 'Improve Balance', progress: 70 },
];

// Función para determinar el color según el progreso
const getColorBasedOnProgress = (progress: number) => {
  if (progress < 30) return '#ff4d4d'; // Rojo para <30%
  if (progress >= 30 && progress <= 70) return '#ffcc00'; // Amarillo para 30%-70%
  return '#4caf50'; // Verde para >70%
};

const DashboardUserProgress: React.FC = () => {
  return (
    <Link href="/dashboard/progress">
      <div className="bg-white shadow-lg rounded-lg p-5">
        <p className="text-black text-2xl mb-5">Users Goal Progress</p>

        {/* Responsive container to ensure it adjusts to the size */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userProgressData}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value: number) => `${value}%`}
              labelFormatter={(name: string) => `User: ${name}`}
            />
            <Bar dataKey="progress">
              {/* For each bar, set its color based on the progress */}
              {userProgressData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColorBasedOnProgress(entry.progress)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
};

export default DashboardUserProgress;
