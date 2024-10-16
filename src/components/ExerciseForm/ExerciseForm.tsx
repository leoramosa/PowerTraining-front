import React, { useEffect, useState } from "react";
import {
  Exercise,
  ExerciseFormProps,
  IExercisePartial,
  TrainingDay,
} from "@/interface/IRoutine";
import ExerciseSearchInput from "@/components/ExerciseSearchInput/ExerciseSearchInput";
import SelectForm from "../inputs/SelectForm/SelectForm";
import ButtonPrimary from "../buttons/ButtonPrimary/ButtonPrimary";
import TitleH2 from "../titles/TitleH2";
import { toast } from "sonner";

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  onAddExercise,
  onRemoveExercise,
  trainingDays,
}) => {
  const [selectedExercise, setSelectedExercise] =
    useState<IExercisePartial | null>(null);
  const [series, setSeries] = useState(0);
  const [repetitions, setRepetitions] = useState(0);
  const [weight, setWeight] = useState(0);
  const [exercisesByDay, setExercisesByDay] = useState<
    Record<number, Exercise[]>
  >({});
  const [selectedDay, setSelectedDay] = useState<TrainingDay | null>(null);

  function hasExercises(trainingDays: TrainingDay[]): boolean {
    return trainingDays.some(
      (day) => day.exercises && day.exercises.length > 0
    );
  }

  function getExercisesByDay(
    trainingDays: TrainingDay[]
  ): Record<number, Exercise[]> {
    return trainingDays.reduce((acc, day) => {
      if (day.exercises && day.exercises.length > 0) {
        acc[day.dayNumber] = day.exercises;
      }
      return acc;
    }, {} as Record<number, Exercise[]>);
  }

  useEffect(() => {
    if (hasExercises(trainingDays)) {
      const exercisesGroupedByDay = getExercisesByDay(trainingDays);
      setExercisesByDay(exercisesGroupedByDay);
    }
  }, []);

  /*const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedExercise && selectedDay) {
      const newExercise: Exercise = {
        exerciseId: selectedExercise.id,
        exerciseName: selectedExercise.name,
        series,
        repetitions,
        weight,
      };
      setExercisesByDay((prev) => ({
        ...prev,
        [selectedDay.dayNumber]: [...(prev[selectedDay.dayNumber] || []), newExercise],
      }));

      onAddExercise(selectedDay.dayNumber, newExercise);
      setSelectedExercise(null);
      setSelectedDay(null);
      setSeries(0);
      setRepetitions(0);
      setWeight(0);
    }
  };*/

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("------------------ selectedDay",selectedDay)
    console.log("------------------ selectedExercise",selectedExercise)
    if (selectedExercise && selectedDay) {
      const newExercise: Exercise = {
        exerciseId: selectedExercise.id,
        exerciseName: selectedExercise.name,
        series,
        repetitions,
        weight,
      };
      const existingExercises = exercisesByDay[selectedDay.dayNumber] || [];
      const isDuplicate = existingExercises.some(
        (exercise) => exercise.exerciseName === newExercise.exerciseName
      );

      if (isDuplicate) {
        toast.error(
          `The exercise ${newExercise.exerciseName} is already assigned for day ${selectedDay.dayNumber}`
        );
        return;
      }
      setExercisesByDay((prev) => ({
        ...prev,
        [selectedDay.dayNumber]: [
          ...(prev[selectedDay.dayNumber] || []),
          newExercise,
        ],
      }));
      onAddExercise(selectedDay.dayNumber, newExercise);
      setSelectedExercise(null);
      setSelectedDay(null);
      setSeries(0);
      setRepetitions(0);
      setWeight(0);
    } else {
      toast.error("Please fill out all required fields before proceeding to add a new day.");
    }
  };

  useEffect(() => {
    console.log(">>>>>>>>>>>>>> exercisesByDay actualizado: ", exercisesByDay);
  }, [exercisesByDay]);

  const removeExercise = (
    dayNumber: number,
    index: number,
    exercise: Exercise
  ) => {
    console.log("dayNumber", dayNumber);
    console.log("index", index);

    setExercisesByDay((prev) => {
      const updatedDayExercises =
        prev[dayNumber]?.filter((_, i) => i !== index) || [];
      if (updatedDayExercises.length > 0) {
        return {
          ...prev,
          [dayNumber]: updatedDayExercises,
        };
      } else {
        const updatedExercisesByDay = { ...prev };
        delete updatedExercisesByDay[dayNumber];
        return updatedExercisesByDay;
      }
    });
    onRemoveExercise(dayNumber, exercise);
  };

  const handleSeriesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setSeries(value); 
  };
  
  const handleRepetitionsChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setRepetitions(value);
  };
  
  const handleWeightChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setWeight(value); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="border rounded-md p-2">
        <TitleH2># Step 3: Add Exercises in Training Days</TitleH2>
        <div className="flex items-end space-x-2 ">
          <div className="w-full">
            <SelectForm
              name="trainingDay"
              label="Select Training Day"
              value={selectedDay?.dayNumber || ""}
              onChange={(name: string, value: string | number) => {
                const dayNumber = Number(value);
                const day = trainingDays.find((d) => d.dayNumber === dayNumber);
                setSelectedDay(day || null);
              }}
              options={[
                { label: "Selected day", value: "", disabled: true }, 
                ...trainingDays
                  .sort((a, b) => a.dayNumber - b.dayNumber)
                  .map((day) => ({
                    label: `Day ${day.dayNumber} - ${day.muscleGroup}`,
                    value: day.dayNumber,
                  })),
              ]}
            />
          </div>
          <div className="w-full">
            <ExerciseSearchInput
              exercises={[]}
              onExerciseSelect={setSelectedExercise}
              onChangeFilter={(value) =>
                console.log("............... Filtering exercises by:", value)
              }
              placeholder="Filter exercises by name"
              loading={false}
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex flex-col">
              <label className="block text-gray-500 text-semibold text-xs 
         mb-1">
                Series
              </label>
              <input
                type="number"
                value={series}
                onChange={handleSeriesChange}
                className="w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate border-gray-300 focus:border-primary focus:outline-none transition duration-300"
                min="0"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-500 text-semibold text-xs 
         mb-1">
                Repetitions
              </label>
              <input
                type="number"
                value={repetitions}
                onChange={handleRepetitionsChange}
                className="w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate border-gray-300 focus:border-primary focus:outline-none transition duration-300"
                min="0"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-500 text-semibold text-xs 
         mb-1">
                Weight
              </label>
              <input
                type="number"
                value={weight}
                onChange={handleWeightChange}
                className="w-full bg-lightGray text-dark text-sm py-2 px-2 rounded-md border truncate border-gray-300 focus:border-primary focus:outline-none transition duration-300"
                min="0"
              />
            </div>
          </div>
          <div>
            <ButtonPrimary
              text="Add"
              type="submit"
              disabled={
                !selectedExercise ||
                !selectedDay ||
                !series ||
                !repetitions ||
                !weight
              }
            />
          </div>
        </div>
      </form>

      {/* Vista previa por día */}
      <div className="py-1">
        {Object.keys(exercisesByDay).map((dayNumber) => {
          const day = trainingDays.find(
            (d) => d.dayNumber === Number(dayNumber)
          );
          return (
            <div key={dayNumber} className="my-4">
              <h2 className="text-md font-semibold text-primary">
                {`# Day ${dayNumber} > ${day?.muscleGroup || ""}`}
              </h2>
              {exercisesByDay[Number(dayNumber)].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-0 px-2 my-1 border-b border-gray-300 bg-gray-50 hover:bg-gray-100 rounded-lg shadow-sm transition-colors duration-200"
                >
                  <div className="text-sm font-medium text-gray-800">
                    <span className="font-semibold text-gray-900">
                      {item.exerciseName}
                    </span>{" "}
                    <span className="text-gray-600"> - Series:</span>{" "}
                    {item.series} -<span className="text-gray-600"> Reps:</span>{" "}
                    {item.repetitions} -
                    <span className="text-gray-600"> Weight:</span>{" "}
                    {item.weight} kg
                  </div>
                  <button
                    onClick={() =>
                      removeExercise(Number(dayNumber), index, item)
                    }
                    className="text-red-500 hover:text-red-700 ml-4 p-2 rounded-full transition-colors duration-200"
                    aria-label="Remove exercise"
                  >
                    ✖
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExerciseForm;
