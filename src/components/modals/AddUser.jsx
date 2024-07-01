import { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";
import Selector from "../common/Selector";
import AddRole from "./AddRole";
import { addUser, getUsers } from "../../features/users/usersSlice";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const AddUser = (props) => {
  const { setOpenUser } = props;
  const [loading, setLoading] = useState(false);
  const [openRole, setOpenRole] = useState(false);

  const dispatch = useDispatch();

  const { roles } = useSelector((state) => state.roles);

  const { branches } = useSelector((state) => state.branches);

  var newArray = roles.map(function (obj) {
    return { value: obj.slug, label: obj.name };
  });

  const initialValues = {
    first_name: "",
    last_name: "",
    user_code: "",
    role: "",
    phone: "",
    email: "",
    password: "",
    user_stores: [],
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("This field is required!"),
    last_name: Yup.string().required("This field is required!"),
    role: Yup.string().required("This field is required!"),
    phone: Yup.string().required("This field is required!"),
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
    user_stores: Yup.array().required("This field is required!"),
  });

  const handleSubmit = async (formValue) => {
    const {
      first_name,
      last_name,
      user_code,
      role,
      phone,
      email,
      password,
      user_stores,
    } = formValue;
    console.log(formValue);
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addUser({
          first_name,
          last_name,
          user_code,
          role,
          phone,
          email,
          password,
          user_stores,
        })
      ).unwrap();

      dispatch(
        alertActions.success({
          message: "User successfully added.",
          showAfterRedirect: true,
        })
      );

      dispatch(getUsers());
      setLoading(false);
      setOpenUser(false);
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
            <div className="relative w-full max-w-xl p-5 md:p-10 mx-auto bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold text-nelsa_primary">
                      Add User
                    </h3>
                    <h4
                      className="text-lg font-medium text-gray-500 hover:cursor-pointer"
                      onClick={() => setOpenUser(false)}
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
                      {({ values, errors, touched, setFieldValue }) => (
                        <Form className="w-full">
                          <div className="mt-4 flex flex-row space-x-3">
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                                First Name
                              </label>
                              <Field
                                type="text"
                                placeholder="Enter First Name"
                                name="first_name"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.first_name && touched.first_name
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="first_name"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                                Last Name
                              </label>
                              <Field
                                type="text"
                                placeholder="Enter Last Name"
                                name="last_name"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                  errors.last_name && touched.last_name
                                    ? "border-red-500"
                                    : ""
                                } focus:border-blue-950`}
                              />
                              <ErrorMessage
                                name="last_name"
                                component="div"
                                className="text-red-500 text-sm"
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex flex-row space-x-3">
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                                Email
                              </label>
                              <Field
                                type="text"
                                placeholder="Enter Email"
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
                            <div className="w-1/2">
                              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                                Phone
                              </label>
                              <Field
                                type="text"
                                placeholder="Enter Phone"
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
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-sm font-semibold">
                              Password
                            </label>
                            <Field
                              type="text"
                              placeholder="Enter Password"
                              name="password"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.password && touched.password
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-sm font-semibold">
                              User Code
                            </label>
                            <Field
                              type="text"
                              placeholder="Enter Phone"
                              name="user_code"
                              className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                                errors.user_code && touched.user_code
                                  ? "border-red-500"
                                  : ""
                              } focus:border-blue-950`}
                            />
                            <ErrorMessage
                              name="user_code"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="mt-4">
                            <label className="block text-nelsa_dark_blue text-sm font-semibold mb-1">
                              Role
                              <span
                                onClick={() => setOpenRole(true)}
                                className="ml-2 cursor-pointer rounded px-1 text-blue-600 border border-blue-600 text-xs font-normal"
                              >
                                Add new
                              </span>
                            </label>
                            <Selector
                              options={newArray}
                              value={values.role}
                              setFieldValue={setFieldValue}
                              name="role"
                            />

                            <ErrorMessage
                              name="role"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>

                          <div className="mt-4 flex flex-col">
                            {branches.map((branch) => (
                              <label key={branch.slug}>
                                <Field
                                  type="checkbox"
                                  name="user_stores"
                                  value={branch.slug}
                                />
                                {branch.store_code + ", " + branch.name}
                              </label>
                            ))}
                            <ErrorMessage
                              name="user_stores"
                              component="div"
                              className="text-red-500 text-sm"
                            />
                          </div>
                          <div className="flex items-baseline justify-between">
                            {loading ? (
                              <button
                                type="submit"
                                className="w-full px-4 py-3 mt-4 font-bold bg-nelsa_primary/60 text-[#ffffff] rounded-md flex items-center justify-center"
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
                </div>
              </div>
            </div>
          </div>
        </div>
        {openRole && <AddRole setOpenRole={setOpenRole} />}
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default AddUser;
