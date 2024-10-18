"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/stores/userAuthStore";

const AuthInitializer: React.FC = () => {
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    const storedToken = localStorage.getItem("authToken");

    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser);
      login(user, storedToken);
    }
  }, [login]);

  return null; // Este componente no renderiza nada
};

export default AuthInitializer;
