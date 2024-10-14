import { IRoutineWizard } from "@/interface/IRoutine";
import React from "react";
import TitleH2 from "../titles/TitleH2";

const SummaryRoutine: React.FC<IRoutineWizard> = (routine) => {
  return (
    <div className="space-y-3">
      {/* Título del Resumen */}
      <TitleH2># Step 4: Confirm Routine Summary</TitleH2>
      {/* Información del Usuario y la Rutina */}
      <div className="space-y-1">
        {routine.routineData.userName ? (
          <p className="text-sm">
            <strong>User:</strong> {routine.routineData.userName}{" "}
            {routine.routineData.userLastName}
          </p>
        ) : (
          <p className="text-gray-500 text-sm">Loading user data...</p>
        )}
        <p className="text-sm">
          <strong>Routine Name:</strong> {routine.routineData.name}
        </p>
        <p className="text-sm">
          <strong>Start Date:</strong> {routine.routineData.startDate}
        </p>
        <p className="text-sm">
          <strong>End Date:</strong> {routine.routineData.endDate}
        </p>
        <p className="text-sm">
          <strong>Description:</strong> {routine.routineData.description}
        </p>
      </div>

      {/* Sección de Días de Entrenamiento */}
      <div className="border-t pt-4 space-y-4 max-h-64 overflow-y-auto">
        {routine.trainingDays.length === 0 ? (
          <p className="text-gray-500 text-sm">
            You haven't added any training days yet.
          </p>
        ) : (
          <div className="space-y-6">
            {routine.trainingDays.map((day, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-sm font-bold text-secondary">
                  Day {day.dayNumber}: {day.muscleGroup}
                </h3>
                {day.exercises.length === 0 ? (
                  <p className="text-gray-500">
                    You haven't added any exercises for this day.
                  </p>
                ) : (
                  <ul className="list-disc list-inside space-y-1">
                    {day.exercises.map((exercise, idx) => (
                      <li key={idx} className="ml-4 text-sm">
                        <strong>{exercise.exerciseName}</strong>:{" "}
                        {exercise.series} series, {exercise.repetitions} reps,{" "}
                        {exercise.weight} kg
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryRoutine;
