import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import * as HeIcons from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import logo from "../../assets/images/Nelsa_logo1.svg";
import { NavLink, useLocation } from "react-router-dom";
import SubMenu from "./SubMenu";
import { subMenusList } from "./SidebarData";

const SideBar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const sidebarRef = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);

  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "19rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "19rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  // const onClick = () => {
  //   //setIsOpen(!isOpen);
  // };

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden"
        } `}
      ></div>
      <motion.div
        ref={sidebarRef}
        variants={Nav_animation}
        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className="bg-white text-zinc-600 z-[999] w-[17.5rem] max-w-[17.5rem] overflow-hidden md:relative top-0 absolute
        h-screen"
      >
        {/* Logo Brand */}
        <div className="flex p-6 flex-row space-x-3">
          <span className="">
            <img className="w-28" src={logo} alt="logo" />
          </span>
        </div>
        {/* Menus */}
        <div className="flex flex-col h-full">
          {/* First */}
          <ul className="whitespace-pre px-6 py-5 text-[0.8rem] flex flex-col gap-1 overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[78%] h-[80%] ">
            <li>
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
                Billing Counter Dashboard
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
            {(open || isTabletMid) && (
              <>
                {subMenusList?.map((menu) => (
                  <div key={menu.name}>
                    <SubMenu data={menu} />
                  </div>
                ))}
              </>
            )}

            {/* <li>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaBell size={21} className="min-w-max" />
                Notifications
              </NavLink>
            </li> */}
            {/* <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaGear size={21} className="min-w-max" />
                Settings
              </NavLink>
            </li> */}
          </ul>
          {/* Second */}
          {open && (
            <div className="flex-1 text-sm z-50 shadow-lg  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-gray-200 p-4 items-center justify-between">
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
      <div>
        <div
          className="md:hidden m-6 w-5 z-[999]"
          onClick={() => setOpen(true)}
        >
          <HeIcons.FaBars size={25} />
        </div>
      </div>
    </>
  );
};

export default SideBar;
