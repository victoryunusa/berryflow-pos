import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";
import { register } from "../../features/auth/authSlice";
import { saveBusiness } from "../../features/vendor/vendorSlice";
import Selector from "../../components/common/Selector";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const Welcome = () => {
  const { countries } = useSelector((state) => state.countries);

  var newArray = countries.map(function (obj) {
    return { value: obj.id, label: obj.name };
  });

  var newArray2 = countries.map(function (obj) {
    return { value: obj.dial_code, label: obj.dial_code };
  });

  const [countryId, setCountryId] = useState(158);
  const [isOpenCountriesList, setIsOpenCountriesList] = useState(false);

  const countryIndex = countries.find(
    (getCountry) => getCountry.id == countryId
  );

  const currencies = countries?.filter(
    (currency) => currency.currency_name !== "" || currency.currency_code !== ""
  );

  const initialValues = {
    business_name: "",
    url: "",
    address: "",
    email: "",
    phone: "",
    country_id: "",
    dial_code: "+234",
  };

  const validationSchema = Yup.object().shape({
    business_name: Yup.string().required("This field is required!"),
    url: Yup.string().required("This field is required!"),
    dial_code: Yup.string().required("This field is required!"),
    phone: Yup.string().required("This field is required!"),
    country_id: Yup.string().required("This field is required!"),
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const saveCountry = (id) => {
    setCountryId(id);
    setIsOpenCountriesList(!isOpenCountriesList);
  };

  const handleSubmit = async (formValue) => {
    const { business_name, url, dial_code, phone, country_id } = formValue;
    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        saveBusiness({
          business_name,
          url,
          phone: dial_code + phone,
          country_id,
        })
      ).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));
      navigate("/welcome/branch");
      dispatch(
        alertActions.success({
          message: "You have been successfully add your business profile",
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
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-bold text-tt_rich_black">
          Tell us about your organisation
        </h3>
        <p className="text-sm text-neutral-500 mt-2">
          Takes approximately 5 minutes.
        </p>
      </div>
      <div className="bg-white p-8  md:m-5 rounded-md w-full md:w-[30rem]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              <div className="">
                <label className="block text-tt_rich_black text-sm font-semibold">
                  Organisation name<span className="text-red-600">*</span>
                </label>
                <Field
                  type="text"
                  placeholder="e.g 234Restaurant&Co"
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
                <label className="block text-tt_rich_black text-sm font-semibold">
                  Store link<span className="text-red-600">*</span>
                </label>
                <p className="text-[0.7rem] text-neutral-500">
                  This will be the link to your store. You can change to custom
                  domain later.
                </p>
                <div className="flex flex-row items-center">
                  <Field
                    type="text"
                    placeholder="restaurant"
                    autoComplete="off"
                    name="url"
                    className={`w-3/4 px-4 py-3 border text-neutral-500 text-sm rounded-l-md focus:outline-none ${
                      errors.url && touched.url ? "border-red-500" : ""
                    } focus:border-blue-950`}
                  />
                  <div className="border px-4 py-2.5 rounded-r-md">
                    <p className="text-neutral-500">.truetab.store</p>
                  </div>
                </div>

                <ErrorMessage
                  name="url"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mt-4">
                <label className="block text-tt_rich_black text-sm font-semibold">
                  WhatsApp number<span className="text-red-600">*</span>
                </label>
                <div className="flex flex-row mt-1 gap-2">
                  <div className="w-1/3">
                    <Selector
                      options={newArray2}
                      value={values.dial_code}
                      setFieldValue={setFieldValue}
                      name="dial_code"
                    />
                    <ErrorMessage
                      name="dial_code"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="w-full flex flex-col">
                    <Field
                      type="text"
                      placeholder=""
                      autoComplete="off"
                      name="phone"
                      className={`w-full px-4 py-3 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.phone && touched.phone ? "border-red-500" : ""
                      } focus:border-blue-950`}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-tt_rich_black text-sm font-semibold">
                  Business Location
                </label>
                <Selector
                  options={newArray}
                  value={values.country_id}
                  setFieldValue={setFieldValue}
                  name="country_id"
                />

                <ErrorMessage
                  name="country_id"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {/* <div className="mt-4">
                <label className="block text-tt_rich_black text-sm font-semibold">
                  Currency
                </label>
                <Field
                  as="select"
                  name="currency"
                  className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                    errors.currency && touched.currency ? "border-red-500" : ""
                  } focus:border-blue-950`}
                >
                  <option value="">Select Currency</option>
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>
                      {currency.currency_name} - {currency.currency_symbol}
                    </option>
                  ))}
                </Field>

                <ErrorMessage
                  name="currency"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div> */}
              {/* <div className="mt-4">
                <div className="">
                  <label className="block text-tt_rich_black font-semibold">
                    Address
                  </label>

                  <Field
                    name="address"
                    className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm font-normal rounded-md focus:outline-none ${
                      errors.address && touched.address ? "border-red-500" : ""
                    } focus:border-blue-950`}
                    component={CustomInputComponent}
                    placeholder="Address"
                  />

                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div> */}

              {/* <div className="mt-4">
                <label className="block text-tt_rich_black text-sm font-semibold">
                  Business Email
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
              </div> */}
              <div className="flex items-baseline justify-between mt-4">
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
                    className="w-full px-4 py-3 mt-4 font-bold bg-tt_rich_black text-[#ffffff] rounded-md"
                  >
                    Next
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Welcome;
