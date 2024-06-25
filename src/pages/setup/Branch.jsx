import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";
import { addBranch } from "../../features/branch/branchSlice";
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

const Branch = () => {
  const initialValues = {
    name: "",
    branch_code: "",
    tax_id: "",
    primary_contact: "",
    primary_email: "",
    secondary_contact: "",
    secondary_email: "",
    address: "",
    country: "158",
    enable_restaurant_mode: "",
    billing_type: "",
    waiter_role: "",
    chef_role: "",
    currency: "",
    enable_customer_detail_popup: "",
    enable_variant_selection_popup: "",
    invoice_print_type: "",
    enable_digital_qr_menu: "",
    menu_open_time: "",
    menu_close_time: "",
    digital_menu_otp: "",
    digital_menu_to_kitchen: "",
    enable_printnode: "",
    printnode_api: "",
    pos_invoice_printer: "",
    other_printer: "",
  };

  // Set initial values
  const validationSchema = Yup.object().shape(
    {
      name: Yup.string().required("Branch name is required!"),
      currency: Yup.string().required("Currency is required!"),
      enable_printnode: Yup.string().nullable(),
      printnode_api: Yup.string()
        .ensure()
        .when("enable_printnode", {
          is: true,
          then: Yup.string().required("Printnode api is required"),
        }),
    },
    [["enable_printnode", "printnode_api"]]
  );

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { countries } = useSelector((state) => state.countries);

  var newArray = countries.map(function (obj) {
    return {
      value: obj.id,
      label: obj.name + " - " + obj.currency_code,
    };
  });

  var newArray2 = countries.map(function (obj) {
    return { value: obj.dial_code, label: obj.dial_code };
  });

  const { billing_types } = useSelector((state) => state.billing_types);

  const { invoice_print_types } = useSelector(
    (state) => state.invoice_print_types
  );

  const currencies = countries?.filter(
    (currency) => currency.currency_name !== "" || currency.currency_code !== ""
  );

  const handleSubmit = async (formValue) => {
    const { name, currency, address, tax_id } = formValue;
    dispatch(alertActions.clear());

    try {
      setLoading(true);

      await dispatch(
        addBranch({ name, currency, country: currency, address, tax_id })
      ).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));
      navigate("/setup/payment");

      setLoading(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-bold text-nelsa_primary">Create branch</h3>
        <p className="text-sm text-neutral-500 mt-2">
          Your main location details. You can add other locations later.
        </p>
      </div>
      <div className="bg-white p-8  md:m-5 rounded-md w-full md:w-[30rem]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <div className="">
                <label className="block text-nelsa_primary text-sm font-semibold">
                  Branch name<span className="text-red-600">*</span>
                </label>
                <Field
                  type="text"
                  placeholder=""
                  autoComplete="off"
                  name="name"
                  className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                    errors.name && touched.name ? "border-red-500" : ""
                  } focus:border-blue-950`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mt-4">
                <label className="block text-nelsa_primary text-sm font-semibold">
                  Tax id{" "}
                  <span className="text-neutral-400 text-sm">
                    {"(optional)"}
                  </span>
                </label>
                <Field
                  type="text"
                  placeholder=""
                  autoComplete="off"
                  name="tax_id"
                  className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                    errors.tax_id && touched.tax_id ? "border-red-500" : ""
                  } focus:border-blue-950`}
                />
                <ErrorMessage
                  name="tax_id"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mt-4">
                <label className="block text-nelsa_primary text-sm font-semibold">
                  Country currency<span className="text-red-600">*</span>
                </label>
                <Selector
                  options={newArray}
                  value={values.currency}
                  setFieldValue={setFieldValue}
                  name="currency"
                />

                <ErrorMessage
                  name="currency"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mt-4">
                <div className="">
                  <label className="block text-nelsa_primary font-semibold">
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
              </div>

              {/* <div className="mt-4">
             <label className="block text-nelsa_primary text-sm font-semibold">
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
                    className="w-full px-4 py-3 mt-4 font-bold bg-nelsa_primary text-[#ffffff] rounded-md"
                  >
                    Save
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

export default Branch;
