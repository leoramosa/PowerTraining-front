import {
  IPaginatedRoutines,
  IRoutineData,
  IRoutineDay,
  IRoutineWizard,
} from "@/interface/IRoutine";
import IRoutineResponseById from "@/interface/IResponseRoutineById";
import { IRoutine } from "@/interface/IRoutineClientRequest";
import { ITrainingDayResById, IRoutineResById, IExerciseResById } from "@/interface/IRoutineByUserId";
import { Statistics } from "@/interface/ICounters";
import { IUserResponse } from "@/interface/IUserResponse";
//import exercises from "./exercises";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

/*
Example

{
  "userId": "e9b1b6e0-5117-4f70-82a8-1a34de9f9d38",
  "startDate": "2024-10-01",
  "endDate": "2024-10-07",
  "completed": false,
  "description": "Rutina semanal enfocada en la fuerza de piernas y espalda."
}

{
  "date": "day 1",
  "description": "dia de piernas",
  "routineId": 1
}

{
  "trainingDayId": 1,
  "exerciseId": "69494573-5127-40bf-bb7c-1daa94986f8c",
  "series": 4,
  "repetitions": 12,
  "weight": 45.5,
  "completed": false
}


*/
export async function getRoutinesDB(
  limit: number = 5,
  page: number = 1,
  filtersBy: object,
  token: string
): Promise<IPaginatedRoutines> {
  let url = `${APIURL}/routine?`;

  /*if (filtersBy) {*/
  /*const { name, benefits, tags, status } = filtersBy;
      const queryParams = new URLSearchParams();
      if (name) queryParams.append("name", encodeURIComponent(name));
      if (benefits) queryParams.append("benefits", encodeURIComponent(benefits));
      if (tags) queryParams.append("tags", encodeURIComponent(tags));
      if (status) queryParams.append("status", encodeURIComponent(status));
      url += `&${queryParams.toString()}&limit=${limit}&page=${page}`;*/
  /*} else {*/
  url += `limit=${limit}&page=${page}`;
  /*}*/

  console.log(url);

  try {
    const res = await fetch(url, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(
        `Error fetching routine: ${res.status} ${res.statusText}`
      );
    }
    const resData = await res.json();
    return resData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getRoutineDB:", error);
      throw new Error(`Failed to get routine: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export async function createRoutine(routine: IRoutineWizard) {
  try {
    console.log(routine);
    const token = localStorage.getItem("authToken");
    console.log(token);

    const routineObj = {
      userId: routine.routineData.userId,
      name: routine.routineData.name,
      startDate: routine.routineData.startDate,
      endDate: routine.routineData.endDate,
      completed: false,
      description: routine.routineData.description,
    };

    const res = await fetch(`${APIURL}/routine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(routineObj),
    });

    if (!res.ok) {
      throw new Error(
        `Error fetching routines: ${res.status} ${res.statusText}`
      );
    }

    const routineRes: IRoutineData = await res.json();
    console.log(routineRes);

    const trainingDays = routine.trainingDays.map((day) => {
      return {
        date: "Day " + day.dayNumber,
        description: day.muscleGroup,
        routineId: routineRes.id,
        exercises: day.exercises,
      };
    });

    console.log(trainingDays);

    for (const day of trainingDays) {
      const res2 = await fetch(`${APIURL}/training-days`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: day.date,
          description: day.description,
          routineId: routineRes.id,
        }),
      });

      if (!res2.ok) {
        throw new Error(
          `Error fetching training days: ${res2.status} ${res2.statusText}`
        );
      }

      const trainingDay: IRoutineDay = await res2.json();
      console.log(trainingDay);

      for (const exercise of day.exercises) {
        const res3 = await fetch(`${APIURL}/user-routine-exercises`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            trainingDayId: trainingDay.id,
            exerciseId: exercise.exerciseId,
            series: exercise.series,
            repetitions: exercise.repetitions,
            weight: exercise.weight,
            completed: false,
          }),
        });

        if (!res3.ok) {
          throw new Error(
            `Error fetching exercises in training days: ${res3.status} ${res3.statusText}`
          );
        }
        const response = await res3.json();
        console.log(response);
      }
    }

    //Logica envio de mail
    if (routineObj.startDate && routineObj.endDate) {
      const currentDate = new Date();
      const startDate = new Date(routineObj.startDate);
      const endDate = new Date(routineObj.endDate);
      if (currentDate >= startDate && currentDate <= endDate) {
        console.log("ingreso al if")
        const findUser = await fetch(`${APIURL}/users/${routine.routineData.userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(routine.routineData.userId);
        const resUser:IUserResponse = await findUser.json();
        console.log(resUser);
        const mail = await fetch(`${APIURL}/users/receiveroutinesByEmail/${resUser.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(`${APIURL}/users/receiveroutinesByEmail/${resUser.email}`)
        const resMail = await mail.json();
        console.log(resMail)
      }
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}

export async function deleteRoutineById(id: number | undefined, token: string) {
  if (!id) {
    throw new Error("Routine Id is required");
  }
  try {
    const res = await fetch(`${APIURL}/routine/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to delete routine. Status: ${res.status}`);
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}

export async function getRoutineById(
  id: number | undefined
): Promise<IRoutineResponseById> {
  if (!id) {
    throw new Error("Routine ID is required");
  }
  try {
    const token = localStorage.getItem("authToken");
    console.log(token);
    const res = await fetch(`${APIURL}/routine/${id}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch routine by id. Status: ${res.status}`);
    }
    const routine: IRoutineResponseById = await res.json();
    if (!routine || Object.keys(routine).length === 0) {
      throw new Error("Exercise not found");
    }
    return routine;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}

export async function modifyRoutineById(id: number | undefined, routine: IRoutineWizard) {
  try {

    if (!id) {
      throw new Error("Routine ID is required");
    }

    const token = localStorage.getItem("authToken");
    console.log(token);

    const routineObj = {
      name: routine.routineData.name,
      description: routine.routineData.description,
      startDate: routine.routineData.startDate,
      endDate: routine.routineData.endDate,
      completed: false,
    };

    const res = await fetch(`${APIURL}/routine/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(routineObj),
    });

    if (!res.ok) {
      throw new Error(
        `Error fetching routines: ${res.status} ${res.statusText}`
      );
    }

    const routineRes: IRoutineData = await res.json();
    console.log(routineRes);

    //BORRA LOS TRAINING DAYS YA QUE HAY QUILOMBO AL MODIFICAR CON PATCH
    const routineRecupered = await getRoutineById(routineRes.id);
    for (const day of routineRecupered.trainingDays) {
      const res2 = await fetch(`${APIURL}/training-days/${day.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });

      if (!res2.ok) {
        throw new Error(
          `Error fetching training days: ${res2.status} ${res2.statusText}`
        );
      }
    }

    //CREA NUEVOS TRAINING DAYS EN LA RUTINA QUE YA TENEMOS
    const trainingDays = routine.trainingDays.map((day) => {
      return {
        date: "Day " + day.dayNumber,
        description: day.muscleGroup,
        routineId: routineRes.id,
        exercises: day.exercises,
      };
    });

    console.log(trainingDays);

    for (const day of trainingDays) {
      const res3 = await fetch(`${APIURL}/training-days`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: day.date,
          description: day.description,
          routineId: routineRes.id,
        }),
      });

      if (!res3.ok) {
        throw new Error(
          `Error fetching training days: ${res3.status} ${res3.statusText}`
        );
      }

      const trainingDay: IRoutineDay = await res3.json();
      console.log(trainingDay);

      for (const exercise of day.exercises) {
        const res4 = await fetch(`${APIURL}/user-routine-exercises`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            trainingDayId: trainingDay.id,
            exerciseId: exercise.exerciseId,
            series: exercise.series,
            repetitions: exercise.repetitions,
            weight: exercise.weight,
            completed: false,
          }),
        });

        if (!res4.ok) {
          throw new Error(
            `Error fetching exercises in training days: ${res4.status} ${res4.statusText}`
          );
        }
        const response = await res4.json();
        console.log(response);
      }
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}


