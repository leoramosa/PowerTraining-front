import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import DashboardPage from "@/components/Pages/DashboardPage/DashboardPage";
import React from "react";

const PageDashboard = () => {
  return (
    <>
      <DashboardPage />
    </>
  );
};

export default PageDashboard;
export const getServerSideProps = withPageAuthRequired();
