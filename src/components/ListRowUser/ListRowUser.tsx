import { getAllUsers } from "@/Services/userService";
import RowUser from "../RowUser/RowUser";

const ListRowUser = async () => {
  const users = await getAllUsers();

  return (
    <>
      {users?.map((user) => {
        return <RowUser key={user.id} {...user} />;
      })}
    </>
  );
};

export default ListRowUser;
