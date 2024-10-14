import React, { useState, useEffect } from "react";
import DayClientSection from "@/components/DayClientSection/DayClientSection";
import ProgressClientBar from "@/components/ProgressClientBar/ProgressClientBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { modifyRoutineCompletedById } from "@/helpers/routine-helper";
import { ITrainingDay } from "@/interface/IRoutineClientRequest";

interface RoutineCardProps {
  routine?: {
    id: number;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    completed: boolean;
    trainingDays: ITrainingDay[];
  };
  currentDate: string;
  completedRoutine: (completed: boolean, idRoutine: number) => void;
}

const RoutineClientCard: React.FC<RoutineCardProps> = ({
  routine,
  currentDate,
  completedRoutine,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [trainingDays, setTrainingDays] = useState<ITrainingDay[]>([]);
  const [unlocked, setUnlocked] = useState<boolean>(false);

  const modifyRoutine = async (id?: number) => {
    const token = localStorage.getItem("authToken");
    if (token && routine) {
      await modifyRoutineCompletedById(id, token, routine);
      console.log("se modificó la rutina");
      completedRoutine(true, routine.id);
    }
  };

  useEffect(() => {
    if (routine) {
      setTrainingDays(routine.trainingDays);
      const today = new Date(currentDate);
      const start = new Date(routine.startDate);
      const end = new Date(routine.endDate);
      setUnlocked(today > end || (today >= start && today <= end));
    }
  }, [routine, currentDate]);

  // Función para calcular el progreso de la rutina
  const calculateProgress = (trainingDays: ITrainingDay[]) => {
    const totalDays = trainingDays.length;
    const completedDays = trainingDays.filter((day) =>
      day.exercises.every((exercise) => exercise.completed)
    ).length;

    return totalDays ? (completedDays / totalDays) * 100 : 0;
  };

  useEffect(() => {
    if (!routine) return;

    const newProgress = calculateProgress(trainingDays);
    setProgress(newProgress);

    /*if (newProgress === 100) {
      modifyRoutine(routine.id);
    }*/
  }, [trainingDays, routine, progress]);


  if (!routine) {
    return <div>No routine available</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row justify-between items-center mb-1">
        <h2 className="text-xl font-bold text-gray-800">
          {routine.name}
          {progress === 100 && (
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="ml-2 text-green-500"
            />
          )}
        </h2>
        {unlocked ? (
          <FontAwesomeIcon
            icon={faLockOpen}
            className="w-6 h-6 text-gray-400"
          />
        ) : (
          <FontAwesomeIcon icon={faLock} className="w-6 h-6 text-gray-400" />
        )}
      </div>

      <p className="text-sm font-medium text-gray-600 mb-1">
        {routine.description}
      </p>

      {unlocked && (
        <>
          <ProgressClientBar progress={progress} />
          {trainingDays
            .sort((a, b) => {
              const dayA = parseInt(a.date.split(" ")[1]);
              const dayB = parseInt(b.date.split(" ")[1]);
              return dayA - dayB;
            })
            .map((day) => (
              <DayClientSection
                key={day.id}
                day={day}
                onProgressUpdate={(updatedExercises) => {
                  setTrainingDays((prevDays) =>
                    prevDays.map((d) =>
                      d.id === day.id
                        ? { ...d, exercises: updatedExercises }
                        : d
                    )
                  );
                }}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default RoutineClientCard;
