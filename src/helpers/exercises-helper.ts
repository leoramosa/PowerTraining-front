const APIURL = process.env.NEXT_PUBLIC_API_URL;
import { IExercise } from "@/interface/IExercise";
import { IExerciseData, IExerciseDataSend } from "@/interface/IExerciseData";
import { IFiltersExercises } from "@/interface/IPagDataFilters";

export async function getExercisesDB(
  limit: number = 5,
  page: number = 1,
  filtersBy: IFiltersExercises = {}
): Promise<IExerciseData> {
  let url = `${APIURL}/exercises?`;
  const token = localStorage.getItem("authToken");
  console.log(token);

  if (filtersBy) {
    const { name, benefits, tags, status } = filtersBy;
    const queryParams = new URLSearchParams();
    if (name) queryParams.append("name", encodeURIComponent(name));
    if (benefits) queryParams.append("benefits", encodeURIComponent(benefits));
    if (tags) queryParams.append("tags", encodeURIComponent(tags));
    if (status) queryParams.append("status", encodeURIComponent(status));
    url += `&${queryParams.toString()}&limit=${limit}&page=${page}`;
  } else {
    url += `limit=${limit}&page=${page}`;
  }

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
        `Error fetching exercises: ${res.status} ${res.statusText}`
      );
    }
    const resData = await res.json();
    return resData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error in getExercisesDB:", error);
      throw new Error(`Failed to get exercises: ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
}

export async function getExerciseById(
  id: string | undefined
): Promise<IExercise> {
  if (!id) {
    throw new Error("Exercise ID is required");
  }
  try {
    const token = localStorage.getItem("authToken");
    console.log(token);
    const res = await fetch(`${APIURL}/exercises/${id}`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch exercise. Status: ${res.status}`);
    }
    const exercise: IExercise = await res.json();
    if (!exercise || Object.keys(exercise).length === 0) {
      throw new Error("Exercise not found");
    }
    return exercise;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}

export async function createExercise(exercise: IExercise): Promise<IExercise> {
  try {
    console.log(exercise);
    const token = localStorage.getItem("authToken");
    console.log(token);

    // Subir el video si existe
    if (exercise.video) {
      //console.log(exercise.urlVideoExample)
      const urlVideoExample = await uploadVideo(exercise.video);
      console.log(urlVideoExample);
      if (urlVideoExample) {
        exercise.urlVideoExample = urlVideoExample;
        console.log(exercise.urlVideoExample)
      }
    }

    const exerciseData: IExerciseDataSend = {
      name: exercise.name,
      description: exercise.description,
      benefits: exercise.benefits,
      tags: exercise.tags,
    };

    if (exercise.urlVideoExample) {
      exerciseData.urlVideoExample = exercise.urlVideoExample;
    } else {
      exerciseData.urlVideoExample = "https://res.cloudinary.com/ddg6xrmwh/image/upload/v1727721408/r4bzkoazd9gewesa2bah.png";
    }

    const res = await fetch(`${APIURL}/exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(exerciseData),
    });

    if (!res.ok) {
      throw new Error(
        `Error fetching exercises: ${res.status} ${res.statusText}`
      );
    }

    const exerciseRes: IExercise = await res.json();
    return exerciseRes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating exercise:", error);
    throw new Error(error.message || "Error desconocido");
  }
}

async function uploadVideo(file: File) {
  const formData = new FormData();
  formData.append("video", file);
  const token = localStorage.getItem("authToken");
    console.log(token);

  try {
    const response = await fetch(`${APIURL}/files/uploadVideo`, {
      method: "POST",
      body: formData,
      headers: {
        //"Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Error update video");
    }
    const result = await response.text();
    console.log("############################################:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function deleteExerciseById(id: string | undefined) {
  //token: string
  if (!id) {
    throw new Error("Exercise ID is required");
  }
  try {
    const token = localStorage.getItem("authToken");
    console.log(token);

    const res = await fetch(`${APIURL}/exercises/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to delete exercise. Status: ${res.status}`);
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}

export async function modifyExerciseById(
  exercise: IExercise
): Promise<IExercise> {
  //token: string
  const token = localStorage.getItem("authToken");
  console.log(token);
  let uploadOk = false;
  console.log("url imagen anterior ",exercise.urlVideoExample )
  console.log(exercise.video)
  try {
    if (exercise.video && exercise.video.name && exercise.video.name.endsWith(".mp4")) {
      const urlVideoExample = await uploadVideo(exercise.video);
      console.log(urlVideoExample);
      if (urlVideoExample) {
        uploadOk = true;
        exercise.urlVideoExample = urlVideoExample;
      }
    }

    const exerciseData: IExerciseDataSend = {
      name: exercise.name,
      description: exercise.description,
      benefits: exercise.benefits,
      status: exercise.status,
      tags: exercise.tags,
    };

    if (exercise.urlVideoExample && uploadOk) {
      console.log("nueva url video")
      exerciseData.urlVideoExample = exercise.urlVideoExample;
      console.log(exerciseData.urlVideoExample)
    }

    const res = await fetch(`${APIURL}/exercises/${exercise.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(exerciseData),
    });
    if (!res.ok) {
      throw new Error(`Failed to modify exercise. Status: ${res.status}`);
    }
    const exerciseRes: IExercise = await res.json();
    return exerciseRes;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}

export async function modifyStatusExerciseById(
  id: string,
  status: string,
): Promise<IExercise> {
  //token: string

  try {
    const token = localStorage.getItem("authToken");
    console.log(token);
    const res = await fetch(`${APIURL}/exercises/${id}/${status}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id
      }),
    });
    if (!res.ok) {
      throw new Error(`Failed to modify exercise. Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    throw new Error(errorMessage);
  }
}
