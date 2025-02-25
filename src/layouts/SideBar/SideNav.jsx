import React, { useEffect, useRef, useState } from "react";
import * as HeIcons from "react-icons/fa6";
import { IoIosCode } from "react-icons/io";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import SubMenu from "./SubMenu";
import { subMenusList } from "./SidebarData";
import logo from "../../assets/images/truetab-white.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  reset as profileReset,
} from "../../features/user/userSlice";
import { getBranches } from "../../features/branch/branchSlice";
import { alertActions } from "../../app/store";
import { selectBranch } from "../../features/auth/authSlice";
import { getRegister } from "../../features/pos/businessRegisterSlice";

const SideNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenBranchSelect, setIsOpenBranchSelect] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpenBranchSelect(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //const { token } = useSelector((state) => state.auth);

  const { user } = useSelector((state) => state.user);
  const { branches } = useSelector((state) => state.branches);

  const activeBranch = branches?.find((branch) => branch.id === user.branch_id);

  //console.log(branchIndex);

  useEffect(() => {
    dispatch(getProfile());
    return () => {
      dispatch(profileReset());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  useEffect(() => {
    if (user?.branch_id === null) {
      navigate("/select/branch");
    }
  }, [navigate, user?.branch_id]);

  const onSetBranch = async (branchId) => {
    setIsOpenBranchSelect(!isOpenBranchSelect);
    // //setActiveBranch(branchId);
    // console.log(branchId);
    // window.location.reload(true);
    dispatch(alertActions.clear());

    try {
      const logged_user_slug = user.slug;
      const branch_slug = branchId.slug;

      await dispatch(selectBranch({ logged_user_slug, branch_slug })).unwrap();
      dispatch(getRegister());
      navigate("/");
      window.location.reload(true);
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  };

  return (
    <div className="md:w-72 bg-white h-screen flex-1 fixed hidden md:flex">
      <div className="flex flex-col space-y-2 w-full ">
        <div
          ref={dropdownRef}
          className="relative z-50 hidden md:block px-5 py-5 w-full"
        >
          <button
            className="flex flex-row items-center justify-between hover:cursor-pointer rounded-lg px-2 py-2 bg-tt_celestial_blue w-full"
            onClick={() => setIsOpenBranchSelect((prev) => !prev)}
          >
            <span className="flex flex-row items-center gap-3">
              <span className="p-2 rounded bg-white">
                <HeIcons.FaStore
                  size={20}
                  className="min-w-max text-tt_celestial_blue"
                />
              </span>
              <span className="flex flex-col items-start">
                <h1 className="text-xs text-blue-100 font-bold">
                  {user?.vendor?.business_name}
                </h1>
                <h1 className="text-xs text-white">{activeBranch?.name}</h1>
              </span>
            </span>
            <span>
              <IoIosCode
                className="min-w-max text-neutral-100 rotate-90"
                size={18}
              />
            </span>
          </button>
          {isOpenBranchSelect && (
            <div className="absolute top-20 left-5 z-auto transition ease-in duration-700 w-full">
              <div className="w-5/6 rounded-lg shadow-md my-2 pin-t pin-l bg-white border">
                <ul className="list-reset overflow-y-scroll p-2">
                  {branches?.map((branch) => (
                    <li
                      key={branch.slug}
                      onClick={() => onSetBranch(branch)}
                      className={
                        activeBranch.slug === branch.slug
                          ? "activeBranchStyle"
                          : "normalBranchStyle"
                      }
                    >
                      <span className="flex flex-row items-center justify-between">
                        <span className="flex items-center space-x-3">
                          <HeIcons.FaCircleDot />
                          <p className="block text-sm cursor-pointer">
                            {branch.name}
                          </p>
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col space-y-2 flex-grow">
          <ul className="whitespace-pre py-5 px-5 text-[0.8rem] gap-1 flex flex-col overflow-scroll h-[750px]">
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
                Orders
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/wallet"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaWallet size={16} className="min-w-max" />
                Wallet
              </NavLink>
            </li> */}
            <li>
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaUsers size={20} className="min-w-max" />
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
            <li>
              <NavLink
                to="/manage/company"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaGear size={20} className="min-w-max" />
                Settings
              </NavLink>
            </li>
          </ul>
        </div>
        {/* <div className="flex-1 fixed bottom-0 bg-tt_rich_black w-64 h-1/2 text-sm z-50 shadow-lg  max-h-20 my-auto  whitespace-pre  font-medium  ">
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
