"use client"; // Asegúrate de que esto esté en la parte superior

import React, { useEffect, useState } from "react";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import RoutineClientList from "@/components/RoutineClienList/RotuineClientList";
import { getRoutinesByUserId } from "@/helpers/routine-helper";
import { IRoutineItem } from "@/interface/IRoutine";

const RoutineClientPage = () => {
  const [routinesData, setRoutinesData] = useState<IRoutineItem[]>([]);
  const [currentDate, setCurrentDate] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const fetchRoutinesByUser = async () => {
    try {
      const storedUser = localStorage.getItem("authUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        const userId = parsedUser?.id;
        if (userId) {
          const response = await getRoutinesByUserId(userId);
          setRoutinesData(response.items);
        } else {
          console.warn("User ID is not available.");
        }
      } else {
        console.warn("No authenticated user found in localStorage.");
      }
    } catch (error) {
      console.error("Error fetching routines by user, please try again.", error);
    }
  };

  useEffect(() => {
    fetchRoutinesByUser();
    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <main>
      <ContainerWeb>
        <RoutineClientList routines={routinesData} currentDate={currentDate} />
      </ContainerWeb>
    </main>
  );
};

export default RoutineClientPage;
