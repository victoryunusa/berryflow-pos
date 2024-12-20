import React from "react";
import * as HeIcons from "react-icons/fa6";
import { Link, NavLink, useLocation } from "react-router-dom";
import SubMenu from "./SubMenu";
import { subMenusList } from "./SidebarData";
import logo from "../../assets/images/truetab-white.svg";

const SideNav = () => {
  return (
    <div className="md:w-64 bg-nelsa_primary h-screen flex-1 fixed hidden md:flex">
      <div className="flex flex-col space-y-6 w-full ">
        <Link
          href="/"
          className="flex flex-row py-[21.5px] space-x-6 items-center justify-center md:justify-start md:px-6 w-full"
        >
          <span className="">
            <img className="w-28" src={logo} alt="CaterOS" />
            {/* <h4 className="text-2xl font-bold text-white">TrueTab</h4> */}
          </span>
        </Link>
        <div className="flex flex-col space-y-2 flex-grow">
          <ul className="whitespace-pre py-5 text-[0.8rem] flex flex-col gap-1 overflow-scroll h-[750px]">
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
                to="/bill_counter"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaHardDrive size={16} className="min-w-max" />
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
                <HeIcons.FaCashRegister size={16} className="min-w-max" />
                POS Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/online_orders"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaCartShopping size={16} className="min-w-max" />
                Online Orders
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
        {/* <div className="flex-1 fixed bottom-0 bg-nelsa_primary w-64 h-1/2 text-sm z-50 shadow-lg  max-h-20 my-auto  whitespace-pre  font-medium  ">
          <div className="flex p-4 border-y border-neutral-700 items-center justify-between">
            <div>
              <p className="text-ms text-white font-semibold">Spark</p>
              <small>No-cost $0/month</small>
            </div>
            <div>
              <button
                type="button"
                className="flex items-center text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SideNav;
