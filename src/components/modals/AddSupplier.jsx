import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";
import * as HeIcons from "react-icons/fa6";

import {
  addSupplier,
  getSuppliers,
} from "../../features/suppliers/suppliersSlice";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const AddSupplier = (props) => {
  const { setOpenSupplier } = props;
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    supplier_name: "",
    phone: "",
    address: "",
  };

  const validationSchema = Yup.object().shape({
    supplier_name: Yup.string().required("Supplier name is required!"),
    address: Yup.string().required("This field is required!"),
    phone: Yup.string()
      .required("This field is required!")
      .max(11, "Phone number cannot be more than 11 characters"),
    email: Yup.string()
      .required("This field is required!")
      .email("Please enter a valid email"),
  });

  const handleSubmit = async (formValue) => {
    const { supplier_name, address, phone, email } = formValue;
    console.log(formValue);
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addSupplier({
          supplier_name,
          address,
          phone,
          email,
          logged_user_store_id: user.id,
          vendor_id: user.vendor_id,
          branch_id: user.branch_id,
        })
      ).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));

      dispatch(
        alertActions.success({
          message: "Supplier successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      // window.location.reload(true);
      dispatch(getSuppliers());
      setLoading(false);
      setOpenSupplier(false);
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
            <div className="relative w-full max-w-xl p-6 md:p-6 mx-auto bg-white rounded-md shadow-lg font-manrope">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold text-nelsa_primary">
                      Add Supplier
                    </h3>
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
                            <label className="block text-nelsa_dark_blue text-xs font-semibold">
                              Name
                            </label>
                            <Field
                              type="text"
                              name="supplier_name"
                              className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-lg focus:outline-none ${
                                errors.supplier_name && touched.supplier_name
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="supplier_name"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-xs font-semibold">
                              Contact Number
                            </label>
                            <Field
                              type="text"
                              name="phone"
                              className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-lg focus:outline-none ${
                                errors.phone && touched.phone
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-xs font-semibold">
                              Email Address
                            </label>
                            <Field
                              type="text"
                              id="email"
                              autoComplete="off"
                              name="email"
                              className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-lg focus:outline-none ${
                                errors.email && touched.email
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-xs font-semibold">
                              Address
                            </label>

                            <Field
                              name="address"
                              className={`w-full px-3 py-2 mt-1 border text-neutral-500 text-xs rounded-lg focus:outline-none ${
                                errors.address && touched.address
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                              component={CustomInputComponent}
                            />

                            <ErrorMessage
                              name="address"
                              component="div"
                              className="text-red-500 text-xs"
                            />
                          </div>
                          <div className="flex flex-row justify-end">
                            <div className="flex items-baseline justify-between gap-3 w-1/2">
                              <button
                                type="button"
                                onClick={() => setOpenSupplier(false)}
                                className="w-full px-3 py-2 mt-4 text-xs font-semibold bg-neutral-100 text-neutral-500 rounded-lg"
                              >
                                cancel
                              </button>
                              {loading ? (
                                <button
                                  type="submit"
                                  className="w-full px-3 py-2 mt-4 font-bold bg-[#7893d3] text-[#ffffff] rounded-md flex items-center justify-center"
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
                                  className="w-full px-3 py-2 mt-4 text-xs font-semibold bg-nelsa_primary text-[#ffffff] rounded-lg"
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

export default AddSupplier;
