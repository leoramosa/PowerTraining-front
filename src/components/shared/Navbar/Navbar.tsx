"use client";
import React, { useState } from "react";

import Logoweb from "../../../../public/images/logo-white.png";
import Image from "next/image";
import { GoArrowRight } from "react-icons/go";
import { CiViewList } from "react-icons/ci";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import GoogleLogo from "@/components/shared/Icons/GoogleLogo/GoogleLogo";
import { IoIosArrowDown } from "react-icons/io";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { useUserStore } from "@/stores/useAuthStore";

export const mockUser = {
  id: "1",
  name: "John Doe",
  email: "johndoe@example.com",
  password: "password123", // No uses contraseñas reales
};

const Navbar: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenTwo, setDropdownOpenTwo] = useState(false);

  const user = useUserStore((state) => state);

  const closeDropdown = () => {
    setDropdownOpen(false); //
  };
  const closeDropdownTwo = () => {
    setDropdownOpenTwo(false); //
  };

  return (
    <nav className="bg-black  w-full  z-40">
      <div className="container mx-auto px-4 py-4 flex flex-col justify-between items-center text-white lg:px-0 lg:py-4 lg:pr-5 lg:flex-row">
        <div className="flex justify-between w-full lg:w-auto">
          <Link href="/">
            <Image
              className="max-w-full h-14 w-full"
              src={Logoweb}
              alt="logo"
            />
          </Link>

          {/* Mobile Search Icon */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-white"
            >
              <FaSearch size={20} />
            </button>

            {user?.id && (
              <div className="relative flex ">
                <button
                  className="text-white ml-4"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <FaUserCircle size={20} />
                </button>
                {dropdownOpen && (
                  <div className="absolute mt-[45px] right-0 w-48 bg-white text-black rounded-md shadow-lg">
                    <Link
                      href="/myaccount"
                      className=" px-4 py-2 hover:bg-gray-100 flex items-center"
                      onClick={closeDropdown}
                    >
                      <FaRegUser className="mr-2 text-gray-400" />
                      My Profile
                    </Link>

                    <Link
                      href="/myaccount/orders"
                      className="dropdown-item  px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={closeDropdown}
                    >
                      <CiViewList className="mr-2 text-gray-400" />
                      My Orders
                    </Link>
                    <button className=" w-full text-left flex  items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <RiLogoutBoxRLine className="mr-2 text-gray-400" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {!user && (
              <div className="flex ml-3 mr-3">
                <button
                  className="flex items-center"
                  onClick={() => setDropdownOpenTwo(!dropdownOpenTwo)}
                >
                  <FaUserCircle size={20} />
                </button>
                {dropdownOpenTwo && (
                  <div className=" fixed tex-white top-0 left-0 flex w-full h-[100vh] bg-black bg-opacity-90 backdrop-blur-md  shadow-lg z-90">
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
                            className="w-full  rounded-lg py-4 border-2 border-primary text-primary hover:bg-primary hover:text-black"
                            type="submit"
                          >
                            Sign in
                          </button>
                        </Link>
                        <Link href="" onClick={closeDropdownTwo}>
                          <button
                            className="w-full rounded-lg py-4 mt-5 bg-[#5E1EE5] text-white hover:bg-[#3b2172]"
                            type="submit"
                          >
                            Sign Up
                          </button>
                        </Link>
                        <hr className="my-7" />
                        <button className="flex  justify-center w-full rounded-lg bg-gray-600 text-white py-3 mt-7">
                          <GoogleLogo />
                          Or sign in with Google
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            {user ? (
              <div className="cart-btn ml-4 text-lg flex items-center"></div>
            ) : (
              <button className="text-white">
                <FaShoppingCart size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Desktop and Tablet Search */}
        <div
          className={`flex items-center  lg:mt-0 lg:flex-row ${
            searchOpen ? "flex-col" : "hidden lg:flex lg:w-2/5"
          } lg:space-x-4`}
        ></div>

        {/* Desktop Icons */}
        <div className="hidden lg:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                className="flex items-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUserCircle size={20} />
                <span className="ml-2"> {user.name}</span>
                <IoIosArrowDown className="ml-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
                  <Link
                    href="/myaccount"
                    className=" px-4 py-2 hover:bg-gray-100 flex items-center"
                    onClick={closeDropdown}
                  >
                    <FaRegUser className="mr-2 text-gray-400" />
                    My Profile
                  </Link>

                  <Link
                    href="/myaccount/orders"
                    className="dropdown-item  px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={closeDropdown}
                  >
                    <CiViewList className="mr-2 text-gray-400" />
                    My Orders
                  </Link>

                  <button className=" w-full text-left flex  items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <RiLogoutBoxRLine className="mr-2 text-gray-400" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" onClick={closeDropdownTwo}>
                <button className=" text-white py-1 px-6 mx-3 rounded-lg border-2 border-gray-300 ">
                  Sing In
                </button>
              </Link>
              <Link href="" onClick={closeDropdownTwo}>
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
