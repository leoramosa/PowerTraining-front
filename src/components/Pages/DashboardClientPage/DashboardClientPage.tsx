"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaDumbbell } from "react-icons/fa";
import { LiaDumbbellSolid } from "react-icons/lia";
import { FaCalendarWeek } from "react-icons/fa";
import DashboardUserProgress from "@/components/DashboardUserProgress/DashboardUserProgress";
import { getRoutinesByUserId } from "@/helpers/routine-helper";
import { useAuthStore } from "@/stores/userAuthStore";

const DashboardClientPage = () => {
  const [exercisesCount, setExercisesCount] = useState<number>(0);
  const [weeksCount, setWeeksCount] = useState<number>(0);
  const [routinesCount, setRoutinesCount] = useState<number>(0);
  const { user } = useAuthStore(); // Obtenemos el token aquí

  const [targetCounts, setTargetCounts] = useState<{
    weeks: number;
    routines: number;
    exercises: number;
  } | null>(null);
  const valueIncrement: number = 1;

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getRoutinesByUserId(user?.id);
        console.log(data);

        const routines = data.length;
        const exercises = data.reduce((totalExercises, routine) => {
          return (
            totalExercises +
            routine.trainingDays.reduce((daysExercises, day) => {
              return daysExercises + day.exercises.length;
            }, 0)
          );
        }, 0);

        const weeks = data.reduce((totalWeeks, routine) => {
          const daysInRoutine = routine.trainingDays.length;
          const weeksInRoutine = Math.ceil(daysInRoutine / 7);
          return totalWeeks + weeksInRoutine;
        }, 0);
        setTargetCounts({ routines, weeks, exercises });
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchStatistics();
  }, []);

  useEffect(() => {
    if (targetCounts) {
      const { weeks, routines, exercises } = targetCounts;
      console.log(weeks, routines, exercises);
      const exercisesCountInterval = setInterval(() => {
        setExercisesCount((prevCount: number) => {
          if (prevCount < weeks) {
            return prevCount + valueIncrement;
          } else {
            clearInterval(exercisesCountInterval);
            return prevCount;
          }
        });
      }, 30);

      const routinesCountInterval = setInterval(() => {
        setRoutinesCount((prevCount: number) => {
          if (prevCount < routines) {
            return prevCount + valueIncrement;
          } else {
            clearInterval(routinesCountInterval);
            return prevCount;
          }
        });
      }, 30);

      const weeksCountInterval = setInterval(() => {
        setWeeksCount((prevCount: number) => {
          if (prevCount < exercises) {
            return prevCount + valueIncrement;
          } else {
            clearInterval(exercisesCountInterval);
            return prevCount;
          }
        });
      }, 30);

      return () => {
        clearInterval(weeksCountInterval);
        clearInterval(routinesCountInterval);
        clearInterval(exercisesCountInterval);
      };
    }
  }, [targetCounts]);

  return (
    <div className=" ">
      <div className="bg-[url('/images/backdash.jpg')]  bg-cover bg-top  relative rounded-lg shadow-lg">
        <div className="bg-gradient-to-l from-[#f9931e88]  to-[#000000] py-10 rounded-lg">
          <p className="text-primary text-4xl font-bold px-5 pl-7">
            Welcome to your dashboard
          </p>
          <p className="text-white w-3/4 pt-5 pl-7 text-lg">
            We're here to support you on your fitness journey. Access your
            personalized workout routines, track your progress, and stay focused
            on reaching your goals. Everything you need to improve your
            performance is right at your fingertips. Let is take your fitness to
            the next level!
          </p>
        </div>
      </div>

      <div className="flex  pt-5 space-x-4">
        {/* Card for Active Routine */}
        <Link href="/dashboard/routines" className="w-1/2">
          <div className="flex h-42 p-5 border-2 border-gray-100 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-600">
            <div className="flex-shrink-0 p-4 rounded-lg bg-gray-900 flex items-center justify-center">
              <LiaDumbbellSolid className="text-4xl text-primary" />
            </div>
            <div className="text-left pl-5 flex flex-col justify-center items-start">
              <p className="text-3xl font-bold">Active Routines</p>
              <p className="text-5xl font-bold text-primary">{routinesCount}</p>
              <p className="text-sm">All routines</p>
            </div>
          </div>
        </Link>

        {/* Card for Exercises Done */}
        <Link href="/dashboard/client/routines" className="w-1/2">
          <div className="flex h-42 p-5 border-2 border-gray-100 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-600">
            <div className="flex-shrink-0 p-4 rounded-lg bg-gray-900 flex items-center justify-center">
              <FaDumbbell className="text-3xl text-primary" />
            </div>
            <div className="text-left pl-5 flex flex-col justify-center items-start">
              <p className="text-3xl font-bold">Exercises Done</p>
              <p className="text-5xl font-bold text-primary">
                {exercisesCount}
              </p>
              <p className="text-sm">This Week</p>
            </div>
          </div>
        </Link>

        <Link href="/dashboard/routines" className="w-1/2">
          <div className="flex h-42 p-5 border-2 border-gray-100 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-600">
            <div className="flex-shrink-0 p-4 rounded-lg bg-gray-900 flex items-center justify-center">
              <FaCalendarWeek className="text-3xl text-primary" />
            </div>
            <div className="text-left pl-5 flex flex-col justify-center items-start">
              <p className="text-3xl font-bold">Weeks Training</p>
              <p className="text-5xl font-bold text-primary">{weeksCount}</p>
              <p className="text-sm">Total count</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Progreso del usuario: Aqui Marian :) */}
      <div className="bg-white shadow-lg rounded-lg mt-5 p-5">
        <DashboardUserProgress />
      </div>
    </div>
  );
};

export default DashboardClientPage;
