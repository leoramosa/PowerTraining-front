import ClientChat from "@/components/Chat/ClientChat/ClientChat";
import DashboardPage from "@/components/Pages/DashboardPage/DashboardPage";
import React from "react";

const PageDashboard = () => {
  return (
    <div className="py-0">
      <DashboardPage />
      <ClientChat />
    </div>
  );
};

export default PageDashboard;
