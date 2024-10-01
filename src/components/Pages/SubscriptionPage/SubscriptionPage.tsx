"use client";
import SubscriptionMercado from "@/components/SubscriptionMercado/SubscriptionMercado";
import React from "react";
import { useAuthStore } from "@/stores/userAuthStore";

const SubscriptionPage: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className=" flex w-full h-full">
      {user ? (
        <SubscriptionMercado id={user.id} />
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
};

export default SubscriptionPage;
