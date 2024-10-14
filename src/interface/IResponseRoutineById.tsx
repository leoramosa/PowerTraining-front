interface IExerciseResponseById {
    id: string;
    name: string;
    description: string;
    urlVideoExample: string;
    benefits: string;
    tags: string;
    status: string;
}

interface ITrainingDayResponseById {
    id: number;
    date: string; // Puedes cambiar a Date si prefieres
    description: string;
    exercises: IExerciseDetailsResponseById[];
}

interface IExerciseDetailsResponseById {
    id: number;
    series: number;
    repetitions: number;
    weight: string; // Podrías usar number si solo vas a manejar números
    completed: boolean;
    rpe: number | null; // Puede ser null si no se proporciona
    exercise: IExerciseResponseById;
}

interface IUserResponseById {
    id: string;
    googleId: string | null;
    providerId: string | null;
    provider: string | null;
    name: string;
    lastName: string;
    birthDay: string;
    role: string;
    email: string;
    password: string; // Considera no almacenar contraseñas en texto plano
    isSubscribed: boolean;
    subscriptionEndDate: string; // Puedes cambiar a Date si prefieres
}

export default interface IRoutineResponseById {
    id: number;
    name: string;
    description: string;
    startDate: string; // Puedes cambiar a Date si prefieres
    endDate: string; // Puedes cambiar a Date si prefieres
    completed: boolean;
    user: IUserResponseById;
    trainingDays: ITrainingDayResponseById[];
}
