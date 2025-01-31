import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { alertActions } from "../../app/store";
import { login } from "../../features/auth/authSlice";
import { getRegister } from "../../features/pos/businessRegisterSlice";
import { getCountries } from "../../features/countries/countriesSlice";
import { getCurrencies } from "../../features/currencies/currenciesSlice";
import { getAccountTypes } from "../../features/master_actions/accountTypeSlice";
import { getTransactionTypes } from "../../features/master_actions/transactionTypeSlice";
import { getBillingTypes } from "../../features/master_actions/billingTypeSlice";
import { getOrderTypes } from "../../features/master_actions/orderTypeSlice";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  // Set initial values
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("This field is required!")
      .email("Please enter a valid email"),
    password: Yup.string()
      .required("This field is required!")
      .min(8, "Password must be at least 6 characters"),
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (formValue) => {
    const { email, password } = formValue;

    dispatch(alertActions.clear());

    try {
      setLoading(true);

      await dispatch(login({ email, password })).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));
      dispatch(getRegister());

      navigate("/");

      setLoading(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };

  return (
    <div className=" text-left">
      <h3 className="text-xl font-bold text-nelsa_dark_blue mb-2">
        Hello again 👋
      </h3>
      <p className="mt-1 text-sm text-gray-500 mb-8">
        New Here?
        <Link to="/auth/register" className="text-gray-700 hover:text-gray-900">
          <span> Create an Account</span>
        </Link>
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mt-4">
              <label className="block text-tt_rich_black text-sm">Email</label>
              <Field
                type="text"
                placeholder="Email"
                autoComplete="off"
                name="email"
                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                  errors.email && touched.email ? "border-red-500" : ""
                } focus:border-tt_rich_black`}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mt-4">
              <label className="block text-tt_rich_black text-sm">
                Password
              </label>
              <Field
                type="password"
                placeholder="Password"
                autoComplete="off"
                name="password"
                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                  errors.password && touched.password ? "border-red-500" : ""
                } focus:border-tt_rich_black`}
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
              <div className="flex flex-row justify-between mt-2">
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    value=""
                    className="w-4 h-4 cursor-pointer text-tt_rich_black checked:bg-tt_rich_black bg-gray-100 rounded-xl border-gray-300"
                  />
                  <label className="ml-2 text-sm text-neutral-600 hover:text-tt_rich_black">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/auth/forgot-password"
                  className="text-sm text-neutral-600 hover:text-tt_rich_black"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div className="flex items-baseline justify-between text-base">
              {loading ? (
                <button
                  type="submit"
                  className="w-full px-4 py-3 mt-4 font-bold bg-tt_rich_black/60 text-[#ffffff] rounded-md flex items-center justify-center"
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
                  className="w-full px-4 py-3 mt-4 font-bold bg-tt_rich_black text-[#ffffff] rounded-md"
                >
                  Login
                </button>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
