import ExercisePage from "@/components/Pages/ExercisePage/ExercisePage";
import { getExercisesDB } from "@/helpers/exercises-helper";
import { IExercise } from "@/interface/IExercise";

export default async function Exercise() {
  const exercises: IExercise[] = await getExercisesDB();
  
  return (
    <ExercisePage exercises={exercises} />
  );
}
