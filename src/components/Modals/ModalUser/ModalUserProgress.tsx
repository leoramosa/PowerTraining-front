/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ButtonApp from "@/components/buttons/ButtonApp/ButtonApp";

interface UserProgressModalProps {
  user: {
    id: number;
    name: string;
    goal: string;
    progress: number;
  };
  onClose: () => void;
}

const UserProgressModal: React.FC<UserProgressModalProps> = ({ user, onClose }) => {
  const data = {
    labels: ['Progress', 'Remaining'],
    datasets: [
      {
        data: [user.progress, 100 - user.progress],
        backgroundColor: [user.progress >= 70 ? '#4caf50' : user.progress >= 30 ? '#ffcc00' : '#ff4d4d', '#ddd'],
        hoverBackgroundColor: [user.progress >= 70 ? '#388e3c' : user.progress >= 30 ? '#ffcc00' : '#ff4d4d', '#ccc'],
      },
    ],
  };

  const options = {
    plugins: {
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
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">{user.name}`&apos;` Progress</h2>
        <p className="mb-4">Goal: {user.goal}</p>

        {/* Gráfico circular */}
        <div className="w-64 mx-auto mb-4">
          <Doughnut data={data} options={options} />
        </div>

        <div className="flex justify-center mt-6">
        <ButtonApp variant="login" onClick={onClose} className="w-full">
            Close
          </ButtonApp>
        </div>
      </div>
    </div>
  );
};

export default UserProgressModal;
