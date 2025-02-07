import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { menusList } from "./SidebarData";

const Sidebar = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className="flex flex-row overflow-x-auto whitespace-nowrap border-b">
      {menusList.map((menu, index) => (
        <li className="flex" key={index}>
          <NavLink
            to={`${menu.path}`}
            className={`hover:bg-gray-200 hover:text-tt_rich_black ${
              pathname.includes(menu.path) &&
              "text-tt_rich_black border-b-2 border-tt_rich_black"
            } capitalize p-3 text-sm`}
          >
            {menu?.name}
          </NavLink>
        </li>
      ))}
    </div>
  );
};

export default Sidebar;
