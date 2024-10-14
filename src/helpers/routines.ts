
// Definition of the Exercise interface

import { Routine } from "@/interface/IRoutine";


  const routines: Routine[] = [
    {
        id: "1",
        name: "Strength Routine",
        description: "A routine focused on developing muscle strength.",
        days: [
            {
                day: "Day 1",
                workoutName: "Legs",
                exercises: [
                    { exerciseId: "1", exerciseName: "Squats", series: 3, repetitions: 10, weight: 10 },
                    { exerciseId: "1", exerciseName: "Leg Press", series: 4, repetitions: 8, weight: 10 },
                ],
            },
            {
                day: "Day 2",
                workoutName: "Chest",
                exercises: [
                    { exerciseId: "1", exerciseName: "Bench Press", series: 4, repetitions: 8, weight: 10 },
                    { exerciseId: "1", exerciseName: "Dips", series: 3, repetitions: 10, weight: 10 },
                ],
            },
        ],
        imageUrl: "/images/b-1.jpg", // Image 1
        startDate: "2024-10-01",
        endDate: "2024-10-31",
        completed: false,
        user: {
            id: "1",
            name: "Juan Pérez",
            avatarUrl: "https://tecdn.b-cdn.net/img/new/avatars/3.jpg", // URL of the user's avatar
        },
    },
    {
        id: "2",
        name: "Endurance Routine",
        description: "Designed to improve cardiovascular endurance.",
        days: [
            {
                day: "Day 1",
                workoutName: "Cardio",
                exercises: [
                    { exerciseId: "1", exerciseName: "Running", series: 1, repetitions: 30, weight: 10 }, // 30 minutes
                ],
            },
            {
                day: "Day 2",
                workoutName: "Cycling",
                exercises: [
                    { exerciseId: "1", exerciseName: "Cycling", series: 1, repetitions: 60, weight: 10 }, // 60 minutes
                ],
            },
        ],
        imageUrl: "/images/b-2.jpg", // Image 2
        startDate: "2024-09-15",
        endDate: "2024-10-15",
        completed: true,
        user: {
            id: "2",
            name: "María López",
            avatarUrl: "https://tecdn.b-cdn.net/img/new/avatars/4.jpg", // URL of the user's avatar
        },
    },
    {
        id: "3",
        name: "Flexibility Routine",
        description: "Focused on improving flexibility and mobility.",
        days: [
            {
                day: "Day 1",
                workoutName: "Full Body Stretching",
                exercises: [
                    { exerciseId: "1", exerciseName: "Back Stretch", series: 2, repetitions: 1, weight: 10 },
                    { exerciseId: "1", exerciseName: "Leg Stretch", series: 2, repetitions: 1, weight: 10 },
                ],
            },
            {
                day: "Day 2",
                workoutName: "Yoga",
                exercises: [
                    { exerciseId: "1", exerciseName: "Downward Dog", series: 3, repetitions: 5, weight: 10 }, // Hold for 5 breaths
                    { exerciseId: "1", exerciseName: "Cat-Cow Stretch", series: 3, repetitions: 5, weight: 10 }, // 5 cycles
                ],
            },
            {
                day: "Day 3",
                workoutName: "Mobility Work",
                exercises: [
                    { exerciseId: "1", exerciseName: "Hip Openers", series: 2, repetitions: 8, weight: 10 }, // 8 per side
                    { exerciseId: "1", exerciseName: "Shoulder Rolls", series: 3, repetitions: 10, weight: 10 }, // 10 forward and backward
                ],
            },
        ],
        imageUrl: "/images/b-3.jpg", // Image 3
        startDate: "2024-10-05",
        endDate: "2024-10-25",
        completed: false,
        user: {
            id: "3",
            name: "Pedro Gómez",
            avatarUrl: "https://tecdn.b-cdn.net/img/new/avatars/2.jpg", // URL of the user's avatar
        },
    },
    {
        id:"4",
        name: "Weight Loss Routine",
        description: "A combination of cardio and strength training.",
        days: [
            {
                day: "Day 1",
                workoutName: "Strength Training",
                exercises: [
                    { exerciseId: "1", exerciseName: "Burpees", series: 4, repetitions: 12, weight: 10 },
                    { exerciseId: "1", exerciseName: "Jumping Jacks", series: 3, repetitions: 15, weight: 10 },
                ],
            },
        ],
        imageUrl: "/images/b-4.jpg", // Image 4
        startDate: "2024-09-20",
        endDate: "2024-10-20",
        completed: true,
        user: {
            id: "4",
            name: "Ana Martínez",
            avatarUrl: "https://tecdn.b-cdn.net/img/new/avatars/6.jpg", // URL of the user's avatar
        },
    },
];

  
  export default routines;