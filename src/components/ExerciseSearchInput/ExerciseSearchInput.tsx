import React, { useState, useEffect } from "react";
import {
  IExercisePartial,
  ExerciseSearchInputProps,
} from "@/interface/IRoutine";
import { FaSearch, FaTimes } from "react-icons/fa";
import { getExercisesDB } from "@/helpers/exercises-helper";
import { IExercise } from "@/interface/IExercise";

const ExerciseSearchInput: React.FC<ExerciseSearchInputProps> = ({
  onExerciseSelect,
  onChangeFilter,
  placeholder = "Filter exercises by name",
  error = false,
  label = "Select Exercise",
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedExercise, setSelectedExercise] =
    useState<IExercisePartial | null>(null);
  const [exercises, setExercises] = useState<IExercisePartial[]>([]);
  const [loadingState, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (inputValue) {
        fetchExercises(inputValue);
      } else {
        setExercises([]); 
      }
    }, 300); 

    return () => {
      clearTimeout(handler); 
    };
  }, [inputValue]);

  const fetchExercises = async (filterValue: string) => {
    setLoading(true); 
    try {
      const exerciseData = await getExercisesDB(10, 1, { name: filterValue });
      const transformToPartialExercises = (exercises: IExercise[]): IExercisePartial[] =>
        exercises.map(({ id, name }) => ({
          id,
          name,
        }));

      const partialExercises: IExercisePartial[] = exerciseData.data
        ? transformToPartialExercises(exerciseData.data)
        : [];
      setExercises(partialExercises);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error fetching exercises:", errorMessage);
    } finally {
      setLoading(false); 
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChangeFilter(value); 
  };

  const handleExerciseSelect = (exercise: IExercisePartial) => {
    setSelectedExercise(exercise);
    console.log("exercise selected",exercise)
    setInputValue(exercise.name); 
    onExerciseSelect(exercise);
    onChangeFilter(""); 
  };

  const handleClearSelection = () => {
    setSelectedExercise(null);
    setInputValue(""); 
    onChangeFilter(""); 
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative">
      {label && (
        <label className="block text-gray-500 text-semibold text-xs mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={selectedExercise ? selectedExercise.name : inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full bg-lightGray text-dark text-sm py-2 pl-2 pr-10 rounded-md border ${
            error ? "border-red-600 border" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300`}
        />

        {/* Icono de lupa al final del input */}
        <div className="absolute inset-y-0 right-2 flex items-center">
          <button type="button" onClick={() => handleInputChange}>
            <FaSearch />
          </button>
        </div>

        {/* Icono de 'x' para limpiar selección */}
        {selectedExercise && (
          <div
            className="absolute inset-y-0 right-8 flex items-center pr-2 cursor-pointer"
            onClick={handleClearSelection}
          >
            <FaTimes />
          </div>
        )}
      </div>

      {/* Listado de ejercicios filtrados */}
      {loadingState ? (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md">
          <p className="text-center py-2">Find...</p>
        </div>
      ) : (
        filteredExercises.length > 0 &&
        !selectedExercise && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-48 overflow-y-auto">
            {filteredExercises.map((exercise) => (
              <li
                key={exercise.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleExerciseSelect(exercise)}
              >
                {exercise.name}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default ExerciseSearchInput;
