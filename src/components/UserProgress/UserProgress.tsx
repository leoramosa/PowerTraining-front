/* eslint-disable @typescript-eslint/no-explicit-any */
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Doughnut, Bar } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import UserProgressModal from '../Modals/ModalUser/ModalUserProgress';
import ButtonApp from "@/components/buttons/ButtonApp/ButtonApp";

// Registramos los elementos necesarios
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, ChartDataLabels);

// Definición del tipo de datos de progreso del usuario
interface UserProgress {
  id: number;
  name: string;
  goal: string;
  progress: number;
}

// Función para determinar el color según el progreso
const getColorBasedOnProgress = (progress: number) => {
  if (progress < 30) return '#ff4d4d'; // Rojo para <30%
  if (progress >= 30 && progress <= 70) return '#ffcc00'; // Amarillo para 30%-70%
  return '#4caf50'; // Verde para >70%
};

// Función para seleccionar un objetivo (goal) aleatorio
const getRandomGoal = () => {
  const goals = ["Lose Weight", "Build Muscle", "Get Shredded"];
  return goals[Math.floor(Math.random() * goals.length)];
};

const UserProgress: React.FC = () => {
  const [viewType, setViewType] = useState<'charts' | 'verticalBars'>('charts');
  const [userProgressData, setUserProgressData] = useState<UserProgress[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProgress | null>(null);

  // Función para obtener datos del API
  const fetchUserProgressData = async (limit=30) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users?limit=${limit}`); // Reemplaza con tu endpoint
      const users = await response.json();

      // Mapear los datos obtenidos para incluir progreso y metas aleatorias
      const progressData: UserProgress[] = users.map((user: any) => ({
        id: user.id,
        name: `${user.name} ${user.lastName}`, // Suponiendo que tienes un `firstName` y `lastName`
        goal: getRandomGoal(), // Reemplaza esto con la función que genera metas aleatorias
        progress: Math.floor(Math.random() * 101), // Genera progreso aleatorio entre 0 y 100
      }));

      setUserProgressData(progressData);
    } catch (error) {
      console.error('Error fetching user progress data:', error);
    }
  };

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchUserProgressData();
  }, []);

  // Alternar entre gráficos circulares y barras verticales
  const toggleView = () => {
    setViewType(viewType === 'charts' ? 'verticalBars' : 'charts');
  };

  const handleUserClick = (user: UserProgress) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
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
              onClick: (evt, element) => {
                if (element.length > 0) {
                  const index = element[0].index;
                  handleUserClick(userProgressData[index]);
                }
              }
            }}
          />
        </div>
      )}

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
