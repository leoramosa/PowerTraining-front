/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// Definición del tipo de datos de progreso del usuario
interface UserProgress {
  id: string;
  name: string;
  goal: string;
  progress: number;
}

// Función para determinar el color según el progreso
const getColorBasedOnProgress = (progress: number) => {
  if (progress < 30) return "#fff784"; // Rojo para <30%
  if (progress >= 30 && progress <= 70) return "#ffc451"; // Amarillo para 30%-70%
  return "#f9911e"; // Verde para >70%
};

// Función para seleccionar un objetivo (goal) aleatorio
const getRandomGoal = () => {
  const goals = ["Lose Weight", "Build Muscle", "Get Shredded"];
  return goals[Math.floor(Math.random() * goals.length)];
};

const DashboardUserProgress: React.FC = () => {
  const [userProgressData, setUserProgressData] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los usuarios
  async function getAllUsers(limit = 10): Promise<UserProgress[]> {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users?limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Error HTTP! status: ${response.status}, message: ${errorText}`
        );
      }

      const users = await response.json();

      // Calcula el progreso y el objetivo aleatorio y crea los datos de progreso
      return users.map((user: any) => ({
        id: user.id,
        name: `${user.name} ${user.lastName}`,
        goal: getRandomGoal(), // Objetivo aleatorio
        progress: Math.floor(Math.random() * 101), // Progreso aleatorio
      }));
    } catch (error: any) {
      console.error("Error obteniendo los usuarios:", error);
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const usersData = await getAllUsers(10); // Obtén 10 usuarios
        setUserProgressData(usersData);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Link href="/dashboard/progress">
      <div className="bg-white shadow-lg rounded-lg p-5">
        <p className="text-black text-2xl mb-5">Users Goal Progress</p>

        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={userProgressData}>
            <YAxis domain={[0, 100]} />
            <Tooltip
              formatter={(value: number) => `${value}%`} // Formato del valor
              labelFormatter={(name: string) => `User: ${name}`} // Etiqueta para el nombre del usuario
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const user = payload[0].payload;
                  return (
                    <div className="bg-white border rounded p-2">
                      <p>User: {user.name}</p>
                      <p>Goal: {user.goal}</p>
                      <p>Progress: {user.progress}%</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="progress">
              {userProgressData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getColorBasedOnProgress(entry.progress)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Link>
  );
};

export default DashboardUserProgress;
