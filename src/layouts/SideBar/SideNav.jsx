import React from "react";
import * as HeIcons from "react-icons/fa6";
import { Link, NavLink, useLocation } from "react-router-dom";
import SubMenu from "./SubMenu";
import { subMenusList } from "./SidebarData";
import logo from "../../assets/images/logo-white.svg";

const SideNav = () => {
  return (
    <div className="md:w-64 bg-nelsa_primary h-screen flex-1 fixed border-r border-neutral-600 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full ">
        <Link
          href="/"
          className="flex flex-row py-[21.5px] space-x-6 items-center justify-center md:justify-start md:px-6 border-b border-neutral-600 w-full"
        >
          <span className="">
            <img className="w-28" src={logo} alt="CaterOS" />
          </span>
        </Link>
        <div className="flex flex-col space-y-2 ">
          <ul className="whitespace-pre py-5 text-[0.8rem] flex flex-col gap-1 overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100">
            <li className="">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaHouse size={16} className="min-w-max" />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/billing_counter"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaCashRegister size={16} className="min-w-max" />
                Billing Counters
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaCartShopping size={16} className="min-w-max" />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaUsers size={16} className="min-w-max" />
                Customers
              </NavLink>
            </li>

            <>
              {subMenusList?.map((menu) => (
                <div key={menu.name}>
                  <SubMenu data={menu} />
                </div>
              ))}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
