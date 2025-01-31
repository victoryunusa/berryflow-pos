import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import About from "./steps/About";
import Selfie from "./steps/Selfie";
import Identity from "./steps/Identity";
import Bank from "./steps/Bank";
import Review from "./steps/Review";
import { logout, reset } from "../../features/auth/authSlice";
import { getProfile } from "../../features/user/userSlice";

const FormTitles = ["About", "Business", "Selfie", "Review"];

const KYB = () => {
  const [selfie, setSelfie] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const isLastStep = activeStep === FormTitles.length - 1;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const initialValues = {
    city: "",
    state: "",
    business_type: "individual",
    business_nature: "",
    bvn: "",
    date_of_birth: "",
    address: "",
    business_name: "",
    file: null,
    country: "",
  };

  const validationSchema = [
    Yup.object().shape({
      bvn: Yup.string().required("This field is required!"),
      date_of_birth: Yup.string().required("This field is required!"),
      city: Yup.string().required("This field is required!"),
      state: Yup.string().required("This field is required!"),
      address: Yup.string().required("This field is required!"),
      business_type: Yup.string().required("This field is required!"),
    }),
    Yup.object().shape({
      business_nature: Yup.string().required("This field is required!"),
    }),
    Yup.object().shape({}),
  ];

  const currentValidationSchema = validationSchema[activeStep];

  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values) {
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));

    setActiveStep(activeStep + 1);
  }

  const _handleSubmit = async (values) => {
    const { bvn, address, date_of_birth } = values;

    const userData = {
      bvn: bvn,
      address: address,
      date_of_birth: date_of_birth,
      selfie,
    };

    if (isLastStep) {
      _submitForm(userData);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const { user } = useSelector((state) => state.user);
  console.log(user);

  if (user?.vendor?.kyc_fulfilled === 1) {
    return <Navigate to="/" />;
  }

  const PageDisplay = ({ errors, touched, values }) => {
    if (activeStep === 0) {
      return <About errors={errors} touched={touched} values={values} />;
    } else if (activeStep === 1) {
      return <Bank errors={errors} touched={touched} values={values} />;
    } else if (activeStep === 2) {
      return <Selfie selfie={selfie} setSelfie={setSelfie} />;
    } else {
      return (
        <Review
          ferrors={errors}
          touched={touched}
          initialValues={initialValues}
        />
      );
    }
  };

  const onLogout = async () => {
    await dispatch(logout()).unwrap();
    dispatch(reset());

    navigate("/auth/login");
    window.location.reload(true);
  };

  return (
    <div className="flex flex-row">
      <div className="flex-1 flex-col justify-center sm:text-left">
        <div className="bg-white p-4 md:p-10 rounded-lg w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="">
              <h3 className="text-2xl font-bold text-tt_rich_black">
                Set up your Nelsa account
              </h3>
              <p className="text-sm text-gray-500">
                Takes approximately 5 minutes.
              </p>
            </div>
            <div className="flex flex-row items-center gap-5">
              {FormTitles.map((FormTitle) => (
                <h4
                  className={`text-[0.9rem] md:text-[1rem] font-bold  ${
                    activeStep === 0 && FormTitle === "About"
                      ? "text-tt_rich_black"
                      : activeStep === 1 && FormTitle === "Business"
                      ? "text-tt_rich_black"
                      : activeStep === 2 && FormTitle === "Selfie"
                      ? "text-tt_rich_black"
                      : activeStep === 3 && FormTitle === "Review"
                      ? "text-tt_rich_black"
                      : "text-gray-400"
                  }`}
                  key={FormTitle}
                >
                  {FormTitle}
                </h4>
              ))}
              <button
                onClick={onLogout}
                className="py-2 px-3 text-sm font-bold bg-tt_rich_black text-white rounded-lg"
                type="button"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-300 h-1.5 rounded mt-3">
            <div
              className={`${
                activeStep === 0
                  ? "w-1/4"
                  : activeStep === 1
                  ? "w-2/4"
                  : activeStep === 2
                  ? "w-3/4"
                  : "w-4/4"
              } bg-tt_rich_black rounded h-1.5`}
            ></div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between w-full mt-3 md:mt-5">
            <div className="flex flex-col justify-between md:w-1/3 w-full md:h-[400px] mt-5">
              <div>
                <p className="text-sm text-gray-500">
                  For you to continue we will require a few information from you
                  such as your means of identification, utility bill etc.
                </p>
              </div>
              <div className="bg-tt_rich_black rounded-lg text-white p-5">
                <h1 className="font-semibold text-lg">
                  Tips for uploading documents
                </h1>
                <div className="flex flex-col mt-7 text-sm space-y-5">
                  <span className="flex flex-row space-x-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                        fill="#ffffff"
                      />
                    </svg>
                    <p>Use clear, non-blurry photos</p>
                  </span>
                  <span className="flex flex-row space-x-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                        fill="#ffffff"
                      />
                    </svg>
                    <p>Make sure ID numbers are visible</p>
                  </span>
                  <span className="flex flex-row space-x-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
                        fill="#ffffff"
                      />
                    </svg>
                    <p>If applicable, make sure your photo is visible</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full md:w-2/4">
              {activeStep === FormTitles.length ? (
                <div>Success</div>
              ) : (
                <Formik
                  initialValues={initialValues}
                  validationSchema={currentValidationSchema}
                  onSubmit={_handleSubmit}
                >
                  {({ errors, touched, values }) => (
                    <Form id="onboarding">
                      {PageDisplay({ errors, touched, values })}
                      <div className="mt-5 gap-5 flex">
                        {activeStep !== 0 && (
                          <button
                            type="button"
                            className="md:w-44 w-28 flex-1 mt-2 p-2.5 border border-gray-200 text-gray-600 rounded-md "
                            onClick={_handleBack}
                          >
                            Back
                          </button>
                        )}

                        <button
                          type="submit"
                          className="md:w-44 w-28 mt-2 p-2.5 h-12 flex-1 text-white rounded-md bg-tt_rich_black"
                        >
                          <span className="text-md font-bold">
                            {isLastStep ? "Submit" : "Next"}
                          </span>
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYB;
