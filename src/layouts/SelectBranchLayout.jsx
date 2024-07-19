import React, { useLayoutEffect } from "react";
import { Outlet, NavLink, Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const SelectBranchLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);

  useLayoutEffect(() => {
    if (user.vendor_id === null) {
      navigate("/welcome");
    }
  }, [navigate, user.vendor_id]);

  return (
    <div className="min-h-screen font-manrope tracking-wide  flex items-center justify-center p-5 bg-white text-gray-800 overflow-x-0">
      <Outlet />
    </div>
  );
};

export default SelectBranchLayout;
