import React, { useState } from "react";
import ExerciseClientCard from "@/components/ExeciseClientCard/ExerciseClientCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { ITrainingExercise } from "@/interface/IRoutineClientRequest";


interface ExerciseCarouselProps {
  exercises: ITrainingExercise[];
  onComplete: (exerciseId: number, rpe: number) => void;
}

const ExerciseClientCarousel: React.FC<ExerciseCarouselProps> = ({
  exercises,
  onComplete,
}) => {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);

  const goNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
    }
  };

  return (
    <>
    <div className="mb-1 text-sm font-semibold text-gray-500">
        <p className="bg-gray-100 px-2 py-1 rounded-md">Exercise {currentExerciseIndex + 1} of {exercises.length}</p>
      </div>
    <div className="relative flex items-center justify-center">
      {/* Mostrar progreso del ejercicio */}
      
      {/* Botón Anterior */}
      <button
        onClick={goPrev}
        className={`absolute left-0 bg-primaryLight text-primary hover:bg-primary hover:text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300 ease-in-out ${
          currentExerciseIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentExerciseIndex === 0}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
      </button>

      {/* Contenido del Carrusel */}
      <div className="flex justify-between mx-8">
        {exercises.map((exercise, index) => (
          <div
            key={exercise.id}
            className={`snap-center ${
              index === currentExerciseIndex ? "block" : "hidden"
            }`}
          >
            <ExerciseClientCard
              exercise={exercise}
              onComplete={(rpe) => onComplete(exercise.id, rpe)}
            />
          </div>
        ))}
      </div>

      {/* Botón Siguiente */}
      <button
        onClick={goNext}
        className={`absolute right-0 bg-primaryLight text-primary hover:bg-primary hover:text-white w-10 h-10 flex items-center justify-center rounded-full shadow-md transform transition-all duration-300 ease-in-out ${
          currentExerciseIndex === exercises.length - 1
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        disabled={currentExerciseIndex === exercises.length - 1}
      >
        <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
      </button>
    </div>
    </>
  );
};

export default ExerciseClientCarousel;
