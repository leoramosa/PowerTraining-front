/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importamos datalabels
import { Doughnut, Bar } from 'react-chartjs-2'; // Usamos también "Bar" para el gráfico de barras verticales
import { useState } from 'react';
import UserProgressModal from '../Modals/ModalUser/ModalUserProgress';
import ButtonApp from "@/components/buttons/ButtonApp/ButtonApp";

// Registramos los elementos necesarios, incluyendo datalabels y el tipo de gráfico de barras
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartDataLabels);

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

const UserProgress: React.FC = () => {
  const [viewType, setViewType] = useState<'charts' | 'verticalBars'>('charts');
  const [selectedUser, setSelectedUser] = useState<UserProgress | null>(null); // Estado para el usuario seleccionado

  // Función para alternar entre gráficos circulares y barras verticales
  const toggleView = () => {
    setViewType(viewType === 'charts' ? 'verticalBars' : 'charts');
  };

  const handleUserClick = (user: UserProgress) => {
    setSelectedUser(user); // Seleccionamos el usuario para el modal
  };

  const closeModal = () => {
    setSelectedUser(null); // Cerrar modal
  };

  return (
    <div className="h-auto bg-white shadow-lg rounded-lg mt-5 p-5">
      <div className="flex justify-between items-center mb-5">
        <p className="text-black text-2xl">Users Goal Progress</p>
        <ButtonApp 
          variant="login"
          onClick={toggleView}
        >
          Switch to {viewType === 'charts' ? 'Bars' : 'Charts'}
        </ButtonApp>
      </div>

      {viewType === 'charts' ? (
        // Vista de gráficos circulares (máximo 3 por fila)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {userProgressData.map(user => {
            const data = {
              labels: ['Progress', 'Remaining'],
              datasets: [
                {
                  data: [user.progress, 100 - user.progress],
                  backgroundColor: [getColorBasedOnProgress(user.progress), '#ddd'],
                  hoverBackgroundColor: [getColorBasedOnProgress(user.progress), '#ccc'],
                },
              ],
            };

            const options = {
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function(tooltipItem: any) {
                      return `${tooltipItem.label}: ${user.progress}%`;
                    }
                  }
                },
                datalabels: {
                  display: true,
                  formatter: (value: number) => `${value}%`,
                  color: '#fff',
                  font: {
                    weight: 700,
                    size: 16,
                  },
                },
              },
            };

            return (
              <div key={user.id} className="text-center cursor-pointer" onClick={() => handleUserClick(user)}>
                <Doughnut data={data} options={options} />
                <p className="text-lg font-semibold text-black mt-2">{user.name}</p>
                <p className="text-sm text-gray-600">{user.goal}</p>
              </div>
            );
          })}
        </div>
      ) : (
        // Vista de barras verticales
        <div>
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
                datalabels: {
                  display: true,
                  formatter: (value: number) => `${value}%`,
                  color: '#000',
                  anchor: 'end',
                  align: 'start',
                  offset: -10,
                  font: {
                    weight: 700,
                    size: 14,
                  },
                },
              },
              // Evento de clic para detectar cuando se hace clic en una barra
              onClick: (evt, element) => {
                if (element.length > 0) {
                  const index = element[0].index;
                  handleUserClick(userProgressData[index]); // Abrir el modal con el usuario correspondiente
                }
              }
            }}
          />
        </div>
      )}

      {/* Modal de progreso individual del usuario */}
      {selectedUser && (
        <UserProgressModal
          user={selectedUser}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default UserProgress;
