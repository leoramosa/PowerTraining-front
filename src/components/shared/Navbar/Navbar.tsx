"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logoweb from "../../../../public/images/logo-white.png";
import { GoArrowRight } from "react-icons/go";
import { CiViewList } from "react-icons/ci";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaUserCircle, FaRegUser } from "react-icons/fa";
import GoogleLogo from "@/components/shared/Icons/GoogleLogo/GoogleLogo";
import { IoIosArrowDown } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/userAuthStore";
import { signIn, useSession, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenTwo, setDropdownOpenTwo] = useState(false);
  const { data: session } = useSession();
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (session && session.user && session.authTokenProvider) {
      const user = {
        id: session.user.id,
        name: session.user.name || "",
        lastName: session.user.lastName || "",
        birthDay: session.user.birthDay || "",
        password: session.user.password || "",
        email: session.user.email || "",
        role: session.user.role,
        isSubscribed: session.user.isSubscribed,
      };
      const token = session.authTokenProvider;
      //document.cookie = `authToken=${token}; path=/; secure; HttpOnly; SameSite=Strict`;
      //setCookie("authToken", token, 7);
      // Guarda los datos en el store
      login(user, token);
      router.push("/dashboard");
    }
  }, [session, login, router]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      signOut();
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("authTokenProvider");
      localStorage.removeItem("authUserProvider");

      toast.success("Logout successful");
    }
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const closeDropdownTwo = () => {
    setDropdownOpenTwo(false);
  };

  const handleGoogleSignIn = () => {
    signIn("google");
  };

  return (
    <nav className="bg-black w-full z-40">
      <div
        className="
       mx-auto px-4 py-4 flex flex-col justify-between items-center text-white  lg:py-4 lg:px-5 lg:flex-row"
      >
        <div className="flex justify-between w-full lg:w-auto">
          <Link href="/">
            <Image
              className="max-w-full h-14 w-full"
              src={Logoweb}
              alt="logo"
            />
          </Link>

          {/* Mobile Search Icon */}
          <div className="flex lg:hidden items-center space-x-4">
            {user ? (
              <div className="relative ">
                <button
                  className="text-white ml-4 flex items-center"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaUserCircle size={20} />

                  <span id="user-web" className="user-web ml-2">
                    {user.name}
                  </span>
                  <IoIosArrowDown className="ml-1" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                    <Link
                      href="/dashboard"
                      className="dropdown-item px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={closeDropdown}
                    >
                      <CiViewList className="mr-2 text-gray-400" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/profile"
                      className="px-4 py-2 hover:bg-gray-100 flex items-center"
                      onClick={closeDropdown}
                    >
                      <FaRegUser className="mr-2 text-gray-400" />
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <RiLogoutBoxRLine className="mr-2 text-gray-400" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex ml-3 mr-3">
                <button
                  className="flex items-center"
                  onClick={() => setDropdownOpenTwo(!dropdownOpenTwo)}
                >
                  Hello! <FaUserCircle className="ml-1" size={20} />
                </button>
                {dropdownOpenTwo && (
                  <div className="fixed text-white top-0 left-0 flex w-full h-[100vh] bg-black bg-opacity-90 backdrop-blur-md shadow-lg z-90">
                    <button
                      className="absolute top-0 right-0 p-4 py-3 bg-gray-500 rounded-sm"
                      onClick={closeDropdownTwo}
                    >
                      x
                    </button>
                    <div className="flex w-full h-full justify-center items-center">
                      <div className="pb-5 w-full px-10">
                        <Link href="/login">
                          <button
                            onClick={closeDropdownTwo}
                            className="w-full rounded-lg py-4 border-2 border-primary text-primary hover:bg-primary hover:text-black"
                            type="submit"
                          >
                            Sign in
                          </button>
                        </Link>
                        <Link href="/register" onClick={closeDropdownTwo}>
                          <button
                            className="w-full rounded-lg py-4 mt-5 bg-[#5E1EE5] text-white hover:bg-[#3b2172]"
                            type="submit"
                          >
                            Sign Up
                          </button>
                        </Link>
                        <hr className="my-7" />
                        <button
                          onClick={handleGoogleSignIn}
                          className="flex justify-center w-full rounded-lg bg-gray-600 text-white py-3 mt-7"
                        >
                          <GoogleLogo />
                          Or sign in with Google
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Desktop and Tablet Search */}

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center space-x-4 ">
          {user ? (
            <div className="relative ">
              <button
                className="flex items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle size={20} />

                <span id="user-web" className="user-web ml-2">
                  {user.name}
                </span>

                <IoIosArrowDown className="ml-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
                  <Link
                    href="/dashboard"
                    className="dropdown-item px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={closeDropdown}
                  >
                    <CiViewList className="mr-2 text-gray-400" />
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/profile"
                    className="px-4 py-2 hover:bg-gray-100 flex items-center"
                    onClick={closeDropdown}
                  >
                    <FaRegUser className="mr-2 text-gray-400" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    <RiLogoutBoxRLine className="mr-2 text-gray-400" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" onClick={closeDropdownTwo}>
                <button className="text-white py-1 px-6 mx-3 rounded-lg border-2 border-gray-300">
                  Sign In
                </button>
              </Link>
              <Link href="/register" onClick={closeDropdownTwo}>
                <button className="flex justify-center items-center bg-primary text-black py-1 mr-2 px-3 rounded-lg">
                  Sign Up <GoArrowRight className="ml-1 text-md font-bold" />
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
