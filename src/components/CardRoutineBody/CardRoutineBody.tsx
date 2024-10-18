"use client";
import React, { useEffect, useState } from "react";
import ButtonActions from "@/components/buttons/ButtonActions/ButtonActions";
import Pagination from "@/components/pagination/Pagination";
import ItemInfo from "@/components/ItemInfo/ItemInfo";
import ModalCardRoutine from "../ModalCardRoutine/ModalCardRoutine";
import ButtonPrimary from "@/components/buttons/ButtonPrimary/ButtonPrimary";
import {
  FaUser,
  FaCalendarAlt,
  FaDumbbell,
  FaChevronRight,
} from "react-icons/fa";
import {
  IRoutineItem2,
  IRoutineItem,
  IRoutineWizard,
} from "@/interface/IRoutine";
import { deleteRoutineById, getRoutinesDB } from "@/helpers/routine-helper";
import { calculateTotalPages } from "@/helpers/exercises-utils";
import { getUserById2 } from "@/Services/userService";
import showGenericAlert from "../alert/alert";
import { toast } from "sonner";
import { IUser } from "@/interface/IUsers";
import Image from "next/image";

const CardRoutineBody: React.FC<{
  refreshRoutines: boolean;
  handleRoutineModify: (routine: IRoutineWizard) => void;
  openModalMod: () => void;
}> = ({ refreshRoutines, handleRoutineModify, openModalMod }) => {
  const initialState: IRoutineItem2 = {
    id: 0,
    description: "",
    name: "",
    startDate: "",
    endDate: "",
    completed: false,
    user: {
      id: "",
      name: "",
      lastname: "",
    },
    trainingDays: [],
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [activeRoutineId, setActiveRoutineId] = useState<number | null>(null);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [listRoutines, setListRoutines] = useState<IRoutineItem[]>([
    initialState,
  ]);

  const toggleModal = (routineId: number) => {
    setActiveRoutineId((prev) => (prev === routineId ? null : routineId));
  };

  const getNameLastNameUser = async (id: string) => {
    // Si ya tenemos el nombre en el estado, lo usamos directamente
    if (userNames[id]) {
      return userNames[id];
    }

    // Si no lo tenemos, hacemos la petición y actualizamos el estado
    const dataUser = await getUserById2(id, "");
    const fullName = `${dataUser.name} ${dataUser.lastName}`;

    // Actualizamos el estado con el nuevo nombre
    setUserNames((prevNames) => ({
      ...prevNames,
      [id]: fullName,
    }));

    return fullName;
  };

  const getDataUser = async (id: string) => {
    //const token = localStorage.getItem("authToken");
    //console.log(token);
    const dataUser = await getUserById2(id, "");
    return dataUser;
  };

  const fetchRoutines = async () => {
    try {
      const token = localStorage.getItem("authToken");
      console.log(token);
      const response = await getRoutinesDB(
        limit,
        currentPage,
        {},
        token ? token : ""
      );
      setTotalPages(calculateTotalPages(response.totalItems, limit));
      setListRoutines(response.items.sort((a, b) => a.id - b.id));
      console.log(response.items);
    } catch (error) {
      console.error("Error fetching exercises, please try again.");
    }
  };

  /*useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);*/

  useEffect(() => {
    //if (user) {
    setLimit(5);
    fetchRoutines();
    //}
  }, []);

  useEffect(() => {}, [listRoutines]);

  useEffect(() => {
    //if (user) {
    fetchRoutines();
    //}
  }, [currentPage, limit, refreshRoutines]);

  function extractDayNumber(dayString: string): number {
    const match = dayString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  const preparedDataRoutine = async (
    routine: IRoutineItem
  ): Promise<IRoutineWizard> => {
    const user: IUser = await getDataUser(routine.user.id);
    const data: IRoutineWizard = {
      routineData: {
        id: routine.id,
        userId: routine.user.id,
        userName: user.name,
        userLastName: user.lastName,
        name: routine.name,
        startDate: routine.startDate,
        endDate: routine.endDate,
        description: routine.description,
      },
      trainingDays: routine.trainingDays.map((day) => {
        return {
          dayNumber: extractDayNumber(day.date),
          muscleGroup: day.description,
          exercises: day.exercises.map((exercise) => {
            return {
              exerciseId: exercise.exercise.id.toString(),
              exerciseName: exercise.exercise.name,
              series: exercise.series,
              repetitions: exercise.repetitions,
              weight: parseInt(exercise.weight),
            };
          }),
        };
      }),
    };
    return data;
  };

  const handleClickDelete = async (id: number) => {
    const token = localStorage.getItem("authToken");
    console.log(token);

    await showGenericAlert({
      title: "Are you sure?",
      text: "Do you really want to delete this routine?",
      icon: "warning",
      buttons: [
        {
          text: "Confirm",
          action: async () => {
            const toastId = toast.loading("Deleting routine..."); // Muestra el toast de carga

            try {
              await deleteRoutineById(id, token ? token : "");
              fetchRoutines();

              // Muestra el toast de éxito
              toast.success("Routine deleted successfully", { id: toastId });
            } catch (error) {
              // Muestra el toast de error en caso de que falle la eliminación
              toast.error(
                "An error occurred while deleting the routine. Please try again.",
                { id: toastId }
              );
            }
          },
          isConfirm: true,
        },
        {
          text: "Cancel",
          action: () => {
            toast.info("Routine deletion cancelled");
          },
          isConfirm: false,
        },
      ],
    });
  };

  useEffect(() => {
    const fetchUserName = async (id: string) => {
      if (userNames[id]) {
        return;
      }

      try {
        const name = await getNameLastNameUser(id);
        setUserNames((prevNames) => ({
          ...prevNames,
          [id]: name,
        }));
      } catch (error) {
        console.error(`Error fetching user name for ID ${id}:`, error);
      }
    };

    listRoutines.forEach((routine) => {
      if (!userNames[routine.user.id]) {
        fetchUserName(routine.user.id);
      }
    });
  }, [listRoutines, userNames]);

  return (
    <>
      <div className="container mx-auto">
        {/* If there are no routines */}
        {!listRoutines ||
          listRoutines.length === 0 ||
          (listRoutines[0].id == 0 && (
            <ItemInfo>
              <p className="text-gray-500 font-semibold text-center">
                No results found. Please try with other filter.
              </p>
            </ItemInfo>
          ))}

        {/* Listado de rutinas */}
        {listRoutines.length > 0 &&
          !(listRoutines[0].id == 0) &&
          listRoutines.map((routine, i) => (
            <div
              key={routine.id}
              className="card flex flex-col md:flex-row bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4 mb-4"
            >
              {/* Icon Section */}
              <div className="flex-shrink-0 p-4">
                <Image
                  src="/images/icono-routine.png"
                  alt="Routine icon"
                  width={64}
                  height={64}
                  className="w-16 h-16 md:w-24 md:h-24"
                />
              </div>

              {/* Main Content */}
              <div className="flex flex-col justify-between p-4 w-full space-y-2">
                {/* Title and Description */}
                <div>
                  <h2 className="text-gray-800 text-lg md:text-xl font-bold">
                    #
                    {currentPage === 1
                      ? i + 1
                      : (currentPage - 1) * limit + (i + 1)}{" "}
                    {routine.name}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    {routine.description}
                  </p>
                </div>

                {/* User Info and Dates */}
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-2">
                    <FaUser className="text-gray-500 text-lg" />
                    <span className="text-gray-800 font-semibold">
                      {userNames[routine.user.id] || "Loading..."}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-xs">
                      {routine.startDate}
                    </span>
                    <FaChevronRight className="text-gray-400" />
                    <span className="bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-xs">
                      {routine.endDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-between p-4 space-y-4 md:space-y-0 md:flex-row md:justify-evenly">
                <div className="flex space-x-2">
                  <div className="flex flex-col px-4 items-center">
                    <ButtonActions
                      status="edit"
                      size="md"
                      tooltip="Edit routine"
                      onClick={async () => {
                        const routineWizard = await preparedDataRoutine(
                          routine
                        );
                        handleRoutineModify(routineWizard);
                        openModalMod();
                      }}
                    />
                    <ButtonActions
                      status="delete"
                      size="md"
                      tooltip="Delete routine"
                      onClick={() => handleClickDelete(routine.id)}
                    />
                  </div>
                </div>

                <ButtonPrimary
                  onClick={() => toggleModal(routine.id)}
                  type="button"
                  text="Training Days"
                  className="bg-gray-500 hover:bg-gray-600"
                />
              </div>

              {/* Modal rendering based on active routine ID */}
              {activeRoutineId === routine.id && (
                <ModalCardRoutine
                  onClose={() => toggleModal(routine.id)}
                  title="Training days of Routine"
                >
                  <div className="space-y-6">
                    {routine.trainingDays
                      .sort((a, b) => {
                        const dayNumberA = parseInt(a.date.replace("Day ", ""));
                        const dayNumberB = parseInt(b.date.replace("Day ", ""));
                        return dayNumberA - dayNumberB;
                      })
                      .map((day, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 p-4 rounded-lg shadow-sm"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-gray-700 flex items-center">
                              <FaCalendarAlt className="text-primary mr-2" />
                              {day.date}
                            </h3>
                            <p className="text-gray-500">{day.description}</p>
                          </div>

                          <table className="table-auto w-full text-sm bg-white rounded-lg overflow-hidden shadow-sm">
                            <thead className="bg-gray-400 text-white">
                              <tr>
                                <th className="px-4 py-2 text-left">
                                  Exercise
                                </th>
                                <th className="px-4 py-2 text-center">
                                  Series
                                </th>{" "}
                                {/* Alineación centrada */}
                                <th className="px-4 py-2 text-center">
                                  Repetitions
                                </th>{" "}
                                {/* Alineación centrada */}
                                <th className="px-4 py-2 text-center">
                                  Weight
                                </th>{" "}
                                {/* Alineación centrada */}
                              </tr>
                            </thead>
                            <tbody>
                              {day.exercises.map((exercise, idx) => (
                                <tr key={idx} className="border-b">
                                  <td className="px-4 py-2 text-gray-700 flex items-center">
                                    <FaDumbbell className="text-primary mr-2" />
                                    {exercise.exercise.name}
                                  </td>
                                  <td className="px-4 py-2 text-center text-gray-600">
                                    {exercise.series}
                                  </td>
                                  <td className="px-4 py-2 text-center text-gray-600">
                                    {exercise.repetitions}
                                  </td>
                                  <td className="px-4 py-2 text-center text-gray-600">
                                    {exercise.weight}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                  </div>
                </ModalCardRoutine>
              )}
            </div>
          ))}

        {/* Pagination */}
        {listRoutines.length > 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </>
  );
};

export default CardRoutineBody;
