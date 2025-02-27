import React from "react";
import Sidebar from "./Sidebar/Sidebar";

const Settings = () => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="">
        <Sidebar />
      </div>
      <div className="p-5 bg-white rounded-lg border">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Business Settings</h3>
          <p className="text-xs text-neutral-400">
            Enter the general information about your business.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
