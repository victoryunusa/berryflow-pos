import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
//import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../../app/store";
import { useState } from "react";
import {
  getPaymentMethods,
  updatePaymentMethods,
} from "../../../features/payment_method/paymentMethodSlice";
import Selector from "../../common/Selector";

const BankTransfer = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  var options = [
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
  ];

  const initialValues = {
    bank_name: "",
    account_name: "",
    account_number: "",
    status: "",
    activate_on_digital_menu: "",
    sort_code: "",
    routing_number: " ",
  };

  const validationSchema = Yup.object().shape({
    bank_name: Yup.string().required("Bank name is required!"),
    account_name: Yup.string().required("Account name is required!"),
    account_number: Yup.string().required("Account number is required!"),
    status: Yup.string().required("Status is required!"),
    activate_on_digital_menu: Yup.string().required("This is required!"),
  });

  const handleSubmit = async (formValue) => {
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        updatePaymentMethods({
          formValue: formValue,
          methodType: "BANK_TRANSFER",
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "Bank transfer setup was successful.",
          showAfterRedirect: true,
        })
      );

      dispatch(getPaymentMethods());
      setLoading(false);
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
          <div className="flex items-center min-h-screen px-2 py-2">
            <div className="relative w-full max-w-md p-6 md:p-6 mx-auto bg-white rounded-md shadow-lg font-manrope">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-md font-bold text-nelsa_primary">
                      Bank Transfer Setup
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-col justify-center items-center">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ values, errors, touched, setFieldValue }) => (
                        <Form className="w-full">
                          <div className="mt-3">
                            <label className="block text-nelsa_primary text-xs font-semibold">
                              Bank name
                            </label>
                            <Field
                              type="text"
                              name="bank_name"
                              className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.bank_name && touched.bank_name
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="bank_name"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="flex flex-col md:flex-row justify-between gap-3 mt-4">
                            <div className="w-full md:w-1/2">
                              <label className="block text-nelsa_primary text-xs font-semibold">
                                Account name
                              </label>
                              <Field
                                type="text"
                                name="account_name"
                                className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.account_name && touched.account_name
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="account_name"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="w-full md:w-1/2">
                              <label className="block text-nelsa_primary text-xs font-semibold ">
                                Account number
                              </label>
                              <Field
                                type="text"
                                name="account_number"
                                className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.account_number &&
                                  touched.curraccount_numberency
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="account_number"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row justify-between gap-3 mt-4">
                            <div className="w-full md:w-1/2">
                              <label className="block text-nelsa_primary text-xs font-semibold ">
                                Sort code
                              </label>
                              <Field
                                type="text"
                                name="sort_code"
                                className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.sort_code && touched.sort_code
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="sort_code"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="w-full md:w-1/2">
                              <label className="block text-nelsa_primary text-xs font-semibold ">
                                Routing number
                              </label>
                              <Field
                                type="text"
                                name="routing_number"
                                className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.routing_number &&
                                  touched.routing_number
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="routing_number"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                          <div className="mt-3">
                            <label className="block text-nelsa_primary text-xs font-semibold mb-1">
                              Status
                            </label>
                            <Selector
                              options={options}
                              value={values.status}
                              setFieldValue={setFieldValue}
                              name="status"
                            />

                            <ErrorMessage
                              name="status"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="mt-3">
                            <label className="block text-nelsa_primary text-xs font-semibold mb-1">
                              Active on digital menu?
                            </label>
                            <Selector
                              options={options}
                              value={values.activate_on_digital_menu}
                              setFieldValue={setFieldValue}
                              name="activate_on_digital_menu"
                            />

                            <ErrorMessage
                              name="activate_on_digital_menu"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="flex flex-row justify-end">
                            <div className="flex items-baseline justify-between gap-3 w-1/2">
                              <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="w-full px-3 py-2 mt-4 text-sm font-semibold bg-neutral-100 text-neutral-500 rounded-lg"
                              >
                                cancel
                              </button>
                              {loading ? (
                                <button
                                  type="submit"
                                  className="w-full px-3 py-2 mt-4 text-sm font-semibold bg-nelsa_primary/60 text-[#ffffff] rounded-lg flex items-center justify-center"
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
                                  className="w-full px-3 py-2 mt-4 text-sm font-semibold bg-nelsa_primary text-[#ffffff] rounded-lg"
                                >
                                  Submit
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

export default BankTransfer;
