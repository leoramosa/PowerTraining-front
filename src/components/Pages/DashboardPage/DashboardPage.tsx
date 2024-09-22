import ContainerDash from "@/components/containers/ContainerDash/ContainerDash";
import Link from "next/link";
import React from "react";

const DashboardPage = () => {
  return (
    <>
      <ContainerDash className="">
        <div className=" ">
          <h1>DASHBOARD</h1>
          <div className="flex pt-3">
            <Link href="/dashboard/users" className="w-1/2">
              <div className="user  bg-primary mr-3 rounded-md py-4 text-center text-3xl">
                Users
              </div>
            </Link>
            <Link href="/dashboard/admin/exercise" className="w-1/2">
              <div className="routines bg-secondary ml-3 rounded-md py-4 text-center text-3xl text-white">
                Routines
              </div>
            </Link>
          </div>
        </div>
      </ContainerDash>
    </>
  );
};

export default DashboardPage;
