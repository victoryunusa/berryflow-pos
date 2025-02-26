import React, { useEffect } from "react";

import { Outlet, NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/images/truetab.svg";
import authImage from "../assets/images/auth.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../features/auth/authSlice";

const AuthLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
    dispatch(reset());
  }, [token, isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className="bg-neutral-100 font-br antialiased text-base text-neutral-700">
      {/* <div className="w-1/2 flex flex-col justify-center items-center">
        <img src={logo} className="w-28" alt="logo" />
        <div className="flex items-center justify-center p-20">
          <img src={authImage} className="rounded-full" alt="Auth" />
        </div>
      </div> */}
      <main className="flex-1 ">
        <div className="flex flex-col-reverse md:flex-row justify-start items-center space-y-5 h-screen gap-10">
          <div className="flex md:w-2/3 items-center justify-center w-full bg-white h-screen">
            <div className="p-8">
              <Outlet />
            </div>
          </div>
          <div className="flex items-center justify-center w-full md:w-1/3 ">
            <img className="w-[10rem]" src={logo} alt="logo" />
            {/* <h4 className="text-2xl font-bold text-tt_rich_black">TrueTab</h4> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
