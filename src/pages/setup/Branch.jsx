import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { alertActions } from "../../app/store";
import { addBranch } from "../../features/branch/branchSlice";

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
    country: "",
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
      branch_code: Yup.string().required("Branch code is required!"),
      country: Yup.string().required("Country is required!"),
      address: Yup.string().required("Address is required!"),
      currency: Yup.string().required("Currency is required!"),
      invoice_print_type: Yup.string().required(
        "Invoice print type is required!"
      ),
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

  const { billing_types } = useSelector((state) => state.billing_types);

  const { invoice_print_types } = useSelector(
    (state) => state.invoice_print_types
  );

  const currencies = countries?.filter(
    (currency) => currency.currency_name !== "" || currency.currency_code !== ""
  );

  //   useEffect(() => {
  //     dispatch(getSuppliers());
  //   }, [dispatch]);

  const handleSubmit = async (formValue) => {
    dispatch(alertActions.clear());

    try {
      setLoading(true);

      await dispatch(addBranch(formValue)).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));
      navigate("/settings/branches");

      setLoading(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col items-center">
        <h3 className="text-2xl font-bold text-nelsa_primary">Add Branch</h3>
        <p className="text-sm text-neutral-500">
          Your main location details. You can add other branches later.
        </p>
      </div>
      <div className="bg-white p-10 rounded-lg text-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values }) => (
            <Form>
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      Name
                    </label>
                    <Field
                      type="text"
                      placeholder="Name"
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
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      Branch Code
                    </label>
                    <Field
                      type="text"
                      placeholder="Branch Code"
                      autoComplete="off"
                      name="branch_code"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.branch_code && touched.branch_code
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    />
                    <ErrorMessage
                      name="branch_code"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      Tax ID
                    </label>
                    <Field
                      type="text"
                      placeholder="Tax ID"
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
                </div>
                <hr />
                <div>
                  <p>Contact Information</p>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Primary Contact #
                      </label>
                      <Field
                        type="text"
                        placeholder="Primary Contact #"
                        autoComplete="off"
                        name="primary_contact"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.primary_contact && touched.primary_contact
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      />
                      <ErrorMessage
                        name="primary_contact"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Secondary Contact #
                      </label>
                      <Field
                        type="text"
                        placeholder="Secondary Contact #"
                        autoComplete="off"
                        name="secondary_contact"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.secondary_contact && touched.secondary_contact
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      />
                      <ErrorMessage
                        name="secondary_contact"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Primary Email
                      </label>
                      <Field
                        type="text"
                        placeholder="Primary Email"
                        autoComplete="off"
                        name="primary_email"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.primary_email && touched.primary_email
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      />
                      <ErrorMessage
                        name="primary_email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Secondary Email
                      </label>
                      <Field
                        type="text"
                        placeholder="Secondary Email"
                        autoComplete="off"
                        name="secondary_email"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.secondary_email && touched.secondary_email
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      />
                      <ErrorMessage
                        name="secondary_email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Address
                      </label>
                      <Field
                        type="text"
                        placeholder="Address"
                        autoComplete="off"
                        name="address"
                        component={CustomInputComponent}
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.address && touched.address
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Country
                      </label>
                      <Field
                        as="select"
                        name="country"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.country && touched.country
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      >
                        <option value="">Select Option</option>
                        {countries.map((country) => (
                          <option value={country.id}>
                            {country.code} - {country.name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Zipcode
                      </label>
                      <Field
                        type="text"
                        placeholder="Zipcode"
                        autoComplete="off"
                        name="zipcode"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.zipcode && touched.zipcode
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      />
                      <ErrorMessage
                        name="zipcode"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div>
                  <p>Restaurant Mode</p>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Enable Restaurant Mode
                      </label>
                      <Field
                        as="select"
                        name="enable_restaurant_mode"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.enable_restaurant_mode &&
                          touched.enable_restaurant_mode
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </Field>
                      <ErrorMessage
                        name="enable_restaurant_mode"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Default Billing Type
                      </label>
                      <Field
                        as="select"
                        name="billing_type"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.billing_type && touched.billing_type
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      >
                        <option value="">Select Option</option>
                        {billing_types.map((billing_type) => (
                          <option value={billing_type.id}>
                            {billing_type.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="billing_type"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Role for Waiter
                      </label>
                      <Field
                        as="select"
                        name="waiter_role"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.waiter_role && touched.waiter_role
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      >
                        <option value="">Select Option</option>
                      </Field>
                      <ErrorMessage
                        name="waiter_role"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Role for Chef
                      </label>
                      <Field
                        as="select"
                        name="supplier_currency"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.chef_role && touched.chef_role
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      >
                        <option value="">Select Option</option>
                      </Field>
                      <ErrorMessage
                        name="chef_role"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-5">
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Currency
                      </label>
                      <Field
                        as="select"
                        name="currency"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.currency && touched.currency
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      >
                        <option value="">Select Option</option>
                        {currencies.map((currency) => (
                          <option value={currency.id}>
                            {currency.name} - {currency.currency_code}{" "}
                            {currency.currency_symbol}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="currency"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Enable Customer Detail Popup
                      </label>
                      <Field
                        as="select"
                        name="enable_customer_detail_popup"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.enable_customer_detail_popup &&
                          touched.enable_customer_detail_popup
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </Field>
                      <ErrorMessage
                        name="enable_customer_detail_popup"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Enable Variant Selection Popup
                      </label>
                      <Field
                        as="select"
                        name="enable_variant_selection_popup"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.enable_variant_selection_popup &&
                          touched.enable_variant_selection_popup
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </Field>
                      <ErrorMessage
                        name="enable_variant_selection_popup"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Invoice Print Type
                      </label>
                      <Field
                        as="select"
                        name="invoice_print_type"
                        className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                          errors.invoice_print_type &&
                          touched.invoice_print_type
                            ? "border-red-500"
                            : ""
                        } focus:border-blue-950`}
                      >
                        <option value="">Select Option</option>
                        {invoice_print_types.map((invoice_print_type) => (
                          <option value={invoice_print_type.id}>
                            {invoice_print_type.print_type_label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="invoice_print_type"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="">
                  <p>Digital Menu Settings</p>
                  <div className="flex items-center mt-2 mb-1">
                    <Field
                      type="checkbox"
                      name="enable_digital_qr_menu"
                      className="w-4 h-4 cursor-pointer text-nelsa_primary checked:bg-nelsa_primary bg-gray-100 rounded-xl border-gray-300"
                    />
                    <label className="ml-2 text-sm text-gray-600 ">
                      Enable Digital QR Menu?
                    </label>
                  </div>
                  <p className="text-xs font-normal ml-6">
                    Enable or Disable digital QR menu link
                  </p>
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      Menu Open Time
                    </label>
                    <Field
                      type="time"
                      placeholder="Menu Open Time"
                      autoComplete="off"
                      name="menu_open_time"
                      className={`w-full px-4 py-2.5 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.menu_open_time && touched.menu_open_time
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    />
                    <ErrorMessage
                      name="menu_open_time"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      Menu Close Time
                    </label>
                    <Field
                      type="time"
                      placeholder="Menu Close Time"
                      autoComplete="off"
                      name="menu_close_time"
                      className={`w-full px-4 py-2.5 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.menu_close_time && touched.menu_close_time
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    />
                    <ErrorMessage
                      name="menu_close_time"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      Digital Menu OTP Verification
                    </label>
                    <Field
                      as="select"
                      name="digital_menu_otp"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.digital_menu_otp && touched.digital_menu_otp
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Field>
                    <ErrorMessage
                      name="digital_menu_otp"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      Send Digital Menu Orders To Kitchen
                    </label>
                    <Field
                      as="select"
                      name="digital_menu_to_kitchen"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.digital_menu_to_kitchen &&
                        touched.digital_menu_to_kitchen
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    >
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Field>
                    <ErrorMessage
                      name="digital_menu_to_kitchen"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <hr />
                <div className="">
                  <p>Print Setting (PrintNode)</p>
                  <div className="flex items-center mt-2 mb-1">
                    <Field
                      type="checkbox"
                      name="enable_printnode"
                      className="w-4 h-4 cursor-pointer text-nelsa_primary checked:bg-nelsa_primary bg-gray-100 rounded-xl border-gray-300"
                    />
                    <label className="ml-2 text-sm text-gray-600 ">
                      Enable PrintNode Printing?
                    </label>
                  </div>
                  <p className="text-xs font-normal ml-6">
                    Refer PrintNode{" "}
                    <span>
                      <a
                        href="https://www.printnode.com/en/docs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                      >
                        Documentation
                      </a>
                    </span>{" "}
                    for more information
                  </p>
                </div>
                <div className="flex items-baseline justify-end">
                  {loading ? (
                    <button
                      type="submit"
                      className="w-full md:w-[11.1em] px-4 py-3 mt-4 font-bold bg-[#4b4d51] text-[#ffffff] rounded-md flex items-center justify-center"
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
                      className="w-full md:w-[11.1em] px-4 py-3 mt-4 font-bold bg-nelsa_primary text-[#ffffff] rounded-md"
                    >
                      Save
                    </button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Branch;
