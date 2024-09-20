import { getAllUsers } from "@/Services/userService";
import ListUser from "../ListUser/ListUser";

const ListRowUser = async () => {
  const users = await getAllUsers();

  return <ListUser users={users} />;
};

export default ListRowUser;
