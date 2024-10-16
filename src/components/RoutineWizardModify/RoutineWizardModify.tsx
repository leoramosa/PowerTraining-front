"use client";
import React, { useEffect, useState } from "react";
import RoutineForm from "@/components/RoutineForm/RoutineForm";
import TrainingDayForm from "@/components/TrainingDayForm/TrainingDayForm";
import ExerciseForm from "@/components/ExerciseForm/ExerciseForm";
import SummaryRoutine from "@/components/SummaryRoutine/SummaryRoutine";
import ButtonPrimary from "../buttons/ButtonPrimary/ButtonPrimary";
import {
  Exercise,
  IRoutineForm,
  IRoutineWizard,
  RoutineWizardProps2,
  TrainingDay,
} from "@/interface/IRoutine";
import { toast } from "sonner";
import { modifyRoutineById } from "@/helpers/routine-helper"

const RoutineWizardModify: React.FC<RoutineWizardProps2> = ({
  closeModal,
  nameModal,
  onRoutineModify,
  routineMod,
}) => {
  const [step, setStep] = useState(1);
  const [routineData, setRoutineData] = useState<IRoutineForm>(
    routineMod.routineData
  );
  const [trainingDays, setTrainingDays] = useState<TrainingDay[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [routine, setRoutine] = useState<IRoutineWizard>(routineMod);
  const [buttonConfirmDisabled, setButtonConfirmDisabled] = useState<boolean>(false)

  //console.log(routineMod)
  const nextStep = () => setStep((prevStep) => prevStep + 1);
  //const prevStep = () => setStep((prevStep) => prevStep - 1);

  useEffect(() => {
    if (routineMod) {
      setRoutineData(routineMod.routineData);
      setTrainingDays(routineMod.trainingDays);
  
      if (routineMod.trainingDays) {
        const selectedDayNumbers = routineMod.trainingDays.map((day) => day.dayNumber);
        setSelectedDays(selectedDayNumbers);
      }
    }
    /*routineMod && setRoutineData(routineMod.routineData);
    routineMod && setTrainingDays(routineMod.trainingDays);
    routineMod && selectedDays(trainingDays.map((day) => day.dayNumber));*/
  }, [routineMod]);

  const handleRoutineForm = (dataRoutine: IRoutineForm) => {
    setRoutineData(dataRoutine);
    const newRoutine: IRoutineWizard = {
      routineData: dataRoutine,
      trainingDays,
    };
    setRoutine(newRoutine);
    console.log("Datos recibidos en handleRoutineForm:", dataRoutine);
    nextStep();
  };

  const handleAddExercise = (dayIndex: number, exerciseData: Exercise) => {
    console.log(">>>>>>>>> Exercise agregar nuevo: ", exerciseData)
    const newDays = trainingDays.map((day) => ({
      ...day,
      exercises: [...day.exercises],
    }));
    newDays[dayIndex - 1].exercises.push(exerciseData);
    setTrainingDays(newDays);
  };

  const handleRemoveExercise = (dayIndex: number, exerciseData: Exercise) => {
    console.log(">>>>>>>>> Exercise a borrar: ", exerciseData)
    const newDays = trainingDays.map((day) => ({
      ...day,
      exercises: [...day.exercises],
    }));
    newDays[dayIndex - 1].exercises = newDays[dayIndex - 1].exercises.filter(
      (exercise) => exercise.exerciseId !== exerciseData.exerciseId
    );
    setTrainingDays(newDays);
  };

  useEffect(() => {
    console.log(">>>>>>>>>>>>>> trainingDays actualizado: ", trainingDays);
  }, [trainingDays]);

  const handleDaysExercises = () => {
    console.log(trainingDays);
    const newRoutine: IRoutineWizard = {
      routineData,
      trainingDays,
    };

    setRoutine(newRoutine);
    nextStep();
    console.log("Datos recibidos en handleDaysExercises:", newRoutine);
  };

  const handleAddDay = (newDay: TrainingDay) => {
    setTrainingDays((prevDays) => [...prevDays, { ...newDay, exercises: [] }]);
    setSelectedDays((prevDays) => [...prevDays, newDay.dayNumber]);
  };

  const handleRemoveDay = (dayNumber: number) => {
    setTrainingDays((prevDays) =>
      prevDays.filter((day) => day.dayNumber !== dayNumber)
    );
    setSelectedDays((prevDays) => prevDays.filter((day) => day !== dayNumber)); // Remover el día de los seleccionados
  };

  const handleConfirm = async () => {
    setButtonConfirmDisabled(true)
    const newRoutine: IRoutineWizard = {
      routineData,
      trainingDays,
    };
    setRoutine(newRoutine);
    try {
      await modifyRoutineById(routine.routineData.id, routine);
      closeModal();
      toast.success("Routine modify successfully!");
      onRoutineModify();
    } catch (error) {
      toast.error(
        "An error occurred while modify the routine. Please try again."
      );
    }
  };

  function hasExercises(trainingDays: TrainingDay[]): boolean {
    return trainingDays.every(
      (day) => day.exercises && day.exercises.length > 0
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div>
        {/* Contenedor del contenido del modal */}
        <h1 className="text-2xl font-semibold">{nameModal}</h1>
        <hr className="my-3"></hr>
        <div className="overflow-auto max-h-[70vh]">
          {step === 1 && (
            <RoutineForm
              onSubmit={handleRoutineForm}
              routineData={routineData}
              disabledSearchUser={true}
            />
          )}
          {step === 2 && (
            <div>
              <TrainingDayForm
                onAddDay={handleAddDay}
                selectedDays={selectedDays}
              />
              {trainingDays.length > 0 && (
                <div className="mt-2">
                  <div className="flex flex-wrap space-x-2 mt-1">
                    {trainingDays.map((day, index) => (
                      <span
                        key={index}
                        className="flex items-center justify-between py-1 px-2 my-1 border-b border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm transition-colors duration-200"
                      >
                        <span>{`Day ${day.dayNumber}: ${day.muscleGroup}`}</span>
                        <button
                          className="text-red-500 hover:text-red-700 pl-5"
                          onClick={() => handleRemoveDay(day.dayNumber)}
                        >
                          ✕
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex flex-row justify-end">
                <ButtonPrimary
                  text="Next"
                  disabled={trainingDays.length === 0}
                  onClick={nextStep}
                />
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <ExerciseForm
                onAddExercise={(dayIndex: number, exerciseData: Exercise) =>
                  handleAddExercise(dayIndex, exerciseData)
                }
                onRemoveExercise={(dayIndex: number, exerciseData: Exercise) =>
                  handleRemoveExercise(dayIndex, exerciseData)
                }
                trainingDays={trainingDays}
              />
              {!hasExercises(trainingDays) && (
                <p className="text-red-500 mt-2">
                  Every day must have at least one exercise to continue.
                </p>
              )}
              <div className="flex flex-row justify-end my-2">
                <ButtonPrimary
                  text="Next"
                  disabled={!hasExercises(trainingDays)}
                  onClick={handleDaysExercises}
                />
              </div>
            </div>
          )}
        </div>
        {step === 4 && (
          <div>
            <SummaryRoutine {...routine} />
            <div className="flex flex-row justify-end my-2">
            <ButtonPrimary
                type="button"
                text={buttonConfirmDisabled ? "Save..." : "Modify Routine"}
                onClick={handleConfirm}
                disabled={buttonConfirmDisabled}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoutineWizardModify;
