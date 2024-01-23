import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { motion } from "framer-motion";

import { alertActions } from "../../app/store";

const Alert = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useSelector((x) => x.alert.value);

  useEffect(() => {
    // clear alert on location change
    dispatch(alertActions.clear());
  }, [location, dispatch]);

  setTimeout(() => {
    dispatch(alertActions.clear());
  }, 20000);

  if (!alert) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="flex flex-row font-manrope justify-end w-full top-24 right-0 absolute z-[1000] transition ease-in-out  duration-500 delay-150"
    >
      <div
        className={`${
          alert.type === "alert-success"
            ? "bg-green-50 border-l-4 border-green-500 text-green-700 "
            : "bg-red-50 border-l-4 border-red-500 text-red-700 "
        }px-4 py-2 rounded w-1/3  mr-10`}
        role="alert"
      >
        <span className="flex flex-col">
          <strong className="font-bold mr-10">
            {alert.type === "alert-success" ? "Success" : "Error!"}
          </strong>
          <span className="block sm:inline text-sm">{alert.message}</span>
        </span>

        <span
          className="absolute top-0 bottom-0 right-10 px-4 py-3"
          onClick={() => dispatch(alertActions.clear())}
        >
          <svg
            className={`fill-current h-6 w-6 ${
              alert.type === "alert-success" ? "text-green-500" : "text-red-500"
            }`}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    </motion.div>
  );
};

export default Alert;
