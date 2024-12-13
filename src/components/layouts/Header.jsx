import React, { useEffect, useState } from "react";
import * as HeIcons from "react-icons/fa6";
import { cn } from "../../functions/functions";
import useScroll from "../../hooks/useScroll";
import { Avatar } from "primereact/avatar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBranches, reset } from "../../features/branch/branchSlice";
import {
  getProfile,
  reset as profileReset,
} from "../../features/user/userSlice";
import { alertActions } from "../../app/store";
import { logout, selectBranch } from "../../features/auth/authSlice";

import logo from "../../assets/images/favicon.svg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenBranchSelect, setIsOpenBranchSelect] = useState(false);

  const { token } = useSelector((state) => state.auth);

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
      //dispatch(reset());
      window.location.reload(true);
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  };

  const onLogout = async () => {
    await dispatch(logout()).unwrap();
    dispatch(reset());

    navigate("/auth/login");
    //window.location.reload(true);
  };

  const scrolled = useScroll(5);

  const activeBranchStyle =
    "text-nelsa_primary p-2 cursor-pointer hover:bg-zinc-100 rounded-md";
  const normalBranchStyle =
    "text-zinc-400 hover:text-nelsa_primary p-2 cursor-pointer hover:bg-zinc-100 rounded-md";
  return (
    <div
      className={cn(`sticky inset-x-0 top-0 z-30 w-full transition-all py-2`, {
        "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
      })}
    >
      <div className="flex h-[47px] items-center justify-between px-5 md:px-10 ">
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <span className="">
              <img className="w-10" src={logo} alt="CaterOS" />
            </span>
          </Link>
        </div>

        <div className="flex flex-row justify-end items-center space-x-5">
          <div className="relative z-50 hidden md:block">
            <button
              className="flex flex-row items-center space-x-2 hover:cursor-pointer border rounded-md px-3 py-2"
              onClick={() => setIsOpenBranchSelect(!isOpenBranchSelect)}
            >
              <span>
                <HeIcons.FaStore
                  size={20}
                  className="min-w-max text-nelsa_primary"
                />
              </span>
              <span className="flex flex-row items-start justify-center space-x-2">
                <h1 className="text-xs text-neutral-500 font-bold">
                  {activeBranch?.name}
                </h1>
              </span>
              <span>
                <HeIcons.FaSortDown
                  className="min-w-max -mt-2 text-neutral-500"
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
                            ? activeBranchStyle
                            : normalBranchStyle
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

          <Link
            to="/pos"
            className="flex bg-green-100 text-green-800 items-center text-small font-semibold px-3 py-2.5 rounded-md hover:cursor-pointer gap-1"
          >
            <HeIcons.FaCashRegister size={16} />
            Point Of Sale
          </Link>
          <div className="relative z-50">
            <button
              className="flex flex-row items-center space-x-2 hover:cursor-pointer"
              onClick={() => setIsOpenProfile(!isOpenProfile)}
            >
              <Avatar
                label={
                  user &&
                  `${user?.first_name?.charAt(0) + user?.last_name?.charAt(0)}`
                }
                className="h-10 w-10 font-manrope text-gray-700 text-md font-bold rounded-full"
              />
              {/* <span className="flex flex-col items-start">
                <p className="text-xs text-gray-400">Hi,</p>
                <h1 className="text-xs text-gray-700 font-bold">
                  {user && user.first_name}
                </h1>
              </span>
              <span>
                <span>
                  <HeIcons.FaSortDown
                    className="min-w-max -mt-2 text-gray-600"
                    size={18}
                  />
                </span>
              </span> */}
            </button>
            {isOpenProfile === true ? (
              <div className="absolute top-12 right-0 z-50 transition ease-in duration-700">
                <div className="w-64 rounded-lg shadow-md my-2 pin-t pin-l bg-white border">
                  <ul className="list-reset overflow-y-scroll p-2">
                    <Link
                      to="/billing"
                      onClick={() => setIsOpenProfile(!isOpenProfile)}
                      className="flex w-full hover:bg-gray-100 text-zinc-400 hover:text-nelsa_primary p-2 rounded-md  cursor-pointer"
                    >
                      <span className="flex flex-row items-center justify-between">
                        <span className="flex items-center space-x-3">
                          <HeIcons.FaCrown />
                          <p className="block  text-small cursor-pointer">
                            My Subscription
                          </p>
                        </span>
                      </span>
                    </Link>
                    <li
                      onClick={() => setIsOpenProfile(!isOpenProfile)}
                      className="hover:bg-gray-100 text-zinc-400 hover:text-nelsa_primary p-2 rounded-md  cursor-pointer"
                    >
                      <span className="flex flex-row items-center justify-between">
                        <span className="flex items-center space-x-3">
                          <HeIcons.FaUser />
                          <p className="block  text-small cursor-pointer">
                            Profile
                          </p>
                        </span>
                      </span>
                    </li>
                    <li
                      onClick={onLogout}
                      className="hover:bg-gray-100 text-zinc-400 hover:text-nelsa_primary p-2 rounded-md cursor-pointer"
                    >
                      <span className="flex flex-row items-center justify-between">
                        <span className="flex items-center space-x-3">
                          <HeIcons.FaLock />
                          <p className="block  text-small cursor-pointer">
                            Logout
                          </p>
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
