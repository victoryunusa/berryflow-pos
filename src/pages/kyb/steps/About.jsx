import React, { useEffect, useLayoutEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

import { useDispatch, useSelector } from "react-redux";
import { getStates, reset } from "../../../features/states/statesSlice";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const About = ({ errors, touched, values }) => {
  const { states, isError, message } = useSelector((state) => state.states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStates());
    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  return (
    <div className="mt-5">
      <div className="">
        <label className="block text-h28_dark_green text-md font-semibold mb-1">
          Buniness type
        </label>
        <div className="flex flex-col md:flex-row gap-2 md:gap-5 mt-4">
          <label
            className={`flex flex-row w-full md:w-1/3 rounded-lg border-[0.09rem] p-3.5  ${
              values.business_type === "individual"
                ? "border-nelsa_primary text-nelsa_primary"
                : "text-gray-400 border-gray-400"
            }`}
          >
            <Field type="radio" name="business_type" value="individual" />
            <span className="flex flex-col ml-3 font-semibold text-sm">
              Individual
              <p className="text-xs text-gray-400 font-normal">
                Not yet registered
              </p>
            </span>
          </label>
          <label
            className={`flex flex-row w-full md:w-1/3 rounded-lg border-[0.09rem] p-3.5  ${
              values.business_type === "business_name"
                ? "border-nelsa_primary text-nelsa_primary"
                : "text-gray-400 border-gray-400"
            }`}
          >
            <Field
              type="radio"
              className="text-nelsa_primary"
              name="business_type"
              value="business_name"
            />
            <span className="flex flex-col ml-3 font-semibold text-sm">
              Business Name
              <p className="text-xs text-gray-400 font-normal">
                Registered as a business name
              </p>
            </span>
          </label>
          <label
            className={`flex flex-row w-full md:w-1/3 rounded-lg border-[0.09rem] p-3.5  ${
              values.business_type === "incorporated"
                ? "border-nelsa_primary text-nelsa_primary"
                : "text-gray-400 border-gray-400"
            }`}
          >
            <Field type="radio" name="business_type" value="incorporated" />
            <span className="flex flex-col ml-3 font-semibold text-sm">
              Incorporated (LTD)
              <p className="text-xs text-gray-400 font-normal">
                Registered as a Limited Liability
              </p>
            </span>
          </label>
        </div>

        {/* <Field
          as="select"
          name="business_type"
          className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
            errors.business_type && touched.business_type
              ? "border-red-500"
              : ""
          } focus:border-blue-950`}
        >
          <option value="">Select</option>
          <option value="individual">Individual</option>
          <option value="business_name">Business Name</option>
          <option value="incorporated">Incorporated (LTD)</option>
        </Field> */}
        <ErrorMessage
          name="business_type"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>

      <div className="flex md:flex-row flex-col md:space-x-4 mt-4">
        <div className="mt-4 md:w-1/2">
          <label className="block text-nelsa_primary text-sm font-semibold">
            BVN
          </label>
          <Field
            type="text"
            name="bvn"
            placeholder="Enter your bvn"
            autoComplete="off"
            className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
              errors.bvn && touched.bvn ? "border-red-500" : ""
            } focus:border-nelsa_primary `}
          />
          <ErrorMessage
            name="bvn"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div className="mt-4 md:w-1/2">
          <label className="block text-nelsa_primary text-sm font-semibold">
            Date of birth
          </label>
          <Field
            type="date"
            name="date_of_birth"
            autoComplete="off"
            className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
              errors.date_of_birth && touched.date_of_birth
                ? "border-red-500"
                : ""
            } focus:border-nelsa_primary `}
          />
          <ErrorMessage
            name="date_of_birth"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-nelsa_primary text-md font-semibold mb-1">
          Address
        </label>
        <Field
          name="address"
          className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
            errors.address && touched.address ? "border-red-500" : ""
          } focus:border-nelsa_primary`}
          component={CustomInputComponent}
          placeholder="Address"
        />
        <ErrorMessage
          name="address"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
      <div className="flex md:flex-row flex-col md:space-x-4">
        <div className="mt-4 md:w-1/2">
          <label className="block text-nelsa_primary text-sm font-semibold">
            State
          </label>
          <Field
            as="select"
            name="state"
            className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
              errors.state && touched.state ? "border-red-500" : ""
            } focus:border-nelsa_primary`}
          >
            <option value="">Select</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="state"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
        <div className="mt-4 md:w-1/2">
          <label className="block text-nelsa_primary text-sm font-semibold">
            LGA
          </label>
          <Field
            as="select"
            name="city"
            className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
              errors.city && touched.city ? "border-red-500" : ""
            } focus:border-nelsa_primary`}
          >
            <option value="">Select</option>
            <option value="Married">Ikeja</option>
            <option value="Single">Single</option>
            <option value="Divorced">Divorced</option>
            <option value="Other">Other</option>
          </Field>
          <ErrorMessage
            name="city"
            component="div"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
