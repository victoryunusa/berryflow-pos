import PropTypes from "prop-types"; // Import PropTypes
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";
import Selector from "../common/Selector";
import { getCategories } from "../../features/category/categoriesSlice";
import { getPaymentMethods } from "../../features/payment_method/paymentMethodSlice";
import {
  editTransaction,
  getTransactions,
} from "../../features/transactions/transactionSlice";

const CustomInputComponent = ({ field, ...props }) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const EditTransaction = ({ setOpen, transaction }) => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const { transaction_types } = useSelector((state) => state.transaction_types);
  const { payment_methods } = useSelector((state) => state.payment_methods);

  const BaseUrl = import.meta.env.VITE_BASE_API_URL;

  const { token } = useSelector((state) => state.auth);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadAccounts = async () => {
    const response = await axios.get(
      `${BaseUrl}/accounts/loadAccounts`,
      config
    );
    setAccounts(response.data.accounts);
  };

  const loadUsers = async () => {
    const response = await axios.get(`${BaseUrl}/users/loadUsers`, config);
    setUsers(response.data.users);
  };

  const loadSuppliers = async () => {
    const response = await axios.get(
      `${BaseUrl}/suppliers/loadSuppliers`,
      config
    );
    setSuppliers(response.data.suppliers);
  };

  const loadCustomers = async () => {
    const response = await axios.get(
      `${BaseUrl}/customers/loadCustomers`,
      config
    );
    setCustomers(response.data.customers);
  };

  useEffect(() => {
    loadAccounts();
    loadCustomers();
    loadSuppliers();
    loadUsers();
  }, []);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPaymentMethods());
  }, [dispatch]);

  var options = [
    { value: "SUPPLIER", label: "Supplier" },
    { value: "CUSTOMER", label: "Customer" },
    { value: "STAFF", label: "Staff" },
  ];

  var newTransactionTypes = transaction_types.map(function (obj) {
    return { value: obj.transaction_type_constant, label: obj.label };
  });

  var newPaymentMethods = payment_methods.map(function (obj) {
    return { value: obj.id, label: obj.name };
  });

  var newAccounts = accounts.map(function (obj) {
    return { value: obj.id, label: obj.label };
  });

  var newSuppliers = suppliers.map(function (obj) {
    return { value: obj.id, label: obj.name };
  });

  var newCustomers = customers.map(function (obj) {
    return { value: obj.id, label: obj.name };
  });

  var newUsers = users.map(function (obj) {
    return { value: obj.id, label: obj.full_name };
  });

  console.log(transaction);

  const initialValues = {
    bill_to: transaction.bill_to,
    bill_to_slug: transaction.bill_to_slug,
    account: transaction.account_id.toString(),
    payment_method: transaction.payment_method_id.toString(),
    transaction_type: transaction.transaction_type,
    notes: transaction.notes,
    transaction_date: transaction.transaction_date.split("T")[0], // Format date correctly for input
    amount: transaction.amount,
  };

  const validationSchema = Yup.object().shape({
    bill_to: Yup.string().required("This field is required!"),
    bill_to_slug: Yup.string().required("This field is required!"),
    account: Yup.string().required("This field is required!"),
    payment_method: Yup.string().required("This field is required!"),
    transaction_type: Yup.string().required("This field is required!"),
    transaction_date: Yup.string().required("This field is required!"),
    amount: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const {
      bill_to,
      bill_to_slug,
      account,
      payment_method,
      transaction_type,
      notes,
      transaction_date,
      amount,
    } = formValue;

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        editTransaction({
          id: transaction.id, // Pass the transaction ID
          bill_to,
          bill_to_slug,
          account,
          payment_method,
          transaction_type,
          notes,
          transaction_date,
          amount,
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "Transaction successfully updated.",
          showAfterRedirect: true,
        })
      );

      dispatch(getTransactions());
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
          <div className="flex items-center min-h-screen px-4 py-4">
            <div className="relative w-full max-w-xl mx-auto font-br bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between border-b px-6 py-2">
                    <h3 className="text-base font-bold text-nelsa_primary">
                      Edit Transaction
                    </h3>
                  </div>

                  <div className="mt-5 flex flex-col">
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ values, errors, touched, setFieldValue }) => (
                        <Form className="w-full">
                          <div className=" overflow-scroll px-6 md:px-6">
                            <div className="">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold mb-1">
                                Bill To
                              </label>
                              <Selector
                                options={options}
                                value={values.bill_to}
                                setFieldValue={setFieldValue}
                                name="bill_to"
                              />
                              <ErrorMessage
                                name="bill_to"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="mt-3">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold mb-1">
                                Choose Staff, Customer or Supplier
                              </label>
                              <Selector
                                options={
                                  values.bill_to === "SUPPLIER"
                                    ? newSuppliers
                                    : values.bill_to === "CUSTOMER"
                                    ? newCustomers
                                    : newUsers
                                }
                                value={values.bill_to_slug}
                                setFieldValue={setFieldValue}
                                name="bill_to_slug"
                              />
                              <ErrorMessage
                                name="bill_to_slug"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="mt-3">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold mb-1">
                                Account
                              </label>
                              <Selector
                                options={newAccounts}
                                value={values.account}
                                setFieldValue={setFieldValue}
                                name="account"
                              />
                              <ErrorMessage
                                name="account"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="mt-3">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold mb-1">
                                Transaction Type
                              </label>
                              <Selector
                                options={newTransactionTypes}
                                value={values.transaction_type}
                                setFieldValue={setFieldValue}
                                name="transaction_type"
                              />
                              <ErrorMessage
                                name="transaction_type"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="mt-3">
                              <label className="block text-nelsa_dark_blue text-xs font-semibold mb-1">
                                Payment Method
                                <span className="text-red-500">*</span>
                              </label>
                              <Selector
                                options={newPaymentMethods}
                                value={values.payment_method}
                                setFieldValue={setFieldValue}
                                name="payment_method"
                              />
                              <ErrorMessage
                                name="payment_method"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="mt-3">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold">
                                Transaction Date
                              </label>
                              <Field
                                type="date"
                                placeholder=""
                                name="transaction_date"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.transaction_date &&
                                  touched.transaction_date
                                    ? "border-red-500"
                                    : ""
                                } focus:nelsa_gray_3`}
                              />
                              <ErrorMessage
                                name="transaction_date"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="mt-3">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold">
                                Amount
                              </label>
                              <Field
                                type="text"
                                placeholder=""
                                name="amount"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.amount && touched.amount
                                    ? "border-red-500"
                                    : ""
                                } focus:nelsa_gray_3`}
                              />
                              <ErrorMessage
                                name="amount"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                            <div className="mt-3">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold mb-1">
                                Notes
                              </label>
                              <Field
                                name="notes"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.notes && touched.notes
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                                component={CustomInputComponent}
                                placeholder="Description"
                              />
                              <ErrorMessage
                                name="notes"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row justify-end mt-10 p-6 border-t">
                            <div className="flex items-baseline justify-between gap-3 w-1/2">
                              <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="w-full px-4 py-3 text-xs font-semibold bg-neutral-100 text-neutral-500 rounded-lg"
                              >
                                Cancel
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
                                  Update
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
  }
  return null;
};

// Add PropTypes for the component
EditTransaction.propTypes = {
  setOpen: PropTypes.func.isRequired,
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    bill_to: PropTypes.string.isRequired,
    bill_to_slug: PropTypes.string.isRequired,
    account_id: PropTypes.string.isRequired,
    payment_method_id: PropTypes.string.isRequired,
    transaction_type: PropTypes.string.isRequired,
    notes: PropTypes.string,
    transaction_date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

CustomInputComponent.propTypes = {
  field: PropTypes.any,
};

export default EditTransaction;
