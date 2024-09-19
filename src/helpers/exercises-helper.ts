//const APIURL = process.env.NEXT_PUBLIC_API_URL
import exercises from "./exercises";
import { IExercise } from "@/interface/IExercise"

export async function getExercisesDB(): Promise<IExercise[]> {
    try {
        //const res = await fetch(`${APIURL}/products`, {next: {revalidate: 1200}})
        //const products: IExercise[] = await res.json();
        return exercises;
    } catch(error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}


export async function getExerciseById(id: number | undefined): Promise<IExercise> {
    try {
        //const res = await fetch(`${APIURL}/products`, {next: {revalidate: 1200}})
        //const products: IExercise[] = await res.json();
        const exercises: IExercise[] = await getExercisesDB();
        const exerciseFiltered: IExercise | undefined = exercises.find((exercise)=> exercise.id == id);
        if(!exerciseFiltered) throw new Error("Exercise not found");      
        return exerciseFiltered;
    } catch(error: unknown) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}