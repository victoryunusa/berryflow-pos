import PropTypes from "prop-types"; // Import PropTypes
import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";
import {
  getCustomers,
  updateCustomer,
} from "../../features/customer/customerSlice";

const CustomInputComponent = ({ field, ...props }) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const EditCustomer = ({ setOpen, customer }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
    note: customer?.note || "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Customer name is required!"),
    phone: Yup.string().required("Phone number is required!"),
  });

  const handleSubmit = async (formValue) => {
    const { name, phone, email, note } = formValue;
    const customerData = { name, phone, email, note };

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        updateCustomer({ id: customer.id, ...customerData })
      ).unwrap();
      dispatch(
        alertActions.success({
          message: "Customer successfully updated.",
          showAfterRedirect: true,
        })
      );

      dispatch(getCustomers());
      setLoading(false);
      setOpen(false); // Close modal after success
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
            <div className="relative w-full max-w-xl p-7 md:p-10 mx-auto font-br bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold">Edit Customer</h3>
                    <h4
                      className="text-lg font-medium text-gray-500 hover:cursor-pointer"
                      onClick={() => setOpen(false)}
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
                      {({ errors, touched }) => (
                        <Form className="w-full">
                          <div className="mt-4">
                            <label className="block text-tt_rich_black text-sm font-semibold">
                              Name
                            </label>
                            <Field
                              type="text"
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
                          <div className="mt-4">
                            <label className="block text-tt_rich_black text-sm font-semibold">
                              Phone Number
                            </label>
                            <Field
                              type="text"
                              name="phone"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.phone && touched.phone
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-tt_rich_black text-sm font-semibold">
                              Email
                            </label>
                            <Field
                              type="text"
                              name="email"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.email && touched.email
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-sm font-semibold">
                              Note
                            </label>
                            <Field
                              name="note"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.note && touched.note
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                              component={CustomInputComponent}
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
                                  className="mr-5 inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]"
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
                                className="w-full px-4 py-3 mt-4 font-bold bg-tt_rich_black text-[#ffffff] rounded-md"
                              >
                                Submit
                              </button>
                            )}
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
EditCustomer.propTypes = {
  setOpen: PropTypes.func.isRequired,
  customer: PropTypes.shape({
    name: PropTypes.any,
    email: PropTypes.any,
    phone: PropTypes.any,
    note: PropTypes.any,
    initial_balance: PropTypes.any,
    id: PropTypes.any,
    label: PropTypes.string,
    slug: PropTypes.any,
  }), // Define account as an object with specific shape
};

CustomInputComponent.propTypes = {
  field: PropTypes.any,
};

export default EditCustomer;
