"use client"; 

import React, { useEffect, useState } from "react";
import ContainerWeb from "@/components/containers/ContainerWeb/ContainerWeb";
import RoutineClientList from "@/components/RoutineClienList/RotuineClientList";
import { getRoutinesByUserId } from "@/helpers/routine-helper";
import { IRoutine } from "@/interface/IRoutineClientRequest";

const RoutineClientPage = () => {
  const [routinesData, setRoutinesData] = useState<IRoutine[]>([]);
  const [currentDate, setCurrentDate] = useState("");
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<string | null>(null); 

  useEffect(() => {
    const fetchRoutinesByUser = async () => {
      setLoading(true); 
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
        setLoading(false); 
      }
    };

    fetchRoutinesByUser(); 
    setCurrentDate(new Date().toISOString().split("T")[0]); 
  }, []); 

  if (loading) {
    return <p className="p-5 text-normal font-medium">Loading...</p>; 
  }

  if (error) {
    return <p>{error}</p>;
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
