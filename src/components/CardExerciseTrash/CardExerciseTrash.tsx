import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUndo, faRocket } from "@fortawesome/free-solid-svg-icons";
import ButtonOk from "../buttons/ButtonOk/ButtonOk";
import ButtonNoOk from "../buttons/ButtonNoOk/ButtonNoOk";

interface ExerciseCardTrashProps {
  index: number;
  exercise: string;
  idExercise: string,
  videoUrl: string;
  description: string;
  benefits: string;
  tags: string[];
  handleDelete: (id: string) => void;
  handleRecover: (id: string) => void;
}


const ExerciseCardTrash: React.FC<ExerciseCardTrashProps> = ({
  index,
  idExercise,
  exercise,
  videoUrl,
  description,
  benefits,
  tags,
  handleDelete,
  handleRecover,
}) => {
  return (
    <div className={`card flex flex-row justify-between my-5 items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 mb-6`}>
      {/* Vista previa del video */}
      <div className="flex-shrink-0 w-1/3">
        <iframe
          className="rounded-lg w-full h-full"
          src={videoUrl.replace("watch?v=", "embed/")}
          title={exercise}
          allowFullScreen
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="ml-6 flex flex-col justify-between w-2/3">
        <div>
          <h3 className="text-xl font-bold mb-2">
            #{index} {exercise}
          </h3>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="inline-flex bg-primarLight border border-primary text-gray-800 font-extralight items-center px-2 py-1 rounded-full">
            <FontAwesomeIcon icon={faRocket} className="mr-2" />
            {benefits}
          </p>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap">
            {tags[0]?.replace(/[.,]/g, '').split(" ").map((tag, index: number) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-500 text-sm font-medium mr-2 mb-2 px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* Botones de acciones al final */}
      <div className="flex justify-end mt-auto space-x-2">
        <ButtonOk
            type="button"
            text="Recover"
            onClick={() => handleRecover(idExercise)}
            icon={
                <FontAwesomeIcon icon={faUndo} className="text-white" />
            }
        />
        <ButtonNoOk
            type="button"
            text="Delete"
            onClick={() => handleDelete(idExercise)}
            icon={
                <FontAwesomeIcon icon={faTrash} className="text-white" />
            }
        />
      </div>
    </div>
  );
};

export default ExerciseCardTrash;
