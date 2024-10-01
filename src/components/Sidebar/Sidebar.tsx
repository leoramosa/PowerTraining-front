"use client";
import Link from "next/link";
import { useState } from "react";
import { MdDashboard } from "react-icons/md";
import { usePathname } from "next/navigation";
import { MdOutlinePayment } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

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
          {isOpen ? "<" : ">"}
        </button>
      </div>

      {/* Sidebar Items */}
      <nav className="flex flex-col space-y-4">
        <SidebarItem
          icon={<MdDashboard />}
          label="Home"
          isOpen={isOpen}
          href="/dashboard"
          active={pathname === "/dashboard"}
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
          href="/dashboard/admin/exercise"
          active={pathname === "/dashboard/admin/exercise"}
        />
        <SidebarItem
          icon={<IoIosSettings />}
          label="Settings"
          isOpen={isOpen}
          href="/dashboard/settings"
          active={pathname === "/dashboard/settings"}
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
      className={`flex items-center p-4 text-white hover:bg-gray-700 transition-colors cursor-pointer
      ${active ? "bg-gray-700" : ""}  // Clase condicional para el activo
    `}
    >
      {icon}
      {isOpen && <span className="ml-4">{label}</span>}
    </div>
  </Link>
);

export default Sidebar;
