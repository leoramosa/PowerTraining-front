"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "@/stores/userAuthStore";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/stores/useSubscriptionStore"; // Tu store
import DashboardAdminPage from "../DashboardAdminPage/DashboardAdminPage";
import DashboardClientPage from "../DashboardClientPage/DashboardClientPage";

const DashboardPage = () => {
  const { user, token } = useAuthStore(); // Obtenemos el token aquí
  const router = useRouter();
  const { subscription, fetchSubscription } = useSubscriptionStore();

  useEffect(() => {
    if (user && token) {
      fetchSubscription(user.id, token); // Pasamos tanto el ID del usuario como el token
    }
  }, [user, token, fetchSubscription]);

  const showBlur =
    user?.role === "Admin" && subscription?.paymentStatus !== "approved";

  return (
    <div className="relative">
      <div className={`${showBlur ? "backdrop-blur-sm opacity-90" : ""} `}>
        {user?.role === "Admin" && <DashboardAdminPage />}
        {user?.role === "User" && <DashboardClientPage />}
      </div>
      {showBlur && user?.role === "Admin" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-lg bg-black backdrop-blur-lg bg-opacity-70 z-20 w-full">
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
