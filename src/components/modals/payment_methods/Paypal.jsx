import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
//import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../../app/store";
import { useState } from "react";
import Selector from "../../common/Selector";
import {
  getPaymentMethods,
  updatePaymentMethods,
} from "../../../features/payment_method/paymentMethodSlice";

const Paypal = ({ setOpen }) => {
  const [loading, setLoading] = useState(false);

  // const navigate = useNavigate();
  const dispatch = useDispatch();

  var options = [
    { value: "1", label: "Active" },
    { value: "0", label: "Inactive" },
  ];

  const initialValues = {
    public_key: "",
    secret_key: "",
    currency: "",
    status: "",
    activate_on_digital_menu: "",
    environment: "production",
  };

  const validationSchema = Yup.object().shape({
    public_key: Yup.string().required("Publishable key name is required!"),
    secret_key: Yup.string().required("Secret key is required!"),
    currency: Yup.string().required("Currency secret is required!"),
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
          methodType: "PAYPAL",
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "Paypal setup was successful.",
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
                      Paypal Setup
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
                          <div>
                            <div>
                              <h4 className="text-xs font-semibold text-nelsa_primary">
                                Environment
                              </h4>
                            </div>
                            <div className="flex flex-row gap-3 mt-1">
                              <label className="flex items-center">
                                <Field
                                  type="radio"
                                  name="environment"
                                  value="production"
                                />
                                <span className="text-xs ml-1 text-neutral-600">
                                  Production
                                </span>
                              </label>
                              <label className="flex items-center">
                                <Field
                                  type="radio"
                                  name="environment"
                                  value="sandbox"
                                />
                                <span className="text-xs ml-1 text-neutral-600">
                                  Sanbox
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="flex flex-col md:flex-row justify-between gap-3 mt-4">
                            <div className="w-full md:w-1/2">
                              <label className="block text-nelsa_primary text-xs font-semibold">
                                Public key
                              </label>
                              <Field
                                type="text"
                                name="public_key"
                                className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.public_key && touched.public_key
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="public_key"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="w-full md:w-1/2">
                              <label className="block text-nelsa_primary text-xs font-semibold">
                                Secret key
                              </label>
                              <Field
                                type="text"
                                name="secret_key"
                                className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.secret_key && touched.secret_key
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="secret_key"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                          <div className="mt-3">
                            <label className="block text-nelsa_primary text-xs font-semibold ">
                              Currency (eg. USD)
                            </label>
                            <Field
                              type="text"
                              name="currency"
                              className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.currency && touched.currency
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="currency"
                              component="div"
                              className="text-red-500 text-xs"
                            />
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
                                  className="w-full px-3 py-2 mt-4 text-sm font-semibold bg-nelsa_primary/60 text-[#ffffff] rounded-lg flex items-center justify-center gap-3"
                                  disabled={loading}
                                >
                                  <span
                                    className="inline-block h-3 w-3 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
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

export default Paypal;
