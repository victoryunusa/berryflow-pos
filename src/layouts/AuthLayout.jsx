import React, { useEffect } from "react";

import { Outlet, NavLink, useNavigate } from "react-router-dom";

import logo from "../assets/images/logo-black.svg";
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
    <div className="bg-gray-100 p-3 font-manrope tracking-wide ">
      {/* <div className="w-1/2 flex flex-col justify-center items-center">
        <img src={logo} className="w-28" alt="logo" />
        <div className="flex items-center justify-center p-20">
          <img src={authImage} className="rounded-full" alt="Auth" />
        </div>
      </div> */}
      <main className="flex-1 ">
        <div className="flex flex-col justify-center items-center space-y-5 h-screen">
          <div className="flex items-center justify-center">
            <img className="w-[8.5rem]" src={logo} alt="logo" />
          </div>
          <div className="md:w-[28rem] w-[22rem] bg-white rounded-xl md:p-10 p-7">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
