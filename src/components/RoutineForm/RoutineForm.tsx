import React, { useEffect, useState } from "react";
import InputForm from "@/components/inputs/InputForm/InputForm";
import UserSearchInput from "@/components/UserSearchInput/UserSearchInput";
import { getUsersDB } from "@/Services/userService";
import { IUser } from "@/interface/IUsers";
import {
  IRoutineForm,
  IRoutineFormProps,
  IUserPartial,
} from "@/interface/IRoutine";
import ButtonPrimary from "../buttons/ButtonPrimary/ButtonPrimary";
import TitleH2 from "../titles/TitleH2";

const RoutineForm: React.FC<IRoutineFormProps> = ({
  onSubmit,
  routineData,
  disabledSearchUser
}) => {
  const initialState = {
    userId: "",
    userName: "",
    userLastName: "",
    name: "",
    startDate: "",
    endDate: "",
    description: "",
  };

  const [dataRoutine, setDataRoutine] = useState(
    routineData ? routineData : initialState
  );
  const [errors, setErrors] = useState(initialState);
  const [selectedUser, setSelectedUser] = useState<IUserPartial | null>(null);
  const [users, setUsers] = useState<IUserPartial[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  //const [filtersBy, setFiltersBy] = useState<{ name?: string }>({});

  useEffect(() => {
    console.log(routineData);
    dataRoutine && setDataRoutine(routineData);
    dataRoutine && setSelectedUser({
      id: dataRoutine.userId,
      name: dataRoutine.userName,
      lastname: dataRoutine.userLastName,
    })
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      selectedUser &&
      dataRoutine.name &&
      dataRoutine.startDate &&
      dataRoutine.endDate
    ) {
      console.log("select user", selectedUser);
      const updatedDataRoutine: IRoutineForm = {
        ...dataRoutine,
        userId: selectedUser.id,
        userName: selectedUser.name,
        userLastName: selectedUser.lastname,
      };
      console.log("Datos enviados:", updatedDataRoutine);
      onSubmit(updatedDataRoutine);
      setDataRoutine(updatedDataRoutine);
    } else {
      alert("Por favor completa todos los campos");
    }
  };

  const handleChange = (name: string, value: string) => {
    setDataRoutine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBlur = (name: string, value: string) => {
    let errorMessage = "";
    if (!value) {
      errorMessage = `${name} es obligatorio.`;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const fetchUsers = async (filterValue: string) => {
    setLoading(true);
    try {
      const userData = await getUsersDB(5, 1, { name: filterValue });
      const transformToPartialUsers = (users: IUser[]): IUserPartial[] =>
        users.map(({ id, name, lastName }) => ({
          id,
          name,
          lastname: lastName,
        }));

      const partialUsers: IUserPartial[] = userData.data
        ? transformToPartialUsers(userData.data)
        : [];
      setUsers(partialUsers);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error fetching users:", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterValue: string) => {
    //setFiltersBy({ name: filterValue });
    if (filterValue.trim() !== "") {
      fetchUsers(filterValue);
    } else {
      setUsers([]);
    }
  };

  const handleUserSelect = (user: IUserPartial) => {
    setSelectedUser(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border rounded-md p-2 my-2">
        <TitleH2># Step 1: Add Routine information</TitleH2>
        <UserSearchInput
          users={users}
          label="Assign user client"
          onUserSelect={handleUserSelect}
          onChangeFilter={handleFilterChange}
          placeholder="Filter user by name"
          error={false}
          loading={loading}
          user={{
            id: dataRoutine.userId,
            name: dataRoutine.userName,
            lastname: dataRoutine.userLastName,
          }}
          isDisabled={disabledSearchUser}
        />

        <div className="flex justify-between space-x-2">
          <div className="w-full">
            <InputForm
              label="Name"
              placeholder="Enter routine name"
              type="text2"
              value={dataRoutine.name}
              onChangeText2={(name, value) => handleChange(name, value)}
              onBlurText2={() => handleBlur("routineName", dataRoutine.name)}
              name="name"
              error={errors.name}
            />
          </div>
          <div>
            <InputForm
              label="Start date"
              placeholder="Enter start date routine"
              type="date"
              value={dataRoutine.startDate}
              onChangeDate={(name, value) => handleChange(name, value)}
              name="startDate"
              error={errors.startDate}
            />
          </div>
          <div>
            <InputForm
              label="End date"
              placeholder="Enter end date routine"
              type="date"
              value={dataRoutine.endDate}
              onChangeDate={(name, value) => handleChange(name, value)}
              name="endDate"
              error={errors.endDate}
            />
          </div>
        </div>
        <InputForm
          label="Description"
          type="textarea2"
          placeholder="Enter description"
          value={dataRoutine.description}
          onChangeTextArea2={(name, value) => handleChange(name, value)}
          onBlurTextArea2={() =>
            handleBlur("description", dataRoutine.description)
          }
          name="description"
          error={errors.description}
        />
      </div>
      <div className="flex flex-row justify-end">
        <ButtonPrimary
          text="Next"
          type="submit"
          disabled={
            !(
              selectedUser &&
              dataRoutine.name &&
              dataRoutine.startDate &&
              dataRoutine.endDate
            )
          }
        />
      </div>
    </form>
  );
};

export default RoutineForm;
