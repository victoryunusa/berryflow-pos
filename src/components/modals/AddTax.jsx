import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, FieldArray, getIn } from "formik";
import * as Yup from "yup";

import { alertActions } from "../../app/store";
import { addTax, getTaxes } from "../../features/tax/taxSlice";

const ErrorMessage2 = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? (
        <div className="text-sm text-red-500">{error}</div>
      ) : null;
    }}
  />
);

const TaxArrayErrors = (errors) =>
  typeof errors.tax_components === "string" ? (
    <div>{errors.tax_components}</div>
  ) : null;

const AddTax = ({ setOpenAdd, open, children }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    label: "",
    tax_type: "",
    tax_code: "",
    tax_components: [""],
  };

  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Tax name is required!"),
    tax_type: Yup.string().required("Tax type is required!"),
    tax_code: Yup.string().required("This field is required!"),
    tax_components: Yup.array()
      .of(
        Yup.object().shape({
          component: Yup.string().required("Required"), // these constraints take precedence
          percentage: Yup.string().required("Required"), // these constraints take precedence
        })
      )
      .required("Must have components"),
  });

  const handleSubmit = async (formValue) => {
    // setTimeout(() => {
    //   alert(JSON.stringify(formValue, null, 2));
    // }, 500);
    const { label, tax_type, tax_code, tax_components } = formValue;
    const tax_c = JSON.stringify(tax_components, null, 2);

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(addTax({ label, tax_type, tax_code, tax_c })).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));

      dispatch(
        alertActions.success({
          message: "Tax successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      // window.location.reload(true);
      dispatch(getTaxes());
      setLoading(false);
      setVisible(false);
      setOpenAdd(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };

  if (typeof document !== "undefined") {
    return createPortal(
      <>
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="flex items-center min-h-screen px-4 py-4">
            <div className="relative w-full max-w-xl p-6 md:p-6 mx-auto font-br bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">Add Tax</h3>
                    <h4
                      className="text-lg font-medium text-gray-500 hover:cursor-pointer"
                      onClick={() => setOpenAdd(false)}
                    >
                      X
                    </h4>
                  </div>

                  <div className="mt-5 flex flex-col justify-center items-center">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched, values }) => (
                        <Form className="w-full">
                          <div className="mt-4">
                            <label className="block text-nelsa_gray_3 text-xs font-semibold">
                              Tax Name
                            </label>
                            <Field
                              type="text"
                              placeholder="Enter area name"
                              name="label"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.label && touched.label
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="label"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_gray_3 text-xs font-semibold">
                              Tax Code
                            </label>
                            <Field
                              type="text"
                              placeholder="Enter area name"
                              name="tax_code"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.tax_code && touched.tax_code
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="tax_code"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_gray_3 text-xs font-semibold">
                              Type
                            </label>
                            <Field
                              as="select"
                              name="tax_type"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.tax_type && touched.tax_type
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            >
                              <option value="">Select type</option>
                              <option value="INCLUSIVE">Inclusive</option>
                              <option value="EXCLUSIVE">Exclusive</option>
                            </Field>
                            <ErrorMessage
                              name="tax_type"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="mt-4">
                            <FieldArray
                              name="tax_components"
                              render={(arrayHelpers) => (
                                <div>
                                  <div className="w-full flex flex-row">
                                    <label className="block w-1/2 text-nelsa_gray_3 text-xs font-semibold">
                                      Tax Component
                                    </label>
                                    <label className="block text-nelsa_gray_3 text-xs font-semibold">
                                      Tax Percentage
                                    </label>
                                  </div>

                                  {values.tax_components.map(
                                    (friend, index) => (
                                      <div
                                        className=" flex flex-row space-x-3 "
                                        key={index}
                                      >
                                        {/** both these conventions do the same */}
                                        <div className="w-1/2">
                                          <Field
                                            type="text"
                                            placeholder="Please enter tax type (eg. VAT)"
                                            className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md  focus:outline-none focus:border-blue-950`}
                                            name={`tax_components.${index}.component`}
                                          />
                                          <ErrorMessage2
                                            name={`tax_components.${index}.component`}
                                          />
                                        </div>
                                        <div className="w-1/2">
                                          <Field
                                            type="text"
                                            placeholder="Please enter tax percentage"
                                            className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none focus:border-blue-950`}
                                            name={`tax_components.${index}.percentage`}
                                          />
                                          <ErrorMessage2
                                            name={`tax_components.${index}.percentage`}
                                          />
                                        </div>
                                        {values.tax_components.length !== 1 && (
                                          <button
                                            type="button"
                                            className="flex items-center justify-center text-2xl mt-2 w-10 h-8 bg-red-600 text-white p-1.5 rounded"
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                          >
                                            -
                                          </button>
                                        )}
                                      </div>
                                    )
                                  )}

                                  <button
                                    type="button"
                                    className="text-xs mt-2 text-blue-600 bg-white p-1.5 border border-blue-600 rounded"
                                    onClick={() =>
                                      arrayHelpers.push({
                                        component: "",
                                        percentage: "",
                                      })
                                    }
                                  >
                                    Add more
                                  </button>
                                  <TaxArrayErrors />
                                </div>
                              )}
                            />
                          </div>

                          <div className="flex items-baseline justify-between">
                            {loading ? (
                              <button
                                type="submit"
                                className="w-full px-4 py-3 mt-4 font-bold bg-[#7893d3] text-[#ffffff] rounded-md flex items-center justify-center"
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
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <Formik
                    initialValues={{ friends: [] }}
                    onSubmit={(values) =>
                      setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                      }, 500)
                    }
                    render={({ values }) => <Form></Form>}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default AddTax;
