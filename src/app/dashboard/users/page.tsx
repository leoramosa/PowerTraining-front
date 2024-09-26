import ContainerDash from "@/components/containers/ContainerDash/ContainerDash";
import ListRowUser from "@/components/ListRowUser/ListRowUser";
import React from "react";

const PageUsers = () => {
  return (
    <ContainerDash className="h-full flex">
      <ListRowUser />
    </ContainerDash>
  );
};

export default PageUsers;
