/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import { getUserRoutines } from '@/Services/getUserRoutines';
import ButtonApp from "@/components/buttons/ButtonApp/ButtonApp";
import { useAuthStore } from '@/stores/userAuthStore';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ClientProgress: React.FC = () => {
  const [userRoutines, setUserRoutines] = useState<any[]>([]);
  const [showCharts, setShowCharts] = useState(false); // Estado para manejar la vista de gráficos
  const { user } = useAuthStore(); // Obtener el usuario autenticado

  useEffect(() => {
    const fetchUserRoutines = async () => {
      if (user?.id) { // Si el usuario está logueado
        try {
          const routines = await getUserRoutines(user.id); // Llamada al servicio con el userId
          setUserRoutines(routines);
        } catch (error) {
          console.error("Error fetching routines:", error);
        }
      }
    };

    fetchUserRoutines(); // Ejecutamos la llamada cuando el componente se monta
  }, [user?.id]); // Se ejecuta cuando hay un cambio en el userId

  const toggleView = () => {
    setShowCharts(!showCharts); // Cambia entre mostrar o no los gráficos tipo dona
  };

  const completedDays = userRoutines.reduce((acc, routine) => {
    const completedTrainingDays = routine.trainingDays.filter((day: any) =>
      day.exercises.every((exercise: any) => exercise.completed)
    ).length;
    return acc + completedTrainingDays;
  }, 0);

  const totalDays = userRoutines.reduce((acc, routine) => acc + routine.trainingDays.length, 0);

  const routineProgress = userRoutines
    .filter(routine => routine.trainingDays.length > 0) // Filtrar rutinas vacías
    .map((routine) => {
      const totalTrainingDays = routine.trainingDays.length;
      const completedTrainingDays = routine.trainingDays.filter((day: any) =>
        day.exercises.every((exercise: any) => exercise.completed)
      ).length;
      const progress = totalTrainingDays > 0 ? Math.round((completedTrainingDays / totalTrainingDays) * 100) : 0; // Progreso por rutina
      return { name: routine.name, progress };
    });

  if (userRoutines.length === 0) {
    return (
      <div className="h-auto bg-white shadow-lg rounded-lg mt-5 p-5">
        <p className="text-black text-2xl">No training routines found for this user.</p>
      </div>
    );
  }

  return (
    <div className="h-auto bg-white shadow-lg rounded-lg mt-5 p-5">
      <div className="flex justify-between items-center mb-5">
        <p className="text-black text-2xl">Your Training Progress</p>
        <ButtonApp 
          variant="login"
          onClick={toggleView}
        >
          View Progress By Charts
        </ButtonApp>
      </div>

      {totalDays === 0 || completedDays === 0 ? (
        <p className="text-center text-lg text-red-500">No progress made yet. Start completing your training days!</p>
      ) : (
        <>
          {/* Gráficos alineados horizontalmente */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
            {/* Primer gráfico: Días totales vs. Días completados */}
            <div>
              <p className="text-xl text-center mb-3">Total Training Days</p>
              <Bar
                data={{
                  labels: ['Total Training Days'],
                  datasets: [
                    {
                      label: 'Progress',
                      data: [totalDays],
                      backgroundColor: ['#ffc451'],
                      borderColor: ['#f9911e'],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: totalDays,
                    },
                  },
                }}
              />
            </div>

            {/* Segundo gráfico: Días completados */}
            <div>
              <p className="text-xl text-center mb-3">Completed Days</p>
              <Bar
                data={{
                  labels: ['Completed Days'],
                  datasets: [
                    {
                      label: 'Progress',
                      data: [completedDays],
                      backgroundColor: ['#ffc451'],
                      borderColor: ['#f9911e'],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  scales: {
                    y: {
                      beginAtZero: true,
                      max: totalDays,
                    },
                  },
                }}
              />
            </div>

            {/* Progreso por rutina */}
            <div>
              <p className="text-xl text-center mb-3">Progress by Routine</p>
              <Bar
                data={{
                  labels: routineProgress.map(routine => routine.name),
                  datasets: [
                    {
                      label: 'Routine Progress (%)',
                      data: routineProgress.map(routine => routine.progress),
                      backgroundColor: '#ffc451',
                      borderColor: '#f9911e',
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
                        label: function(tooltipItem: any) {
                          return `${tooltipItem.label}: ${tooltipItem.raw}% completed`;
                        }
                      }
                    },
                  },
                }}
              />
            </div>
          </div>

          {/* Gráfico en forma de donas para progreso por rutina */}
          {showCharts && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {routineProgress.map(routine => {
                const data = {
                  labels: ['Completed', 'Remaining'],
                  datasets: [
                    {
                      data: [routine.progress, 100 - routine.progress],
                      backgroundColor: ['#f9911e', '#fff784'],
                      hoverBackgroundColor: ['#f9911e', '#fff784'],
                    },
                  ],
                };

                return (
                  <div key={routine.name} className="text-center">
                    <Doughnut data={data} />
                    <p className="text-lg font-semibold text-black mt-2">{routine.name}</p>
                    <p className="text-sm text-gray-600">{routine.progress}% completed</p>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClientProgress;
