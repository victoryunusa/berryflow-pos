import React from "react";
import Sidebar from "./Sidebar/Sidebar";

const Settings = () => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Settings/Company</h3>
        </div>
      </div>
      <div className="flex flex-row space-x-5">
        {/* <div className="w-1/4 p-5 bg-white rounded-lg">
          <Sidebar />
        </div> */}
        <div className="w-3/4 p-5 bg-white rounded-lg">Content</div>
      </div>
    </div>
  );
};

export default Settings;