export async function getRoutinesByUserId(
  id: string | undefined
): Promise<IRoutine[]> {
  if (!id) {
    throw new Error("User ID is required");
  }

  try {
    const token = localStorage.getItem("authToken");
    if (!token) {
      throw new Error("No authentication token found");
    }

    const res = await fetch(`${APIURL}/routine/user/${id}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch routine by id. Status: ${res.status}`);
    }

    const routines: IRoutineResById  = await res.json();

    // Verificar la estructura de `routine` aquí
    if (!routines || !Array.isArray(routines)) {
      throw new Error("Unexpected routine structure received");
    }

    const routinesByUser2 = routines.map((routine) => ({
      id: routine.id,
      name: routine.name,
      description: routine.description,
      startDate: routine.startDate,
      endDate: routine.endDate,
      completed: routine.completed,
      trainingDays: routine.trainingDays.map((training: ITrainingDayResById) => ({
        id: training.id,
        date: training.date,
        description: training.description,
        exercises: training.exercises.map((exe: IExerciseResById) => ({
          id: exe.id,
          series: exe.series,
          repetitions: exe.repetitions,
          weight: exe.weight,
          completed: exe.completed,
          rpe: exe.rpe ?? null,
          exercise: exe.exercise,
        })),
      })),
    }));

    return routinesByUser2; 
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}



//######################################################################
//Client requests


export async function modifyTrainingExerciseById(id: number | undefined, token: string, rpe: number | null) {
  if (!id) {
    throw new Error("Training id is required");
  }
  if(!rpe){
    throw new Error("Trainig data rpe is required");
  }
  console.log(rpe)
  try {
    const res = await fetch(`${APIURL}/user-routine-exercises/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        completed: true,
        rpe: rpe
      })
    });
    if (!res.ok) {
      throw new Error(`Failed to modify this training exercise. Status: ${res.status}`);
    }
    console.log("pegando al enpoind ok")
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}


export async function modifyRoutineCompletedById(id: number | undefined, token: string): Promise<IRoutine> {
  if (!id) {
    throw new Error("Routine id is required");
  }
  const routine = await getRoutineById(id);
  try {
    const res = await fetch(`${APIURL}/routine/${id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: routine.name,
        description: routine.description,
        startDate: routine.startDate,
        endDate: routine.endDate,
        completed: true
      })
    });
    if (!res.ok) {
      throw new Error(`Failed to modify this training exercise. Status: ${res.status}`);
    }
    const newRoutine = res.json();
    return newRoutine;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}

export async function getCountersHome(): Promise<Statistics> {
  try {
    const token = localStorage.getItem("authToken");
    console.log(token);
    const res = await fetch(`${APIURL}/routine/statistics`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch routine stattics. Status: ${res.status}`);
    }
    const counters: Statistics = await res.json();
    return counters;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}