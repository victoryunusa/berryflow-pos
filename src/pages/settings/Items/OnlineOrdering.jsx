import React from "react";
import Sidebar from "../Sidebar/Sidebar";

const OnlineOrdering = () => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="">
        <Sidebar />
      </div>
      <div className="p-5 bg-white rounded-lg border">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Online Ordering</h3>
          <p className="text-xs text-neutral-400">
            Configure settings related to the online ordering.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnlineOrdering;
