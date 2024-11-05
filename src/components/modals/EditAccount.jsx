import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";
import Selector from "../common/Selector";
import { updateAccount } from "../../features/account/accountSlice";

const CustomInputComponent = ({ field, ...props }) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const EditAccount = (props) => {
  const { setOpen, account } = props; // Accept existing account details as a prop
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { account_types } = useSelector((state) => state.account_types);

  var options = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ];

  var newAccountTypes = account_types.map(function (obj) {
    return { value: obj.account_type_constant, label: obj.label };
  });

  const initialValues = {
    label: account.label || "",
    account_type: account.account_type_data.account_type_constant || "",
    pos_default: account.pos_default.toString() || "",
    initial_balance: account.initial_balance || "",
    description: account.description || "",
  };

  const validationSchema = Yup.object().shape({
    label: Yup.string().required("Account name is required!"),
    account_type: Yup.string().required("This field is required!"),
    pos_default: Yup.string().required("This field is required!"),
    initial_balance: Yup.string().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { label, account_type, pos_default, initial_balance, description } =
      formValue;

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        updateAccount({
          slug: account.slug, // Assuming the account object has an id property
          label,
          account_type,
          pos_default,
          initial_balance,
          description,
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "Account successfully updated.",
          showAfterRedirect: true,
        })
      );

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
                      Edit Business Account
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
                          <div className="max-h-[720px] overflow-scroll px-6 md:px-6">
                            <div className="">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold">
                                Account Name
                              </label>
                              <Field
                                type="text"
                                placeholder=""
                                name="label"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.label && touched.label
                                    ? "border-red-500"
                                    : ""
                                } focus:nelsa_gray_3`}
                              />
                              <ErrorMessage
                                name="label"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>

                            <div className="mt-3">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold mb-1">
                                Account Type
                              </label>
                              <Selector
                                options={newAccountTypes}
                                value={values.account_type}
                                setFieldValue={setFieldValue}
                                name="account_type"
                              />
                              <ErrorMessage
                                name="account_type"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>

                            <div className="mt-3">
                              <label className="block text-nelsa_gray_3 text-xs font-semibold">
                                Initial Balance
                              </label>
                              <Field
                                type="text"
                                placeholder=""
                                name="initial_balance"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.initial_balance &&
                                  touched.initial_balance
                                    ? "border-red-500"
                                    : ""
                                } focus:nelsa_gray_3`}
                              />
                              <ErrorMessage
                                name="initial_balance"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>

                            <div className="mt-3">
                              <label className="block text-nelsa_dark_blue text-xs font-semibold mb-1">
                                POS Default Account
                              </label>
                              <Selector
                                options={options}
                                value={values.pos_default}
                                setFieldValue={setFieldValue}
                                name="pos_default"
                              />

                              <ErrorMessage
                                name="pos_default"
                                component="div"
                                className="text-red-500 text-xs"
                              />
                            </div>

                            <div className="mt-4">
                              <label className="block text-nelsa_dark_blue text-xs font-semibold">
                                Description
                              </label>

                              <Field
                                name="description"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-xs rounded-md focus:outline-none ${
                                  errors.description && touched.description
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                                component={CustomInputComponent}
                                placeholder="Description"
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
  } else {
    return null;
  }
};

// Add prop types
EditAccount.propTypes = {
  setOpen: PropTypes.func.isRequired,
  account: PropTypes.shape({
    account_name: PropTypes.any,
    account_type: PropTypes.any,
    account_type_data: PropTypes.object,
    pos_default: PropTypes.any,
    initial_balance: PropTypes.any,
    description: PropTypes.any,
    label: PropTypes.string,
    slug: PropTypes.any,
  }), // Define account as an object with specific shape
};

CustomInputComponent.propTypes = {
  field: PropTypes.any,
};

export default EditAccount;
