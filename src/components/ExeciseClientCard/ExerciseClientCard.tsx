/*import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../buttons/ButtonPrimary/ButtonPrimary";
import Image from "next/image";
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
  const [rpe, setRpe] = useState<number>(5);

  const increaseRpe = () => {
    if (rpe < 10) setRpe(rpe + 1);
  };

  const decreaseRpe = () => {
    if (rpe > 1) setRpe(rpe - 1);
  };

  const handleRpeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 10) setRpe(value);
  };

  const handleComplete = () => {
    setCompleted(true);
    onComplete();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 max-w-md mx-auto my-4 transition-transform transform hover:scale-105">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {exercise.exercise.name}
      </h3>
      
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
            src={exercise.exercise.urlVideoExample.replace(
              "watch?v=",
              "embed/"
            )}
            title={exercise.exercise.name}
            allowFullScreen
          />
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <p className="text-gray-700 text-center">
          {exercise.exercise.description}
        </p>
        <div className="text-center mt-4 flex space-x-8">
          <p className="text-md font-semibold text-gray-100 bg-gray-500 rounded-md p-2">
            Series <span className="font-bold">{exercise.series}</span>
          </p>
          <p className="text-md font-semibold text-gray-100 bg-gray-500 rounded-md p-2">
            Repetitions{" "}
            <span className="font-bold">{exercise.repetitions}</span>
          </p>
          <p className="text-md font-semibold text-gray-100 bg-gray-500 rounded-md p-2">
            Weight <span className="font-bold">{exercise.weight}kg</span>
          </p>
        </div>
        <div className="flex items-center justify-center bg-gray-200 text-gray-500 font-medium px-3 py-1 rounded-full">
          <FontAwesomeIcon icon={faRocket} className="mr-2" />
          <span>{exercise.exercise.benefits}</span>
        </div>
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

        <div className="flex justify-center mt-4">
        <div className="flex flex-col">
            <label className="block text-gray-500 font-semibold text-xs mb-1">
              RPE (Rate of Perceived Exertion)
            </label>
            <div className="relative">
              <input
                type="number"
                value={rpe}
                onChange={handleRpeChange}
                className="w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate border-gray-300 focus:border-primary focus:outline-none transition duration-300 text-center"
                min="1"
                max="10"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col">
                <button
                  className="text-lg text-dark bg-gray-200 rounded-md px-2 py-1 mb-1 hover:bg-gray-300 transition duration-300"
                  onClick={increaseRpe}
                >
                  ▲
                </button>
                <button
                  className="text-lg text-dark bg-gray-200 rounded-md px-2 py-1 hover:bg-gray-300 transition duration-300"
                  onClick={decreaseRpe}
                >
                  ▼
                </button>
              </div>
            </div>
          </div>
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
*/

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket, faInfo } from "@fortawesome/free-solid-svg-icons";
import ButtonPrimary from "../buttons/ButtonPrimary/ButtonPrimary";
import Image from "next/image";
import { ITrainingExercise } from "@/interface/IRoutineClientRequest";

interface ExerciseClientCardProps {
  exercise: ITrainingExercise;
  onComplete: (rpe: number) => void;
}

const ExerciseClientCard: React.FC<ExerciseClientCardProps> = ({
  exercise,
  onComplete,
}) => {
  const [completed, setCompleted] = useState(exercise.completed);
  const [rpe, setRpe] = useState<number | null>(null);
  const [isRpeSelected, setIsRpeSelected] = useState<boolean>(false);

  const handleRpeSelect = (value: number) => {
    setRpe(value);
    setIsRpeSelected(true);
  };

  const handleComplete = (rpe: number) => {
    setCompleted(true);
    onComplete(rpe);
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-8 max-w-md mx-auto my-2 transition-transform transform hover:scale-105">
      <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
        {exercise.exercise.name}
      </h3>
      <div className="flex justify-center mb-1">
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
            className="rounded-lg w-full h-40"
            src={exercise.exercise.urlVideoExample.replace(
              "watch?v=",
              "embed/"
            )}
            title={exercise.exercise.name}
            allowFullScreen
          />
        )}
      </div>
      <div className="text-center my-3 flex space-x-5">
        <p className="text-md font-semibold text-orange-500 border-2 border-gray-300 rounded-md p-2">
          Series <span className="font-bold">{exercise.series}</span>
        </p>
        <p className="text-md font-semibold text-orange-500 border-2 border-gray-300 rounded-md p-2">
          Repetitions <span className="font-bold">{exercise.repetitions}</span>
        </p>
        <p className="text-md font-semibold text-orange-500 border-2 border-gray-300 rounded-md p-2">
          Weight <span className="font-bold">{exercise.weight}kg</span>
        </p>
      </div>

      <div className="flex flex-col items-center space-y-2">
        {/* Información del ejercicio */}
        <div className="flex flex-col w-full space-y-2">
          <div className="flex items-center justify-start text-sm font-normal  bg-gray-100 text-gray-500 w-full px-5 py-2 rounded-md">
            <FontAwesomeIcon icon={faInfo} className="mr-2 text-gray-500" />
            <span>{exercise.exercise.description}</span>
          </div>
          <div className="flex items-center justify-start text-sm font-normal  bg-gray-100 text-gray-500 w-full px-5 py-2 rounded-md">
            <FontAwesomeIcon icon={faRocket} className="mr-2 text-gray-500" />
            <span>{exercise.exercise.benefits}</span>
          </div>
        </div>

        {!completed && (
          <div className=" bg-gray-100 p-2 max-w-md w-full rounded-md mx-auto my-1 transition-transform transform hover:scale-105">
            <h3 className="text-sm font-normal text-center flex justify-center text-gray-500 mb-1">
              Rate of Perceived Exertion
            </h3>

            <div className="flex gap-1 justify-center mb-3">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => handleRpeSelect(i + 1)}
                  className={`text-sm font-semibold py-1 px-2 rounded-md border transition duration-300 ${
                    rpe === i + 1
                      ? "bg-primary text-white border-primary"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-orange-100"
                  }`}
                  disabled={isRpeSelected}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            {rpe === null && !completed && (
              <p className="my-2 text-orange-400 text-xs flex justify-center">
                Please select the RPE to mark the exercise as completed.
              </p>
            )}
            {rpe != null && (
              <div className="flex justify-center">
                <ButtonPrimary
                  onClick={() => handleComplete(rpe)}
                  text={completed ? "Completed" : "Mark as finished"}
                  type="button"
                  disabled={rpe === null || completed}
                />
              </div>
            )}
          </div>
        )}
        {completed && (
          <div className="flex justify-center space-x-3 w-full">
            <p className="bg-gray-500  text-white text-xs py-2 px-4 rounded-md">
              RPE {exercise.rpe}
            </p>
            <p className="bg-green-500  text-white py-2 px-4 rounded-md text-xs">
              Exercise has been completed
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseClientCard;
