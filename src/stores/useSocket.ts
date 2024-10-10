import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { useAuthStore } from "@/stores/userAuthStore";

const useSocket = () => {
  const { user } = useAuthStore();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (user) {
      const socketIo = io(process.env.NEXT_PUBLIC_API_URL!, {
        query: { userId: user.id, role: user.role },
        reconnection: true, // Asegúrate de que la reconexión esté habilitada
        reconnectionAttempts: Infinity, // Intentar reconectar indefinidamente
        reconnectionDelay: 1000, // Esperar 1 segundo entre intentos de reconexión
      });

      socketIo.on("connect", () => {
        console.log(`Connected to server as user: ${user.name}`);
      });

      socketIo.on("disconnect", () => {
        console.log(`Disconnected from server as user: ${user.name}`);
      });

      setSocket(socketIo);

      return () => {
        socketIo.disconnect();
      };
    }
  }, [user]);

  return socket;
};

export default useSocket;
