import DashboardPage from "@/components/Pages/DashboardPage/DashboardPage";
import React from "react";
import CheckoutPage from "@/components/mercado/mercado";
import ContainerDash from "@/components/containers/ContainerDash/ContainerDash";

const PageDashboard = () => {
  return (
    <ContainerDash>
      <DashboardPage />
      <CheckoutPage />
    </ContainerDash>
  );
};

export default PageDashboard;
