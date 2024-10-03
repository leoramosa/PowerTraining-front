import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/userAuthStore";

const SessionHandler: React.FC = () => {
  const { data: session } = useSession();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (session) {
      const user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        lastName: session.user.lastName,
        birthDay: session.user.birthDay,
        password: session.user.password,
      };
      const token = session.accessToken;
      login(user, token);
    }
  }, [session, login]);

  return null;
};

export default SessionHandler;
