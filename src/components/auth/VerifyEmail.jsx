import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import OtpInput from "react18-input-otp";

import { alertActions } from "../../app/store";
import { login, reset, verify } from "../../features/auth/authSlice";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const email = JSON.parse(localStorage.getItem("email"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      code: otp,
    };

    dispatch(alertActions.clear());

    try {
      setLoading(true);

      await dispatch(verify(userData)).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));
      navigate("/auth/login");
      dispatch(
        alertActions.success({
          message: "Verification was successful",
          showAfterRedirect: true,
        })
      );
      setLoading(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };

  function handleChange(otp) {
    setOtp(otp);
  }

  return (
    <div className=" text-left">
      <h3 className="text-xl font-bold text-nelsa_dark_blue mb-2">
        Enter your OTP
      </h3>
      <p className="mt-1 text-sm text-gray-500 mb-8">
        Enter the 6-digit confirmation code sent to your email address
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label className="block text-nelsa_dark_blue text-sm font-semibold mb-2">
            Enter your Code here
          </label>
          <OtpInput
            value={otp}
            onChange={handleChange}
            containerStyle=""
            isInputNum={true}
            inputStyle={{
              width: 55,
              height: 55,
              border: "2px solid #a0a0a0",
              marginRight: "7px",
              color: "#000",
              borderRadius: "9px",
              fontSize: "24px",
              fontWeight: "bold",
              outlineColor: "#000",
            }}
            numInputs={6}
            separator={<span></span>}
          />
        </div>

        <div className="flex items-baseline justify-between mt-5">
          {loading ? (
            <button
              type="submit"
              className="w-full px-4 py-3 mt-4 font-bold bg-[#414141] text-[#ffffff] rounded-md flex items-center justify-center"
              disabled={loading}
            >
              <span
                className="mr-5 inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </span>
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-3 mt-4 font-bold bg-nelsa_primary text-[#ffffff] rounded-md"
            >
              Submit
            </button>
          )}
        </div>
      </form>
      {/* <div className="flex justify-center mt-5">
        <Link className="text-sm " to="/auth/login">
          Return to login
        </Link>
      </div> */}
    </div>
  );
};

export default VerifyEmail;
