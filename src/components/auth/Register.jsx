import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import nigeria from "../../assets/images/nigeria.png";
import ghana from "../../assets/images/ghana.png";

import { alertActions } from "../../app/store";
import { register } from "../../features/auth/authSlice";

const Register = () => {
  // const { countries } = useSelector((state) => state.countries);

  // const [countryId, setCountryId] = useState(158);
  // const [isOpenCountriesList, setIsOpenCountriesList] = useState(false);

  // const countryIndex = countries.find(
  //   (getCountry) => getCountry.id == countryId
  // );

  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    business_name: "",
    phone: "",
    country: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("This field is required!"),
    last_name: Yup.string().required("This field is required!"),
    email: Yup.string()
      .required("This field is required!")
      .email("Please enter a valid email"),
    password: Yup.string()
      .required("This field is required!")
      .min(8, "Password must be at least 8 characters"),
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const saveCountry = (id) => {
  //   setCountryId(id);
  //   setIsOpenCountriesList(!isOpenCountriesList);
  // };

  const handleSubmit = async (formValue) => {
    const { first_name, last_name, email, password } = formValue;
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        register({
          first_name,
          last_name,
          email,
          password,
        })
      ).unwrap();
      localStorage.setItem("email", JSON.stringify(email));
      navigate("/auth/verify_email");
      dispatch(
        alertActions.success({
          message: "You have been successfully registered",
          showAfterRedirect: true,
        })
      );
      setLoading(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };
  return (
    <div className="text-left">
      <h3 className="text-xl font-bold text-nelsa_dark_blue mb-2">
        Create Account.
      </h3>
      <p className="mt-1 text-sm text-gray-500 mb-8">
        Already a member?
        <Link to="/auth/login" className="text-gray-700 hover:text-gray-900">
          <span> Login</span>
        </Link>
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mt-4 flex flex-row space-x-3">
              <div className="w-1/2">
                <label className="block text-nelsa_dark_blue text-sm font-semibold">
                  Firstname
                </label>
                <Field
                  type="text"
                  placeholder="Firstname"
                  autoComplete="off"
                  name="first_name"
                  className={`w-full px-4 py-3 mt-1 border text-neutral-500 font-normal text-sm rounded-md focus:outline-none ${
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
                  Lastname
                </label>
                <Field
                  type="text"
                  placeholder="Lastname"
                  autoComplete="off"
                  name="last_name"
                  className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm font-normal  rounded-md focus:outline-none ${
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
            {/* <div className="mt-4">
              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                Business Name
              </label>
              <Field
                type="text"
                placeholder="Your business name"
                autoComplete="off"
                name="business_name"
                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                  errors.business_name && touched.business_name
                    ? "border-red-500"
                    : ""
                } focus:border-blue-950`}
              />
              <ErrorMessage
                name="business_name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-4">
              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                Country
              </label>
              <Field
                as="select"
                name="country"
                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                  errors.country && touched.country ? "border-red-500" : ""
                } focus:border-blue-950`}
              >
                <option value="">Select Country</option>
                <option value="158">Nigeria</option>
              </Field>

              <ErrorMessage
                name="country"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-4 ">
              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                Phone Number
              </label>
              <div className="flex flex-row items-center justify-center relative z-0">
                <button
                  onClick={() => setIsOpenCountriesList(!isOpenCountriesList)}
                  type="button"
                  className="px-4 py-3 w-[120px] text-sm border rounded-l-md flex justify-between"
                >
                  <p>{countryIndex.dial_code}</p>
                  <span>
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                </button>
                {isOpenCountriesList === true ? (
                  <div className="absolute -top-2 left-0 z-auto transition ease-in duration-700">
                    <div className="w-28 h-64 overflow-scroll rounded-lg shadow-md my-2 pin-t pin-l bg-white border">
                      <ul className="list-reset overflow-y-scroll p-5">
                        {countries.map((country) => (
                          <li
                            className="p-2"
                            key={country.id}
                            onClick={() => saveCountry(country.id)}
                          >
                            <span className="flex flex-row items-center justify-between">
                              <span className="flex items-center space-x-3">
                                <p className="block  text-sm cursor-pointer">
                                  {country.dial_code}
                                </p>
                              </span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <Field
                  type="text"
                  placeholder="07087654321"
                  autoComplete="off"
                  name="phone"
                  className={`w-full px-4 py-3 border text-neutral-500 text-sm rounded-r-md focus:outline-none ${
                    errors.phone && touched.phone ? "border-red-500" : ""
                  } focus:border-blue-950`}
                />
              </div>

              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500 text-sm"
              />
            </div> */}
            <div className="mt-4">
              <label className="block text-nelsa_dark_blue text-sm font-semibold">
                Email
              </label>
              <Field
                type="text"
                id="email"
                placeholder="Email"
                autoComplete="off"
                name="email"
                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                  errors.email && touched.email ? "border-red-500" : ""
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
                Password
              </label>
              <Field
                type="password"
                placeholder="Password"
                autoComplete="off"
                name="password"
                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                  errors.password && touched.password ? "border-red-500" : ""
                } focus:border-blue-950`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
              <div className="flex flex-row justify-start my-4">
                {/* <div className="flex items-center mb-4">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      value=""
                      required
                      className="w-4 h-4 text-nelsa_dark_blue checked:bg-nelsa_dark_blue bg-gray-100 rounded-lg border-gray-300"
                    />
                    <label className="ml-2 text-sm text-neutral-500">
                      I agree to terms and conditions
                    </label>
                  </div>
                   <Link
                    to="/auth/forgot-password"
                    className="text-sm text-zinc-700 hover:text-zinc-900"
                  >
                    Forgot your password?
                  </Link> */}
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our{" "}
                  <span className="text-gray-700 font-bold">
                    <Link to="">Privacy policy</Link>
                  </span>{" "}
                  and{" "}
                  <span className="text-gray-700 font-bold">
                    <Link to="">Terms & conditions.</Link>
                  </span>
                </p>
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              {loading ? (
                <button
                  type="submit"
                  className="w-full px-4 py-3 mt-4 font-bold bg-[#414141] text-[#ffffff] rounded-md flex items-center justify-center"
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
  );
};

export default Register;
