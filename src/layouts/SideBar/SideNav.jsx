import React, { useEffect, useState } from "react";
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
      window.location.reload(true);
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  };

  return (
    <div className="md:w-64 bg-nelsa_primary h-screen flex-1 fixed hidden md:flex">
      <div className="flex flex-col space-y-2 w-full ">
        <div className="relative z-50 hidden md:block px-5 py-5 w-full">
          <button
            className="flex flex-row items-center justify-between hover:cursor-pointer border border-cyan-900 rounded-md px-3 py-2 bg-cyan-950 w-full"
            onClick={() => setIsOpenBranchSelect(!isOpenBranchSelect)}
          >
            <span className="flex flex-row items-center gap-3">
              <span className="p-2 rounded-md bg-white">
                <HeIcons.FaStore
                  size={20}
                  className="min-w-max text-nelsa_primary"
                />
              </span>
              <span className="flex flex-col items-start">
                <h1 className="text-xs text-neutral-400 font-bold">
                  {user?.vendor?.business_name}
                </h1>
                <h1 className="text-xs text-white">{activeBranch?.name}</h1>
              </span>
            </span>

            <span>
              <IoIosCode
                className="min-w-max -mt-2 text-neutral-200 rotate-90"
                size={18}
              />
            </span>
          </button>
          {isOpenBranchSelect === true ? (
            <div className="absolute top-8 right-0 z-auto transition ease-in duration-700">
              <div className="w-64 rounded-lg shadow-md my-2 pin-t pin-l bg-white border">
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
                          <p className="block  text-sm cursor-pointer">
                            {branch.name}
                          </p>
                        </span>
                      </span>
                    </li>
                  ))}
                  {/* <hr className="mt-2 p-2" />
                      <li className="">
                        <span className="flex flex-row items-center justify-between">
                          <span className="flex items-center space-x-3">
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M19.7887 4.22031C16.8287 1.27031 12.0287 1.27031 9.08868 4.22031C7.01868 6.27031 6.39868 9.22031 7.19868 11.8203L2.49868 16.5203C2.16868 16.8603 1.93868 17.5303 2.00868 18.0103L2.30868 20.1903C2.41868 20.9103 3.08868 21.5903 3.80868 21.6903L5.98868 21.9903C6.46868 22.0603 7.13868 21.8403 7.47868 21.4903L8.29868 20.6703C8.49868 20.4803 8.49868 20.1603 8.29868 19.9603L6.35868 18.0203C6.06868 17.7303 6.06868 17.2503 6.35868 16.9603C6.64868 16.6703 7.12868 16.6703 7.41868 16.9603L9.36868 18.9103C9.55868 19.1003 9.87868 19.1003 10.0687 18.9103L12.1887 16.8003C14.7787 17.6103 17.7287 16.9803 19.7887 14.9303C22.7387 11.9803 22.7387 7.17031 19.7887 4.22031ZM14.4987 12.0003C13.1187 12.0003 11.9987 10.8803 11.9987 9.50031C11.9987 8.12031 13.1187 7.00031 14.4987 7.00031C15.8787 7.00031 16.9987 8.12031 16.9987 9.50031C16.9987 10.8803 15.8787 12.0003 14.4987 12.0003Z"
                                fill="currentColor"
                              />
                            </svg>
                            <p className="block  text-sm cursor-pointer">
                              Add Branch
                            </p>
                          </span>
                        </span>
                      </li> */}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
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
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/wallet"
                className={({ isActive }) =>
                  isActive ? "activeLink" : "normalLink"
                }
              >
                <HeIcons.FaWallet size={16} className="min-w-max" />
                Wallet
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
