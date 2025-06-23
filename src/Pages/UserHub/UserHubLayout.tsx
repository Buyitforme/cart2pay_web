import React from "react";
import { Outlet } from "react-router-dom";
import UserHubNav from "./UserHubNav";

const UserHubLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <UserHubNav />
      <main className="flex-1 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default UserHubLayout;
