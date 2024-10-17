import ListRowUser from "@/components/ListRowUser/ListRowUser";
import TitleH1 from "@/components/titles/TitleH1";
import React from "react";

const PageUsers = () => {
  return (
    <>
      <div className="h-full flex w-full">
        <div className="flex flex-col w-full p-10 ">
          <TitleH1>Customers</TitleH1>
          <ListRowUser />
        </div>
      </div>
    </>
  );
};

export default PageUsers;
