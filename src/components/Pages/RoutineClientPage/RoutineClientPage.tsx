"use client"; // Asegúrate de que esto esté en la parte superior

import React, { useEffect, useState } from "react";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import RoutineClientList from "@/components/RoutineClienList/RotuineClientList";
import { getRoutinesByUserId } from "@/helpers/routine-helper";
import { IRoutine } from "@/interface/IRoutineClientRequest";

const RoutineClientPage = () => {
  const [routinesData, setRoutinesData] = useState<IRoutine[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(true); // Nuevo estado para carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  useEffect(() => {
    const fetchRoutinesByUser = async () => {
      setLoading(true); // Indicar que se está cargando
      try {
        const storedUser = localStorage.getItem("authUser");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const userId = parsedUser?.id;
          if (userId) {
            const response = await getRoutinesByUserId(userId);
            setRoutinesData(response);
          } else {
            console.warn("User ID is not available.");
            setError("User ID is not available.");
          }
        } else {
          console.warn("No authenticated user found in localStorage.");
          setError("No authenticated user found.");
        }
      } catch (error) {
        console.error("Error fetching routines by user, please try again.", error);
        setError("Error fetching routines, please try again.");
      } finally {
        setLoading(false); // Terminar el estado de carga
      }
    };

    fetchRoutinesByUser(); // Fetch data
    setCurrentDate(new Date().toISOString().split("T")[0]); // Establecer la fecha actual
  }, []); // Empty dependency array ensures this runs only once

  if (loading) {
    return <p>Loading...</p>; // Mensaje de carga
  }

  if (error) {
    return <p>{error}</p>; // Mensaje de error
  }

  return (
    <main>
      <ContainerWeb>
        <RoutineClientList routines={routinesData} currentDate={currentDate} />
      </ContainerWeb>
    </main>
  );
};

export default RoutineClientPage;
