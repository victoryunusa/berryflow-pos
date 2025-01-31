import React, { useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
//import { getBanks, reset } from "../../../features/banks/bankSlice";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const Bank = ({ errors, touched, values, setFieldValue }) => {
  const dispatch = useDispatch();

  // useLayoutEffect(() => {
  //   dispatch(getBanks());
  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [isError, message, dispatch]);

  return (
    <div className="mt-5">
      <div className="">
        <label className="block text-h28_dark_green text-md font-semibold mb-1">
          Business category
        </label>
        <Field
          as="select"
          className="w-full px-3 py-2.5 text-sm text-neutral-500 placeholder-gray-600 border rounded-md focus:shadow-outline"
        >
          <option value="GH">Other</option>
          <option value="NG">Nigerian</option>
        </Field>
      </div>
      <div className="mt-4">
        <label className="block text-tt_rich_black text-md font-semibold mb-1">
          Nature of business
        </label>
        <Field
          name="business_nature"
          className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
            errors.business_nature && touched.business_nature
              ? "border-red-500"
              : ""
          } focus:border-tt_rich_black`}
          component={CustomInputComponent}
          placeholder="Describe the nature of your business"
        />
        <ErrorMessage
          name="business_nature"
          component="div"
          className="text-red-500 text-sm"
        />
      </div>
      {values.business_type !== "individual" && (
        <>
          <div className="flex md:flex-row flex-col md:space-x-4">
            <div className="mt-4 md:w-1/3">
              <label className="block text-tt_rich_black text-sm font-semibold">
                Registration Number
              </label>
              <Field
                type="text"
                name="bvn"
                placeholder="Enter your bvn"
                autoComplete="off"
                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                  errors.bvn && touched.bvn ? "border-red-500" : ""
                } focus:border-tt_rich_black `}
              />
              <ErrorMessage
                name="bvn"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-4 md:w-1/3">
              <label className="block text-tt_rich_black text-sm font-semibold">
                Tax Identification Number
              </label>
              <Field
                type="text"
                name="bvn"
                placeholder="Enter your bvn"
                autoComplete="off"
                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                  errors.bvn && touched.bvn ? "border-red-500" : ""
                } focus:border-tt_rich_black `}
              />
              <ErrorMessage
                name="bvn"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-4 md:w-1/3">
              <label className="block text-tt_rich_black text-sm font-semibold">
                Incorporation Date
              </label>
              <Field
                type="date"
                name="date_of_birth"
                autoComplete="off"
                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                  errors.date_of_birth && touched.date_of_birth
                    ? "border-red-500"
                    : ""
                } focus:border-tt_rich_black `}
              />
              <ErrorMessage
                name="date_of_birth"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
          </div>
        </>
      )}
      <div className="mt-4">
        <label className="block text-h28_dark_green text-md font-semibold mb-1">
          Government issued ID
        </label>
        <Field
          type={"file"}
          accept={"image/jpeg,image/png"}
          onChange={(e) => {
            setFieldValue("file", e.currentTarget.files[0]);
          }}
          name="file"
          className="w-full px-3 py-2.5 mt-1 border text-black text-sm rounded-lg focus:border-tt_rich_black focus:outline-none"
        />
      </div>
      <div className="mt-4">
        <label className="block text-h28_dark_green text-md font-semibold mb-1">
          Utility bill
        </label>
        <Field
          type={"file"}
          accept={"image/jpeg,image/png"}
          onChange={(e) => {
            setFieldValue("file", e.currentTarget.files[0]);
          }}
          name="file"
          className="w-full px-3 py-2.5 mt-1 border text-black text-sm rounded-lg focus:border-tt_rich_black focus:outline-none"
        />
      </div>

      {values.business_type === "business_name" && (
        <>
          <div className="mt-4">
            <label className="block text-h28_dark_green text-md font-semibold mb-1">
              CAC registration form
            </label>
            <Field
              type={"file"}
              accept={"image/jpeg,image/png"}
              onChange={(e) => {
                setFieldValue("file", e.currentTarget.files[0]);
              }}
              name="file"
              className="w-full px-3 py-2.5 mt-1 border text-black text-sm rounded-lg focus:border-tt_rich_black focus:outline-none"
            />
          </div>
          <div className="mt-4">
            <label className="block text-h28_dark_green text-md font-semibold mb-1">
              Certificate of registration
            </label>
            <Field
              type={"file"}
              accept={"image/jpeg,image/png"}
              onChange={(e) => {
                setFieldValue("file", e.currentTarget.files[0]);
              }}
              name="file"
              className="w-full px-3 py-2.5 mt-1 border text-black text-sm rounded-lg focus:border-tt_rich_black focus:outline-none"
            />
          </div>
        </>
      )}
      {values.business_type === "incorporated" && (
        <>
          <div className="mt-4">
            <label className="block text-h28_dark_green text-md font-semibold mb-1">
              Certificate of Incorporation
            </label>
            <Field
              type={"file"}
              accept={"image/jpeg,image/png"}
              onChange={(e) => {
                setFieldValue("file", e.currentTarget.files[0]);
              }}
              name="file"
              className="w-full px-3 py-2.5 mt-1 border text-black text-sm rounded-lg focus:border-tt_rich_black focus:outline-none"
            />
          </div>
          <div className="mt-4">
            <label className="block text-h28_dark_green text-md font-semibold mb-1">
              Memorandum and Article of Association
            </label>
            <Field
              type={"file"}
              accept={"image/jpeg,image/png"}
              onChange={(e) => {
                setFieldValue("file", e.currentTarget.files[0]);
              }}
              name="file"
              className="w-full px-3 py-2.5 mt-1 border text-black text-sm rounded-lg focus:border-tt_rich_black focus:outline-none"
            />
          </div>
          <div className="mt-4">
            <label className="block text-h28_dark_green text-md font-semibold mb-1">
              Particulars of Directors
            </label>
            <Field
              type={"file"}
              accept={"image/jpeg,image/png"}
              onChange={(e) => {
                setFieldValue("file", e.currentTarget.files[0]);
              }}
              name="file"
              className="w-full px-3 py-2.5 mt-1 border text-black text-sm rounded-lg focus:border-tt_rich_black focus:outline-none"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Bank;
