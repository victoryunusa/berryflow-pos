import { useEffect, useRef, useState } from "react";
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
import { logout } from "../../features/auth/authSlice";

import logo from "../../assets/images/favicon.svg";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpenProfile(false);
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

  const onLogout = async () => {
    await dispatch(logout()).unwrap();
    dispatch(reset());

    navigate("/auth/login");
    //window.location.reload(true);
  };

  const scrolled = useScroll(5);

  return (
    <div
      className={cn(`sticky inset-x-0 top-0 z-30 w-full transition-all py-2`, {
        "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
      })}
    >
      <div className="flex h-[65px] items-center justify-between px-5 md:px-10">
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
          <Link
            to="/pos"
            className="flex flex-row bg-tt_uranian_blue-900 text-tt_celestial_blue border border-tt_celestial_blue items-center justify-centerr text-small font-semibold px-3 py-2 rounded-lg hover:cursor-pointer gap-2"
          >
            <HeIcons.FaCashRegister size={16} />
            <p>Point Of Sale</p>
          </Link>
          <div ref={dropdownRef} className="relative z-50">
            <button
              className="flex flex-row items-center space-x-2 hover:cursor-pointer bg-neutral-100 border px-3 py-3 rounded-lg"
              onClick={() => setIsOpenProfile(!isOpenProfile)}
            >
              {/* <Avatar
                label={
                  user &&
                  `${user?.first_name?.charAt(0) + user?.last_name?.charAt(0)}`
                }
                className="h-10 w-10 font-manrope text-gray-700 text-md font-bold rounded-full"
              /> */}
              <HeIcons.FaUser className="min-w-max text-gray-600" size={18} />
              <span className="flex flex-col items-start">
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
              </span>
            </button>
            {isOpenProfile === true ? (
              <div className="absolute top-12 right-0 z-50 transition ease-in duration-700">
                <div className="w-64 rounded-lg shadow-md my-2 pin-t pin-l bg-white border">
                  <ul className="list-reset overflow-y-scroll p-2">
                    <Link
                      to="/billing"
                      onClick={() => setIsOpenProfile(!isOpenProfile)}
                      className="flex w-full hover:bg-gray-100 text-zinc-400 hover:text-tt_rich_black p-2 rounded-md  cursor-pointer"
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
                      className="hover:bg-gray-100 text-zinc-400 hover:text-tt_rich_black p-2 rounded-md  cursor-pointer"
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
                      className="hover:bg-gray-100 text-red-600 hover:text-tt_rich_black p-2 rounded-md cursor-pointer"
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
