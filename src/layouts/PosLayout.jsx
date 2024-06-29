import React from "react";
import { Outlet } from "react-router";

const PosLayout = () => {
  return (
    <div className="flex-1 bg-gray-100 font-cabin">
      <div className="flex min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default PosLayout;
