import React from "react";
import { Outlet } from "react-router";
import Header from "../components/layouts/Header";

const PosLayout = () => {
  return (
    <div className="flex-1 bg-gray-100 font-br tracking-wide ">
      <div className="flex min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default PosLayout;
