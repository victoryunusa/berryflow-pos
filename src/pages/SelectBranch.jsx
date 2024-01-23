import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, NavLink, Link, useNavigate, Navigate } from "react-router-dom";
import { alertActions } from "../app/store";

import { reset, selectBranch } from "../features/auth/authSlice";
import { getProfile, reset as profileReset } from "../features/user/userSlice";

const SelectBranch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProfile());
    return () => {
      dispatch(profileReset());
    };
  }, [dispatch]);

  const { user, isError, message } = useSelector((state) => state.user);

  const onSetBranch = async (branchId) => {
    dispatch(alertActions.clear());

    try {
      const logged_user_slug = user.slug;
      const branch_slug = branchId;

      await dispatch(selectBranch({ logged_user_slug, branch_slug })).unwrap();
      navigate("/");
      //dispatch(reset());
      window.location.reload(true);
    } catch (error) {
      dispatch(alertActions.error(error));
    }
  };

  return (
    <div className="flex flex-col md:w-1/3 w-full bg-white p-5 rounded-lg">
      <h3 className="text-md font-bold text-zinc-700">Select your Branch</h3>
      <p className="text-sm text-zinc-500">
        You can choose from {user.branches?.length} store(s)
      </p>
      <div className="space-y-3 mt-5">
        {user.branches?.map((branch) => (
          <button
            key={branch.slug}
            onClick={() => onSetBranch(branch.slug)}
            type="button"
            className="flex flex-col w-full border rounded-lg px-5 py-3 cursor-pointer hover:bg-zinc-200"
          >
            <span className="text-sm font-bold text-zinc-700">
              {branch.store_code} - {branch.name}
            </span>
            <p>{branch?.address}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SelectBranch;
