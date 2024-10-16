"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaDumbbell } from "react-icons/fa";
import { LiaDumbbellSolid } from "react-icons/lia";
import DashboardUserProgress2 from "@/components/DashboardUserProgress/DashboardUserProgress2";
import { useAuthStore } from "@/stores/userAuthStore";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const [userCount, setUserCount] = useState(0);
  const [routinesCount, setRoutinesCount] = useState(0); // Inicialmente 0
  const [exercisesCount, setExercisesCount] = useState(0); // Cambia esto al número real
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const showBlur = user?.role === "Admin" && !user?.isSubscribed;

  useEffect(() => {
    const userCountInterval = setInterval(() => {
      setUserCount((prevCount) => {
        if (prevCount < 100) {
          return prevCount + 5;
        } else {
          clearInterval(userCountInterval);
          return prevCount;
        }
      });
    }, 30);

    const routinesCountInterval = setInterval(() => {
      setRoutinesCount((prevCount) => {
        if (prevCount < 82) {
          return prevCount + 5;
        } else {
          clearInterval(routinesCountInterval);
          return prevCount;
        }
      });
    }, 30);

    const exercisesCountInterval = setInterval(() => {
      setExercisesCount((prevCount) => {
        if (prevCount < 25) {
          return prevCount + 5;
        } else {
          clearInterval(exercisesCountInterval);
          return prevCount;
        }
      });
    }, 30);

    return () => {
      clearInterval(userCountInterval);
      clearInterval(routinesCountInterval);
      clearInterval(exercisesCountInterval);
    };
  }, []);

  return (
    <div className="relative">
      <div className={`${showBlur ? "backdrop-blur-sm opacity-90" : ""} `}>
        <div className=" ">
          <div className="bg-[url('/images/backdash.jpg')]  bg-cover bg-top  relative rounded-lg shadow-lg">
            <div className="bg-gradient-to-l from-[#f9931e88]  to-[#000000] py-10 rounded-lg">
              <p className="text-primary text-4xl font-bold px-5 pl-7">
                Welcome to your dashboard
              </p>
              <p className="text-white w-3/4 pt-5 pl-7 text-lg">
                We are here to help you manage your clients and create
                personalized routines that maximize their results. Start
                organizing your workouts, monitor your clients progress, and
                continue to boost their performance. It is time to take your
                coaching to the next level!
              </p>
            </div>
          </div>

          <div className="flex pt-5 space-x-3">
            <Link href="/dashboard/users" className="w-1/3">
              <div className="flex h-42 p-5 border-2 border-gray-100 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-600">
                <div className="flex-shrink-0 p-4 rounded-lg bg-gray-900 flex items-center justify-center">
                  <HiOutlineUsers className="text-4xl text-primary" />
                </div>
                <div className="text-left pl-5 flex flex-col justify-center items-start">
                  <p className="text-3xl font-bold">Users</p>
                  <p className="text-5xl font-bold text-primary">{userCount}</p>
                  <p className="text-sm">(registered)</p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/routine" className="w-1/3">
              <div className="flex h-42 p-5 border-2 border-gray-100 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-600">
                <div className="flex-shrink-0 p-4 rounded-lg bg-gray-900 flex items-center justify-center">
                  <LiaDumbbellSolid className="text-4xl text-primary" />
                </div>
                <div className="text-left pl-5 flex flex-col justify-center items-start">
                  <p className="text-3xl font-bold">Routines</p>
                  <p className="text-5xl font-bold text-primary">
                    {routinesCount}
                  </p>
                  {/* Muestra la cantidad real de rutinas */}
                  <p className="text-sm">(total)</p>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/exercise" className="w-1/3">
              <div className="flex h-42 p-5 border-2 border-gray-100 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-60">
                <div className="flex-shrink-0 p-4 rounded-lg bg-gray-900 flex items-center justify-center">
                  <FaDumbbell className="text-4xl text-white" />
                </div>
                <div className="text-left pl-5 flex flex-col justify-center items-start">
                  <p className="text-3xl font-bold">Exercises</p>
                  <p className="text-5xl font-bold text-primary">
                    {exercisesCount}
                  </p>
                  <p className="text-sm">(available)</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="bg-white shadow-lg rounded-lg mt-5 p-5">
            <DashboardUserProgress2 />
          </div>
        </div>
      </div>
      {showBlur && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black backdrop-blur-lg bg-opacity-70 z-50 w-full">
          <h2 className="text-white text-2xl mb-4">
            You need to subscribe first!
          </h2>
          <button
            className="bg-primary  text-black font-bold py-2 px-4 rounded"
            onClick={() => {
              router.push("/pricing");
            }}
          >
            Subscribe Now
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
