import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { motion } from "framer-motion";

import { alertActions } from "../../app/store";

import * as HeIcons from "react-icons/fa6";

const Alert = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const alert = useSelector((x) => x.alert.value);

  useEffect(() => {
    // Clear alert on location change
    dispatch(alertActions.clear());
  }, [location, dispatch]);

  useEffect(() => {
    // Automatically dismiss alert after 20 seconds
    const timer = setTimeout(() => {
      dispatch(alertActions.clear());
    }, 20000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [dispatch, alert]);

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
      className="fixed top-24 right-44 z-[1050] w-full max-w-sm font-br"
    >
      <div
        className={`${
          alert.type === "alert-success"
            ? "bg-green-50 border-l-4 border-green-500 text-green-700"
            : "bg-red-50 border-l-4 border-red-500 text-red-700"
        } px-4 py-2 rounded shadow-md`}
        role="alert"
      >
        <div className="flex flex-col items-start">
          {/* Alert Content */}
          <div className="flex flex-row justify-between w-full">
            <strong className="font-bold">
              {alert.type === "alert-success" ? "Success" : "Error!"}
            </strong>
            {/* Close Button */}
            <button
              className={`ml-3 ${
                alert.type === "alert-success"
                  ? " text-green-700 hover:text-green-900 "
                  : " text-red-700 hover:text-red-900"
              } focus:outline-none`}
              onClick={() => dispatch(alertActions.clear())}
            >
              <HeIcons.FaX size={14} className="font-bold" />
            </button>
          </div>
          <div className="w-full">
            <span className="block text-xs">{alert.message}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Alert;
