import React, { useState } from "react"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../buttons/ButtonPrimary/ButtonPrimary";
import Image from 'next/image';
import { ITrainingExercise } from "@/interface/IRoutineClientRequest";


interface ExerciseClientCardProps {
  exercise: ITrainingExercise;
  onComplete: () => void;
}

const ExerciseClientCard: React.FC<ExerciseClientCardProps> = ({
  exercise,
  onComplete,
}) => {
  const [completed, setCompleted] = useState(exercise.completed);

  const handleComplete = () => {
    setCompleted(true);
    onComplete(); // Llamar a la función pasada como prop
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-md mx-auto my-4 transition-transform transform hover:scale-105">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {exercise.exercise.name}
      </h3>
      {/* Vista previa del video */}
      <div className="flex justify-center mb-4">
        {exercise.exercise.urlVideoExample &&
        (exercise.exercise.urlVideoExample.endsWith(".png") ||
          exercise.exercise.urlVideoExample.endsWith(".jpg") ||
          exercise.exercise.urlVideoExample.endsWith(".jpeg")) ? (
            <Image
              src={exercise.exercise.urlVideoExample}
              alt="Imagen del ejercicio"
              className="rounded-lg w-full h-auto object-cover"
              width={800}
              height={600}
              layout="responsive"
            />
        ) : (
          <iframe
            className="rounded-lg w-full h-64"
            src={exercise.exercise.urlVideoExample.replace("watch?v=", "embed/")}
            title={exercise.exercise.name}
            allowFullScreen
          />
        )}
      </div>

      {/* Contenido del ejercicio */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-gray-700 text-center">{exercise.exercise.description}</p>
         {/* Información del ejercicio */}
         <div className="text-center mt-4 flex space-x-8">
          <p className="text-md font-semibold text-gray-100 bg-gray-500 rounded-md p-2">
            Series <span className="font-bold">{exercise.series}</span>
          </p>
          <p className="text-md font-semibold text-gray-100 bg-gray-500 rounded-md p-2">
            Repetitions <span className="font-bold">{exercise.repetitions}</span>
          </p>
          <p className="text-md font-semibold text-gray-100 bg-gray-500 rounded-md p-2">
            Weight <span className="font-bold">{exercise.weight}kg</span>
          </p>
        </div>
        <div className="flex items-center justify-center bg-gray-200 text-gray-500 font-medium px-3 py-1 rounded-full">
          <FontAwesomeIcon icon={faRocket} className="mr-2" />
          <span>{exercise.exercise.benefits}</span>
        </div>
        {/* Sección de etiquetas */}
        <div className="flex flex-wrap justify-center mt-2">
          {exercise.exercise.tags ? (
            exercise.exercise.tags
              .replace(/[.,]/g, "")
              .split(" ")
              .map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-500 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))
          ) : (
            <span className="text-gray-500">No hay etiquetas disponibles</span>
          )}
        </div>

        {/* Botón para completar ejercicio */}
        <div className="flex justify-center mt-4">
          <ButtonPrimary
            onClick={handleComplete}
            text={completed ? "Completed" : "Finished"}
            type="button"
            disabled={completed}
          />
        </div>
      </div>
    </div>
  );
};

export default ExerciseClientCard;
