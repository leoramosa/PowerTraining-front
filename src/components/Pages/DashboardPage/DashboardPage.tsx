"use client";
import Link from "next/link";
import React from "react";
import { HiOutlineUsers } from "react-icons/hi2";
import { LiaDumbbellSolid } from "react-icons/lia";
import DashboardUserProgress from "@/components/DashboardUserProgress/DashboardUserProgress";

const DashboardPage = () => {
  return (
    <>
      <div className="min-h-screen pb-20">
        <div className="bg-[url('/images/backdash.jpg')] py-10 bg-cover bg-top rounded-lg relative shadow-lg">
          <p className="text-black text-3xl  px-5">Welcome to your dashboard</p>
          <p className="text-black w-1/2 pt-5 pl-5">
            We are here to help you manage your clients and create personalized
            routines that maximize their results. Start organizing your
            workouts, monitor your clients progress, and continue to boost their
            performance. It is time to take your coaching to the next level!
          </p>
        </div>

        <div className="flex pt-5">
          <Link href="/dashboard/users" className="w-1/2">
            <div className="flex h-56 p-5 bg-[#ffac4d] mr-3 rounded-md py-4 text-center text-2xl shadow-lg">
              <div className="h-fit p-4 rounded-lg bg-[#f9911e]">
                <HiOutlineUsers />
              </div>
              <div className="text-left pl-5">
                <p className="m-0 p-0">Users</p>
                <p className="text-black p-0 m-0 text-[14px]">(0) registered</p>
              </div>
            </div>
          </Link>
          <Link href="/dashboard/users" className="w-1/2">
            <div className="flex h-56 p-5 bg-[#242424] mr-3 rounded-md py-4 text-center text-2xl shadow-lg">
              <div className="h-fit p-4 rounded-lg bg-[#000000da]">
                <LiaDumbbellSolid className="text-white" />
              </div>
              <div className="text-left pl-5">
                <p className="m-0 p-0 text-white">Workout</p>
                <p className="text-white p-0 m-0 text-[14px]">12 routines</p>
              </div>
            </div>
          </Link>
          <Link href="/dashboard/users" className="w-1/2">
            <div className="flex h-56 p-5 bg-[#696969]  rounded-md py-4 text-center text-2xl shadow-lg">
              <div className="h-fit p-4 rounded-lg bg-[#303030da]">
                <LiaDumbbellSolid className="text-white" />
              </div>
              <div className="text-left pl-5">
                <p className="m-0 p-0 text-white">Workout</p>
                <p className="text-white p-0 m-0 text-[14px]">12 routines</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="min-h bg-white shadow-lg rounded-lg mt-5">
          <DashboardUserProgress />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
