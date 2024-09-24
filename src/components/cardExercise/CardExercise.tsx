import React from "react";
import ButtonActions from "../buttons/ButtonActions/ButtonActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";

interface ExerciseCardProps {
  index: number;
  exercise: string;
  videoUrl: string;
  description: string;
  benefits: string;
  tags: string[];
  onClickEdit: () => void;
  onClickDelete: () => void;
  isCreateOrUpdate: boolean;
}

const getYoutubeThumbnail = (url: string) => {
  const videoId = url.split("v=")[1];
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  index,
  exercise,
  videoUrl,
  description,
  benefits,
  tags,
  onClickEdit,
  onClickDelete,
  isCreateOrUpdate
}) => {
  return (
    <div className={`flex flex-row rounded-lg w-full p-6 mb-6 transition-shadow duration-300 ease-in-out transform ${isCreateOrUpdate ? 'bg-white border-2 border-green-200 shadow-2xl' : 'bg-white shadow-lg'}`}>
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
      <div className="flex-none flex items-end space-x-2 ml-auto">
        <ButtonActions
          status="edit"
          size="md"
          tooltip="Edit exercise"
          onClick={onClickEdit}
        />
        <ButtonActions
          status="delete"
          size="md"
          tooltip="Delete exercise"
          onClick={onClickDelete}
          //handleClickDelete(exerciseId);
        />
      </div>
    </div>
  );
};

export default ExerciseCard;
