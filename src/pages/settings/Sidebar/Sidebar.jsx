import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { menusList } from "./SidebarData";

const Sidebar = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <ul className="flex flex-col gap-1">
        {menusList.map((menu, index) => (
          <NavLink
            key={index}
            to={`${menu.path}`}
            className={`hover:bg-gray-100 hover:text-nelsa_primary p-2.5 hover:rounded-lg w-full text-[0.9rem] ${
              pathname.includes(menu.path) &&
              "text-nelsa_primary bg-gray-100 rounded-lg"
            } capitalize`}
          >
            {menu?.name}
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
