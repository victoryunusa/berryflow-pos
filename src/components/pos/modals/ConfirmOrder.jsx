import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as FaIcons from "react-icons/fa6";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../../app/store";
import { getTables } from "../../../features/table/tableSlice";
import { getPaymentMethods } from "../../../features/payment_method/paymentMethodSlice";

const ConfirmOrder = ({ setOpen, billingType, open, children }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [text, setText] = useState("0012969332");
  const copy = async () => {
    await navigator.clipboard.writeText(text);
  };

  const BaseUrl = import.meta.env.VITE_BASE_API_URL;

  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadAccounts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${BaseUrl}/accounts/loadAccounts`,
      config
    );

    setAccounts(response.data.accounts);
    const accountIndex = response.data.accounts?.find(
      (account) => account.pos_default === 1
    );
    console.log(accountIndex);
    setAccountNumber(accountIndex.slug);
  };

  const { payment_methods } = useSelector((state) => state.payment_methods);

  const paymentMethodsIndex = payment_methods?.filter(
    (payment_method) => payment_method.status === 1
  );

  useEffect(() => {
    loadAccounts();
  }, []);

  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);

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
            <div className="relative w-full max-w-4xl mx-auto font-br bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between border-b px-6 py-4">
                    <h3 className="text-md font-bold">Confirm</h3>

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
                          <div className="max-h-[720px] overflow-scroll px-6 md:px-6">
                            <div className="flex flex-row gap-3 mb-6">
                              <div className="flex flex-col w-full">
                                <label className="block text-nelsa_primary text-sm font-semibold mb-3">
                                  Business Account
                                  <span className="ml-3 text-[0.73rem] text-neutral-500 font-normal">
                                    *Transaction will be saved under this
                                    account
                                  </span>
                                </label>
                                <div className="flex flex-row gap-3 w-full">
                                  {accounts.map((account, index) => (
                                    <button
                                      key={index}
                                      type="button"
                                      onClick={() =>
                                        setAccountNumber(account.slug)
                                      }
                                      className={`w-1/3 text-small text-left ${
                                        account.slug == accountNumber
                                          ? "bg-green-100 text-green-800"
                                          : "bg-neutral-100 text-neutral-500"
                                      } font-semibold px-2 py-2 rounded-md`}
                                    >
                                      {account.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row gap-3 mb-10">
                              <div className="flex flex-col w-full">
                                <label className="block text-nelsa_primary text-sm font-semibold mb-3">
                                  Payment Method
                                </label>
                                <div className="flex flex-row gap-3 w-full">
                                  {paymentMethodsIndex.map(
                                    (payment_method, index) => (
                                      <button
                                        key={index}
                                        onClick={() =>
                                          setPaymentMethod(payment_method.slug)
                                        }
                                        type="button"
                                        className={`w-1/4 text-small ${
                                          payment_method.slug == paymentMethod
                                            ? "bg-green-100 text-green-800"
                                            : "bg-neutral-100 text-neutral-500"
                                        } font-medium px-3 py-2 rounded-md text-left`}
                                      >
                                        {payment_method.name}
                                      </button>
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-row gap-3">
                              <div className="w-1/3">
                                <label className="block text-nelsa_primary text-sm font-semibold">
                                  Received Amount
                                </label>
                                <Field
                                  type="text"
                                  placeholder="Received Amount"
                                  name="name"
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
                              <div className="w-1/3">
                                <label className="block text-nelsa_primary text-sm font-semibold">
                                  Order Value
                                </label>
                                <Field
                                  type="text"
                                  placeholder="Order Value"
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
                              <div className="w-1/3">
                                <label className="block text-nelsa_primary text-sm font-semibold">
                                  Balance Amount
                                </label>
                                <Field
                                  type="text"
                                  placeholder="Balance Amount"
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
                          </div>

                          <div className="flex flex-row justify-end mt-10 p-4 md:p-5 border-t">
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

export default ConfirmOrder;
