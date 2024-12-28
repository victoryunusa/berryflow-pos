import React, { useEffect, useLayoutEffect } from "react";
import { Outlet, NavLink, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

const OnboardingLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  useLayoutEffect(() => {
    if (user === null) {
      navigate("/auth/login");
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  // setTimeout(() => {
  //   dispatch(reset());
  //   dispatch(logout());
  // }, 1200000);

  //   if (user.vendor.is_activated === 1) {
  //     return <Navigate to="/" />;
  //   }

  return (
    <div className="min-h-screen font-br antialiased lg:flex-1 bg-white text-neutral-900 overflow-x-0 p-2 md:p-6">
      <Outlet />
    </div>
  );
};

export default OnboardingLayout;
