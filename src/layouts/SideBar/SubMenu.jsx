import React, { useState } from "react";
import { motion } from "framer-motion";
import * as HeIcons from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";

const SubMenu = ({ data }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  return (
    <>
      <li
        className={` ${
          pathname.includes(data.path) ? "activeLink" : "normalLink"
        }`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <span>{data.icon}</span>
        <span className="w-full flex flex-row items-center justify-between">
          <p>{data.name}</p>
          <span>
            <HeIcons.FaChevronDown
              size={10}
              className={` ${subMenuOpen && "rotate-180"} duration-200 `}
            />
          </span>
        </span>
      </li>
      <motion.ul
        animate={
          subMenuOpen
            ? {
                height: "fit-content",
              }
            : {
                height: 0,
              }
        }
        className="flex h-0 flex-col pl-12 text-[0.8rem] font-normal overflow-hidden"
      >
        {data.subNav.map((submenu) => (
          <li key={submenu.title} className="">
            <NavLink
              to={`${submenu.path}`}
              className={`normalLink ${
                pathname.includes(submenu.path) && "activeLinkSub"
              } !bg-transparent capitalize`}
            >
              {submenu.title}
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};

export default SubMenu;
