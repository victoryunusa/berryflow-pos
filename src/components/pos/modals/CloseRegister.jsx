import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../../app/store";
import { getTables } from "../../../features/table/tableSlice";
import { getPaymentMethods } from "../../../features/payment_method/paymentMethodSlice";

const CloseRegister = ({ setOpen }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    business_account: "",
    received_value: "",
    order_value: "",
  };

  const validationSchema = Yup.object().shape({
    business_account: Yup.string().required("Account is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { name } = formValue;

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      //await dispatch(addArea({ name })).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));

      dispatch(
        alertActions.success({
          message: "Area successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      // window.location.reload(true);

      setLoading(false);
      setVisible(false);
      setOpen(false);
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
            <div className="relative w-full max-w-lg mx-auto font-br bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between border-b px-6 py-4">
                    <h3 className="text-md font-bold">Close Register</h3>

                    <div
                      onClick={() => setOpen(false)}
                      className="cursor-pointer"
                    >
                      <FaIcons.FaXmark size={20} className="text-red-600" />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col justify-center items-center">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ errors, touched }) => (
                        <Form className="w-full">
                          <div className="max-h-[520px] overflow-scroll px-6 md:px-6">
                            <div className="flex flex-col gap-3">
                              <div className="w-full">
                                <label className="block text-nelsa_primary text-sm font-semibold">
                                  Total Amount
                                </label>
                                <Field
                                  type="text"
                                  placeholder="Total Amount"
                                  name="name"
                                  disabled
                                  className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                    errors.name && touched.name
                                      ? "border-red-500"
                                      : ""
                                  } focus:border-blue-950`}
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <div className="w-full">
                                <label className="block text-nelsa_primary text-sm font-semibold">
                                  Total Card Slips
                                </label>
                                <Field
                                  type="text"
                                  placeholder="Total Card Slips"
                                  name="name"
                                  disabled
                                  className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                    errors.name && touched.name
                                      ? "border-red-500"
                                      : ""
                                  } focus:border-blue-950`}
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                              <div className="w-full">
                                <label className="block text-nelsa_primary text-sm font-semibold">
                                  Total Cheques
                                </label>
                                <Field
                                  type="text"
                                  placeholder="Total Cheques"
                                  name="name"
                                  disabled
                                  className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                    errors.name && touched.name
                                      ? "border-red-500"
                                      : ""
                                  } focus:border-blue-950`}
                                />
                                <ErrorMessage
                                  name="name"
                                  component="div"
                                  className="text-red-500 text-sm"
                                />
                              </div>
                            </div>
                            <div className="mt-5">
                              <p className="text-small text-neutral-600 font-medium">
                                Are you sure you want to close register?
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-row justify-end mt-5 p-4 md:p-5 border-t">
                            <div className="flex items-baseline justify-between gap-3 w-1/2">
                              <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="w-full px-4 py-3 text-xs font-semibold bg-neutral-100 text-neutral-500 rounded-lg"
                              >
                                cancel
                              </button>
                              {loading ? (
                                <button
                                  type="submit"
                                  className="w-full px-4 py-3 font-bold bg-nelsa_primary/80 text-[#ffffff] rounded-md flex items-center justify-center"
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
                                  className="w-full px-4 py-3 text-xs font-semibold bg-nelsa_primary text-[#ffffff] rounded-lg"
                                >
                                  Continue
                                </button>
                              )}
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
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

export default CloseRegister;
