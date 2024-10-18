"use client";
import { useAuthStore } from "@/stores/userAuthStore";
import DashboardAdminPage from "../DashboardAdminPage/DashboardAdminPage";
import DashboardClientPage from "../DashboardClientPage/DashboardClientPage";

const DashboardPage = () => {
  const { user } = useAuthStore(); // Obtenemos el token aquí

  return (
    <div className="relative">
      <div className="">
        {user?.role === "Admin" ? (
          <DashboardAdminPage />
        ) : (
          <DashboardClientPage />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
