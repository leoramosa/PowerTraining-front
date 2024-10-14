
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import React from 'react';
import Link from 'next/link';

// Registramos los elementos necesarios para las barras verticales
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

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
    <Link href="/dashboard/admin/progress">
      <div className="bg-white shadow-lg rounded-lg p-5">
        <p className="text-black text-2xl mb-5">Users Goal Progress</p>
        <Bar
          data={{
            labels: userProgressData.map(user => user.name),
            datasets: [
              {
                label: 'Progress',
                data: userProgressData.map(user => user.progress),
                backgroundColor: userProgressData.map(user => getColorBasedOnProgress(user.progress)),
                borderColor: userProgressData.map(user => getColorBasedOnProgress(user.progress)),
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
              },
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `${tooltipItem.label}: ${tooltipItem.raw}%`;
                  },
                },
              },
            },
          }}
        />
      </div>
    </Link>
  );
};

export default DashboardUserProgress;