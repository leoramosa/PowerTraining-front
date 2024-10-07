import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Importamos datalabels
import { Doughnut } from 'react-chartjs-2';
import { useState } from 'react';
import UserProgressModal from '../Modals/ModalUser/ModalUserProgress';
import ButtonApp from "@/components/buttons/ButtonApp/ButtonApp";


// Registramos los elementos necesarios, incluyendo datalabels
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Datos de progreso mockeados
const userProgressData = [
  { id: 1, name: 'John Doe', goal: 'Lose Weight', progress: 75 },
  { id: 2, name: 'Jane Smith', goal: 'Build Muscle', progress: 50 },
  { id: 3, name: 'Alex Johnson', goal: 'Increase Endurance', progress: 20 },
  { id: 4, name: 'Samuel Green', goal: 'Run a Marathon', progress: 85 },
];

// Función para determinar el color según el progreso
const getColorBasedOnProgress = (progress: number) => {
  if (progress < 30) return '#ff4d4d'; // Rojo para <30%
  if (progress >= 30 && progress <= 70) return '#ffcc00'; // Amarillo para 30%-70%
  return '#4caf50'; // Verde para >70%
};

const UserProgress = () => {
  const [viewType, setViewType] = useState<'bars' | 'charts'>('bars');
  const [selectedUser, setSelectedUser] = useState(null); // Estado para el usuario seleccionado

  // Función para alternar entre barras y gráficos circulares
  const toggleView = () => {
    setViewType(viewType === 'bars' ? 'charts' : 'bars');
  };

  const handleUserClick = (user: any) => {
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
          Switch to {viewType === 'bars' ? 'Charts' : 'Bars'}
        </ButtonApp>
      </div>

      {viewType === 'bars' ? (
        // Vista de barras de progreso (siempre uno debajo del otro)
        <div className="space-y-4">
          {userProgressData.map(user => (
            <div key={user.id} className="flex items-center justify-between cursor-pointer" onClick={() => handleUserClick(user)}>
              <div className="w-1/3">
                {/* Fijamos un ancho máximo para que los nombres largos no afecten */}
                <p className="text-lg font-semibold text-black truncate">{user.name}</p>
                <p className="text-sm text-gray-600">{user.goal}</p>
              </div>
              <div className="flex-grow bg-gray-200 rounded-full h-4 mx-4">
                <div
                  className="h-4 rounded-full"
                  style={{
                    width: `${user.progress}%`,
                    backgroundColor: getColorBasedOnProgress(user.progress),
                  }}
                ></div>
              </div>
              <p className="text-black font-bold ml-4">{user.progress}%</p>
            </div>
          ))}
        </div>
      ) : (
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
                    weight: 'bold',
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