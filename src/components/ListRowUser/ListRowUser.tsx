"use client";
import { useEffect, useState } from "react";
import { IUser, IUserFilters } from "@/interface/IUsers";
import { getUsersDB, getUsersPaginationDB } from "@/Services/userService";
//import { useUsersStore } from "@/stores/usersStore"; // Ensure correct import
import ListUser from "@/components/ListUser/ListUser";
import SearchInput from "@/components/search/SearchInput";
import { useAuthStore } from "@/stores/userAuthStore";
import { useRouter } from "next/navigation";
import { useSubscriptionStore } from "@/stores/useSubscriptionStore";
import Pagination from "../pagination/Pagination";
import { toast } from "sonner";

const ListRowUser: React.FC = () => {

  const filterInitialValues = {
    name: "",
    email: "",
    lastname: "",
  };

  //const { users, setUsers } = useUsersStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filters, setFilters] = useState<IUserFilters>(filterInitialValues);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchSelect, setSearchSelect] = useState<string>("");
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { token } = useAuthStore();
  const { subscription, fetchSubscription } = useSubscriptionStore();
  const [listUsers, setListUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (user && token) {
      fetchSubscription(user.id, token); // Pasamos tanto el ID del usuario como el token
    }
  }, [user, token, fetchSubscription]);

  const showBlur =
    user?.role === "Admin" && subscription?.paymentStatus !== "approved";

  const calculateTotalPages = (totalCount: number, limit: number) => {
    return Math.ceil(totalCount / limit);
  };

  const fetchUsers = async () => {
    try {
      if(Object.values(filters).every(value => value === "")){
        const response = await getUsersPaginationDB(limit, currentPage, token ? token : "");
        console.log("Response from getUsersDB:", response); // Log the response
        setTotalPages(calculateTotalPages(response.count, limit));
        setListUsers(response.data);
      } else {
        const response = await getUsersDB(limit, currentPage, filters);
        console.log("Response from getUsersDB:", response); // Log the response
        setTotalPages(calculateTotalPages(response.count, limit));
        setListUsers(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchUsers();
    console.log("------> filters",filters)
  }, [currentPage, limit, filters]);

  // Log totalPages whenever it changes
  useEffect(() => {
    console.log("Total pages:", totalPages);
  }, [totalPages]);

  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSelectSearchChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchSelect(e.target.value);
  };

  const handleClickSearch = () => {
    /*if (searchSelect && searchValue) {
      setFilters({ [searchSelect]: searchValue });
    } else {
      setCurrentPage(1);
      setFilters({});
    }*/
    setCurrentPage(1);
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          if (searchSelect && searchValue) {
            setFilters({ [searchSelect]: searchValue });
          } else {
            setFilters(filterInitialValues);
          }
          resolve("Users fetched successfully!");
        } catch (error) {
          reject("Error fetching users, please try again.");
        }
      }),
      {
        loading: "Searching for exercises...",
        success: (msg) => String(msg),
        error: (msg) => String(msg),
      }
    );
  };

  const optionsSearch = [
    { label: "Find by name", value: "name" },
    { label: "Find by email", value: "email" },
    { label: "Find by last name", value: "lastname" },
  ];

  return (
    <main className=" w-full">
      <div className="flex justify-between mb-4">
        <SearchInput
          value={searchValue}
          placeholder="Type a word here"
          onClick={handleClickSearch}
          options={optionsSearch}
          onChangeInput={handleInputSearchChange}
          onChangeSelect={handleSelectSearchChange}
        />
      </div>
      <ListUser users={listUsers} />
      <div className="flex justify-center items-center mt-4">
        {listUsers && listUsers.length > 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
      {showBlur && (
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
    </main>
  );
};

export default ListRowUser;
