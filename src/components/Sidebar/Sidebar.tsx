"use client";
import Link from "next/link";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import { MdOutlinePayment } from "react-icons/md";
import { FaRunning, FaDumbbell } from "react-icons/fa";
import { FaTrash, FaUsers, FaFilePdf } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { useAuthStore } from "@/stores/userAuthStore";
import { RiProfileLine } from "react-icons/ri";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <div
      className={` flex flex-col ${
        isOpen ? "w-64" : "w-20"
      } bg-[#000000fd] backdrop-blur-lg rounded-lg cursor-pointer  transition-width duration-300`}
    >
      {/* Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 focus:outline-none"
        >
          {isOpen ? (
            <IoIosArrowDropleftCircle className="text-2xl" />
          ) : (
            <IoIosArrowDroprightCircle className="text-2xl" />
          )}
        </button>
      </div>

      {/* Sidebar Items */}
      <nav className="flex flex-col  ">
        <SidebarItem
          icon={<MdDashboard />}
          label="Home"
          isOpen={isOpen}
          href="/dashboard"
          active={pathname === "/dashboard"}
        />
        <SidebarItem
          icon={<RiProfileLine />}
          label="Profile"
          isOpen={isOpen}
          href="/dashboard/profile"
          active={pathname === "/dashboard/profile"}
        />
        <SidebarItem
          icon={<MdOutlinePayment />}
          label="Subscription"
          href="/dashboard/subscription"
          isOpen={isOpen}
          active={pathname === "/dashboard/subscription"}
        />
        <SidebarItem
          icon={<FaUsers />}
          label="Customers"
          isOpen={isOpen}
          href="/dashboard/users"
          active={pathname === "/dashboard/users"}
        />
        <SidebarItem
          icon={<FaRunning />}
          label="Exercises"
          isOpen={isOpen}
          href="/dashboard/exercise"
          active={pathname === "/dashboard/exercise"}
        />
        {user?.role === "Admin" && (
          <SidebarItem
            icon={<LuMessagesSquare />}
            label="Chats"
            isOpen={isOpen}
            href="/dashboard/chats"
            active={pathname === "/dashboard/chats"}
          />
        )}

        <SidebarItem
          icon={<FaDumbbell />}
          label="Routines"
          isOpen={isOpen}
          href="/dashboard/routine"
          active={pathname === "/dashboard/routine"}
        />
        <SidebarItem
          icon={<FaFilePdf />}
          label="Reporting"
          isOpen={isOpen}
          href="/dashboard/reports"
          active={pathname === "/dashboard/reports"}
        />
        <SidebarItem
          icon={<FaTrash />}
          label="Trash"
          isOpen={isOpen}
          href="/dashboard/trash"
          active={pathname === "/dashboard/trash"}
        />
      </nav>
    </div>
  );
};

interface SidebarItemProps {
  icon: JSX.Element;
  label: string;
  isOpen: boolean;
  href?: string;
  active: boolean;
}

const SidebarItem = ({
  icon,
  label,
  isOpen,
  href = "/",
  active,
}: SidebarItemProps) => (
  <Link href={href}>
    <div
      className={`flex items-center  p-4 text-white hover:bg-gray-700 transition-colors cursor-pointer border-b border-gray-800
      ${active ? "bg-gray-700 " : ""} ${
        isOpen ? "justify-start" : "justify-center"
      }
    `}
    >
      {icon}
      {isOpen && <span className="ml-4">{label}</span>}
    </div>
  </Link>
);

export default Sidebar;
