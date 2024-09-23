import ExercisePage from "@/components/Pages/ExercisePage/ExercisePage";
import { getExercisesDB } from "@/helpers/exercises-helper";
import { IExercise } from "@/interface/IExercise";
import IExerciseData from "@/interface/IExerciseData";

export default async function Exercise() {
  const dataExercises: IExerciseData = await getExercisesDB();
  return (
    <ExercisePage {...dataExercises}  />
  );
}
