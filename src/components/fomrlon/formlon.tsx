"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "login") {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (res?.error) {
        console.error(res.error);
      }
    } else {
      // Maneja el registro de usuarios (registro en tu backend)
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="border rounded px-4 py-2 w-full"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border rounded px-4 py-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        {type === "login" ? "Login" : "Register"}
      </button>
      <button
        type="button"
        onClick={() => signIn("google")}
        className="bg-red-500 text-white px-4 py-2 rounded w-full"
      >
        Sign in with Google
      </button>
    </form>
  );
};

export default AuthForm;
