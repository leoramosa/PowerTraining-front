import React, { useState, useEffect } from "react";
import RoutineClientCard from "@/components/RoutineClientCard/RoutineClientCard";
import TitleH1 from "../titles/TitleH1";
import { FaFileDownload } from "react-icons/fa";
import {
  faDumbbell,
  faArrowLeft,
  faArrowRight,
  faLockOpen,
  faLock,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IRoutine } from "@/interface/IRoutineClientRequest";
import ItemInfo from "../ItemInfo/ItemInfo";
import { modifyRoutineCompletedById } from "@/helpers/routine-helper";
import { toast } from "sonner";
const APIURL = process.env.NEXT_PUBLIC_API_URL;

interface RoutineListProps {
  routines: IRoutine[];
  currentDate: string;
}

const RoutineClientList: React.FC<RoutineListProps> = ({
  routines,
  currentDate,
}) => {
  const [currentRoutineIndex, setCurrentRoutineIndex] = useState<number>(0);
  const [orderedRoutines, setOrderedRoutines] = useState<IRoutine[]>([]);
  const maxVisibleCards = 4;
  const [visibleRoutines, setVisibleRoutines] = useState<IRoutine[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [disabledPdf, setDisabledPdf] = useState<boolean>(false);

  useEffect(() => {
    if (!routines || routines.length === 0) return;
    const today = new Date(currentDate);
    const sortedRoutines = [...routines].sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );
    const pastRoutines = sortedRoutines.filter(
      (routine) => new Date(routine.endDate) < today
    );
    const currentRoutine = sortedRoutines.filter(
      (routine) =>
        new Date(routine.startDate) <= today &&
        new Date(routine.endDate) >= today
    );
    const futureRoutines = sortedRoutines.filter(
      (routine) => new Date(routine.startDate) > today
    );
    setOrderedRoutines([...pastRoutines, ...currentRoutine, ...futureRoutines]);
    const activeRoutineIndex = orderedRoutines.findIndex((routine) =>
      isRoutineUnlocked(routine.startDate, routine.endDate, currentDate)
    );

    if (activeRoutineIndex !== -1) {
      setCurrentRoutineIndex(activeRoutineIndex);
    } else {
      const lastPastRoutineIndex = pastRoutines.length - 1;
      if (lastPastRoutineIndex >= 0) {
        setCurrentRoutineIndex(lastPastRoutineIndex);
      } else {
        const nextUnlocked = orderedRoutines.findIndex(
          (routine) => new Date(routine.startDate) > today
        );
        setCurrentRoutineIndex(nextUnlocked !== -1 ? nextUnlocked : 0);
      }
    }
  }, [routines, currentDate]);

  useEffect(()=>{
    if(!routines || routines.length === 0) setDisabledPdf(true)
    else setDisabledPdf(false)
  },[routines])

  const goNext = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex < orderedRoutines.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const goPrev = () => {
    setCurrentRoutineIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  useEffect(() => {

    const startIndexR = Math.max(0, currentRoutineIndex - 1);
    setStartIndex(startIndexR);
    const endIndexR = Math.min(
      startIndexR + maxVisibleCards,
      orderedRoutines.length
    );
    setVisibleRoutines(orderedRoutines.slice(startIndexR, endIndexR));
  }, [orderedRoutines]);

  const completedRoutine = async (completed: boolean, idRoutine: number) => {
    console.log("se ejecuta función completedRoutine");
    console.log(completed);
    console.log(idRoutine);

    const token = localStorage.getItem("authToken");

    const newRoutine = await modifyRoutineCompletedById(
      idRoutine,
      token ? token : ""
    );
    console.log(newRoutine);
    setOrderedRoutines((prevRoutines) =>
      prevRoutines.map((routine) => {
        if (routine.id === idRoutine) {
          return {
            ...routine,
            completed: completed,
          };
        }
        return routine;
      })
    );

    if (completed) {
      console.log(`La rutina con ID ${idRoutine} ha sido completada.`);
    } else {
      console.log(
        `La rutina con ID ${idRoutine} ha sido marcada como incompleta.`
      );
    }
  };

  useEffect(()=>{},[disabledPdf])

  const handlePdfDownload = async () => {
    setDisabledPdf(true);
    const userLocal = localStorage.getItem("authUser");
    try {
      if (userLocal) {
        const user = JSON.parse(userLocal);
        const response = await fetch(
          APIURL + "/pdfreports/userroutine/"+user.email,
          {
            method: "GET",
            headers: {
              Accept: "application/pdf",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Error al descargar el archivo");
        }
        console.log(APIURL + "/pdfreports/userroutine/pdf?email=" + user.email)
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "user-routine.pdf");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("The report has been downloaded successfully");
      } else {
        toast.error(
          "There was an error downloading the report. Please try again later."
        );
      }
      setDisabledPdf(false);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-between my-4 mt-6 space-x-2 items-center">
        <div>
          
          <TitleH1><FontAwesomeIcon
            icon={faDumbbell}
            size="1x"
            className="text-primary"
          /> My Routines</TitleH1>
        </div>
        <div>
          <button
            disabled={disabledPdf}
            onClick={handlePdfDownload}
            className={` mt-3 ${
              !disabledPdf
                ? "hover:bg-primary bg-gray-500"
                : "hover:none bg-gray-300"
            }  text-white px-4 py-2 rounded-full flex items-center justify-center mx-auto transition duration-300 ease-in-out`}
          >
            <FaFileDownload className="mr-2" />
            Download pdf
          </button>
        </div>
      </div>
      {!routines || routines.length === 0 ? (
        <ItemInfo>
          <p className="text-gray-500 font-semibold text-center">
            No routines available
          </p>
        </ItemInfo>
      ) : (
        <div>
          <div className="relative flex justify-between items-center mt-4">
            <button
              onClick={goPrev}
              className={`absolute left-0 bg-primaryLight text-white hover:bg-primary w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                currentRoutineIndex === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              disabled={currentRoutineIndex === 0}
            >
              <FontAwesomeIcon icon={faArrowLeft} size="lg" />
            </button>

            <div className="flex overflow-hidden w-full justify-center space-x-6">
              {visibleRoutines.map((routine, index) => {
                const weekNumber = `Week ${startIndex + index + 1}`;
                const isActive = currentRoutineIndex === startIndex + index;
                const unlocked = isRoutineUnlocked(
                  routine.startDate,
                  routine.endDate,
                  currentDate
                );
                return (
                  <div
                    key={routine.id}
                    onClick={() => setCurrentRoutineIndex(startIndex + index)}
                    className={`cursor-pointer transition-transform duration-500 transform ${
                      isActive
                        ? "scale-100 border-2 border-primary z-10 shadow-xl"
                        : "scale-95 opacity-50"
                    } w-[250px] h-[150px] flex-shrink-0 relative border rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-100`}
                  >
                    <div className="p-4">
                      <div className="flex justify-between">
                        <h3 className="text-lg font-bold text-gray-800">
                          <span className="bg-orange-500 text-white px-2 py-1 rounded-md">
                            {weekNumber}{" "}
                            {unlocked ? (
                              <FontAwesomeIcon
                                icon={faLockOpen}
                                className="w-5 h-5 text-white ml-2"
                              />
                            ) : (
                              <FontAwesomeIcon
                                icon={faLock}
                                className="w-5 h-5 text-white ml-2"
                              />
                            )}
                          </span>
                        </h3>
                        {routine.completed && (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="ml-2 text-green-500"
                          />
                        )}
                      </div>
                      <h4 className="text-md font-semibold text-gray-700 mt-1">
                        {routine.name}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {routine.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        <span className="bg-gray-400 text-white px-2 py-1 rounded-md mr-2">
                          {routine.startDate}
                        </span>
                        {"-"}
                        <span className="bg-gray-400 text-white px-2 py-1 rounded-md ml-2">
                          {routine.endDate}
                        </span>
                      </p>
                    </div>
                    {isActive && (
                      <div className="absolute top-0 left-0 w-full h-full bg-primary opacity-20 rounded-lg"></div>
                    )}
                  </div>
                );
              })}
            </div>

            <button
              onClick={goNext}
              className={`absolute right-0 bg-primaryLight text-white hover:bg-primary w-12 h-12 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-in-out ${
                currentRoutineIndex === orderedRoutines.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:scale-105"
              }`}
              disabled={currentRoutineIndex === orderedRoutines.length - 1}
            >
              <FontAwesomeIcon icon={faArrowRight} size="lg" />
            </button>
          </div>

          <div className="mt-8 py-4 px-2 border-t-2">
            <RoutineClientCard
              routine={orderedRoutines[currentRoutineIndex]}
              currentDate={currentDate}
              completedRoutine={completedRoutine}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const isRoutineUnlocked = (
  startDate: string,
  endDate: string,
  currentDate: string
) => {
  const today = new Date(currentDate);
  const start = new Date(startDate);

  return today >= start;
};

export default RoutineClientList;
