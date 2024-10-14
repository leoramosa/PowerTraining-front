import { IUserPartial, UserSearchInputProps } from "@/interface/IRoutine";
import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const UserSearchInput: React.FC<UserSearchInputProps> = ({
  users,
  onUserSelect,
  onChangeFilter,
  placeholder,
  error,
  loading,
  label,
  user,
  isDisabled,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<IUserPartial | null>(null);

  useEffect(() => {
    console.log("user: ", user);
    console.log("selectedUser: ", selectedUser);
    if (user && user.id != "") {
      setSelectedUser(user);
      setInputValue(`${user.name} ${user.lastname}`);
    } else {
      setSelectedUser(null);
      setInputValue("");
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onChangeFilter(value);
  };

  const handleUserSelect = (user: IUserPartial) => {
    setSelectedUser(user);
    setInputValue(user.name);
    onUserSelect(user);
    onChangeFilter("");
  };

  const handleClearSelection = () => {
    setSelectedUser(null);
    setInputValue("");
    onChangeFilter("");
  };

  // Filtrar usuarios basados en el valor del input
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      user.lastname.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="relative mb-3">
      {label && (
        <label className="block text-gray-500 text-semibold text-xs mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="text"
          value={
            selectedUser
              ? `${selectedUser.name} ${selectedUser.lastname}`
              : inputValue
          }
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`w-full bg-lightGray text-dark text-sm py-2 pl-2 pr-10 rounded-md border ${
            error ? "border-red-600 border" : "border-gray-300"
          } focus:border-primary focus:outline-none transition duration-300`}
          disabled={isDisabled}
        />

        {/* Icono de lupa al final del input */}
        {!isDisabled && (
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button type="button" onClick={() => handleInputChange}>
              <FaSearch />
            </button>
          </div>
        )}

        {/* Icono de 'x' para limpiar selección */}
        {selectedUser != null && !isDisabled && (
          <div
            className="absolute inset-y-0 right-8 flex items-center pr-2 cursor-pointer"
            onClick={handleClearSelection}
          >
            <FaTimes />
          </div>
        )}
      </div>
      {/* Listado de ejercicios filtrados */}
      {loading ? (
        <div className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md">
          <p className="text-center py-2">Find...</p>
        </div>
      ) : (
        filteredUsers.length > 0 &&
        !selectedUser && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded-md max-h-48 overflow-y-auto">
            {filteredUsers.map((user) => (
              <li
                key={user.id}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleUserSelect(user)}
              >
                {user.name} {user.lastname}
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
};

export default UserSearchInput;
