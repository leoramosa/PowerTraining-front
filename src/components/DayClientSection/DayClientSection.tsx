import React, { useState, useMemo } from "react";
import ExerciseClientCarousel from "@/components/ExerciseClientCarousel/ExerciseClientCarousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { modifyTrainingExerciseById } from "@/helpers/routine-helper";
import { ITrainingDay, ITrainingExercise } from "@/interface/IRoutineClientRequest";

interface DayClientSectionProps {
  day: ITrainingDay;
  onProgressUpdate: (updatedExercises: ITrainingExercise[]) => void; 
}

const DayClientSection: React.FC<DayClientSectionProps> = ({ day, onProgressUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exercises, setExercises] = useState<ITrainingExercise[]>(day.exercises);

  const handleCompleteExercise = async (exerciseId: number, rpe: number) => {
    console.log("------------------> Valor rpe: ", rpe)
    const updatedExercises = exercises.map((ex) =>
      ex.id === exerciseId ? { ...ex, completed: true, rpe: rpe } : ex
    );
    setExercises(updatedExercises); 
    /*const trainingExercise: ITrainingExercise | undefined = exercises.find((ex) =>
      ex.id === exerciseId
    );*/
    const token = localStorage.getItem("authToken");
    await modifyTrainingExerciseById(exerciseId, token ? token : "", rpe);
    console.log('Updated Exercises:', updatedExercises); 
    onProgressUpdate(updatedExercises); 
  };

  const completionPercentage = useMemo(() => {
    const totalExercises = exercises.length;
    const completedExercises = exercises.filter((ex) => ex.completed).length;
    return totalExercises === 0
      ? 0
      : Math.round((completedExercises / totalExercises) * 100);
  }, [exercises]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const percentageColor = completionPercentage === 100 ? "text-green-500" : "text-gray-500";
  const cardStyle = completionPercentage === 100 ? "border-green-500" : "border-gray-300";

  return (
    <div className={`mt-1 py-3 px-1 ${cardStyle}`}>
      {/* Contenedor del título y porcentaje */}
      <div
        className="flex justify-between items-center cursor-pointer  text-gray-500 bg-gray-200 rounded-md px-2 py-1"
        onClick={toggleOpen}
      >
        <h3 className={`text-md font-bold flex items-center`}>
          <FontAwesomeIcon
            icon={isOpen ? faMinusCircle : faPlusCircle}
            className="mr-2"
          />
          {day.date}:{" "}{day.description}
        </h3>

        {/* Mostrar ícono de completado o porcentaje */}
        <span className={`text-lg font-bold flex items-center ${percentageColor}`}>
          {completionPercentage === 100 ? (
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
          ) : (
            <span>{completionPercentage}%</span>
          )}
        </span>
      </div>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {isOpen && (
          <div className="mt-2 mb-2">
            <ExerciseClientCarousel
              exercises={exercises}
              onComplete={handleCompleteExercise} 
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DayClientSection;
