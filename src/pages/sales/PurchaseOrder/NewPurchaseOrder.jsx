import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Formik,
  Field,
  FieldArray,
  Form,
  ErrorMessage,
  getIn,
  useField,
  useFormikContext,
} from "formik";
import * as Yup from "yup";
import { alertActions } from "../../../app/store";
import { getSuppliers } from "../../../features/suppliers/suppliersSlice";
import { getTaxes } from "../../../features/tax/taxSlice";
import { getIngredients } from "../../../features/ingredients/ingredientsSlice";
import Selector from "../../../components/common/Selector";

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const ErrorMessage2 = ({ name }) => (
  <Field
    name={name}
    render={({ form }) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? (
        <div className="text-sm text-red-500">{error}</div>
      ) : null;
    }}
  />
);

const TaxArrayErrors = (errors) =>
  typeof errors.tax_components === "string" ? (
    <div>{errors.tax_components}</div>
  ) : null;

const NewPurchaseOrder = () => {
  const initialValues = {
    supplier_id: "",
    po_number: "",
    po_reference: "",
    po_order_date: "",
    po_due_date: "",
    supplier_currency: "",
    tax_option: "",
    terms: "",
    update_stock: "",
    ingredients: [""],
    shipping_charges: "",
    parking_charges: "",
    total: "",
  };

  // Set initial values
  const validationSchema = Yup.object().shape({
    supplier_id: Yup.string().required("This field is required!"),
    po_number: Yup.string().required("This field is required!"),
    po_reference: Yup.string().required("This field is required!"),
    po_order_date: Yup.string().required("This field is required!"),
    po_due_date: Yup.string().required("This field is required!"),
    supplier_currency: Yup.string().required("This field is required!"),
    ingredients: Yup.array()
      .of(
        Yup.object().shape({
          ingredient_id: Yup.string().required("Required"),
          quantity: Yup.string().required("Required"), // these constraints take precedence
          unit_price: Yup.string().required("Required"),
          amount: Yup.string().required("Required"), // these constraints take precedence
        })
      )
      .required("Must have components"),
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { suppliers } = useSelector((state) => state.suppliers);

  const { countries } = useSelector((state) => state.countries);

  const currencies = countries?.filter(
    (currency) => currency.currency_name !== "" || currency.currency_code !== ""
  );

  const { taxes } = useSelector((state) => state.taxes);
  const { ingredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTaxes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSuppliers());
  }, [dispatch]);

  const handleSubmit = async (formValue) => {
    const { email, password } = formValue;

    dispatch(alertActions.clear());

    try {
      setLoading(true);

      //await dispatch(login({ email, password })).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));
      navigate("/");

      setLoading(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
  };

  const Quantiy = (props) => {
    const {
      values: { ingredients },
      touched,
      setFieldValue,
    } = useFormikContext();
    const [field, meta] = useField(props);

    useEffect(() => {
      // set the value of textC, based on textA and textB
      if (ingredients.trim() !== "" && touched.ingredients) {
        setFieldValue(props.name, `textA: ${ingredients}`);
      }
    }, [ingredients, touched.ingredients, setFieldValue, props.name]);

    return (
      <>
        <input {...props} {...field} />
        {!!meta.touched && !!meta.error && <div>{meta.error}</div>}
      </>
    );
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2 items-center">
          <Link
            to="/stock/purchase_orders"
            className="text-lg font-bold text-gray-500 "
          >
            Purchase Orders
          </Link>
          {"/"}
          <h3 className="text-lg font-bold text-gray-700">
            Add Purchase Order
          </h3>
        </div>
      </div>
      <div className="bg-white p-10 rounded-lg text-sm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, formik }) => (
            <Form>
              <div className="flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      Vendor
                    </label>
                    {/* <Field
                      as="select"
                      name="supplier_id"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.supplier_id && touched.supplier_id
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    >
                      <option value="">Select Option</option>
                      {suppliers.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.supplier_code} - {supplier.name}
                        </option>
                      ))}
                    </Field> */}
                    <Field
                      component={Selector}
                      formik={formik}
                      name="supplier_id"
                      value={values.supplier_id}
                    ></Field>
                    {/* <Field name="supplier_id">
                      {({ field }) => (
                        <Selector
                          {...field}
                          color={
                            errors.supplier_id && touched.supplier_id
                              ? "failure"
                              : ""
                          }
                        ></Selector>
                      )}
                    </Field> */}
                    <ErrorMessage
                      name="supplier_id"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      PO Number
                    </label>
                    <Field
                      type="text"
                      placeholder="PO Number"
                      autoComplete="off"
                      name="po_number"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.po_number && touched.po_number
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    />
                    <ErrorMessage
                      name="po_number"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      PO Reference #
                    </label>
                    <Field
                      type="text"
                      placeholder="PO Reference #"
                      autoComplete="off"
                      name="po_reference"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.po_reference && touched.po_reference
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    />
                    <ErrorMessage
                      name="po_reference"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      PO Order Date
                    </label>
                    <Field
                      type="date"
                      placeholder="PO Order Date"
                      autoComplete="off"
                      name="po_order_date"
                      className={`w-full px-4 py-2.5 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.po_order_date && touched.po_order_date
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    />
                    <ErrorMessage
                      name="po_order_date"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      PO Order Due Date
                    </label>
                    <Field
                      type="date"
                      placeholder="PO Order Due Date"
                      autoComplete="off"
                      name="po_due_date"
                      className={`w-full px-4 py-2.5 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.po_due_date && touched.po_due_date
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    />
                    <ErrorMessage
                      name="po_due_date"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      Supplier Currency
                    </label>
                    <Field
                      as="select"
                      name="supplier_currency"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.supplier_currency && touched.supplier_currency
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    >
                      <option value="">Select Option</option>
                      {currencies?.map((currency) => (
                        <option key={currency.id} value={currency.id}>
                          {currency.name} - {currency.currency_code}{" "}
                          {currency.currency_symbol}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="supplier_currency"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-nelsa_primary font-semibold">
                      Tax Option
                    </label>
                    <Field
                      as="select"
                      name="tax_option"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.tax_option && touched.tax_option
                          ? "border-red-500"
                          : ""
                      } focus:border-blue-950`}
                    >
                      <option value="">Select Option</option>
                      {taxes.map((tax) => (
                        <option key={tax.id} value={tax.id}>
                          {tax.label} - {tax.tax_code}{" "}
                          {tax.total_tax_percentage}
                          {"%"}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="tax_option"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="">
                    <label className="block text-nelsa_primary font-semibold">
                      Terms
                    </label>

                    <Field
                      name="terms"
                      className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                        errors.terms && touched.terms ? "border-red-500" : ""
                      } focus:border-blue-950`}
                      component={CustomInputComponent}
                      placeholder="Terms"
                    />

                    <ErrorMessage
                      name="terms"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center mb-1">
                    <Field
                      type="checkbox"
                      name="update_stock"
                      className="w-4 h-4 cursor-pointer text-nelsa_primary checked:bg-nelsa_primary bg-gray-100 rounded-xl border-gray-300"
                    />
                    <label className="ml-2 text-sm text-gray-600 ">
                      Update Product Stock?
                    </label>
                  </div>
                  <p className="text-xs font-normal ml-6">
                    If this option is enabled, product stock will be updated
                    when the purchase order is "closed".
                  </p>
                </div>
                <div className="mt-4">
                  <FieldArray
                    name="ingredients"
                    render={(arrayHelpers) => (
                      <div>
                        <div className="w-full flex flex-row">
                          <label className="block w-4/12 text-nelsa_primary font-semibold">
                            Item
                          </label>
                          <label className="block w-2/12 text-nelsa_primary font-semibold">
                            Quantity
                          </label>
                          <label className="block w-2/12 text-nelsa_primary font-semibold">
                            Unit Price
                          </label>
                          <label className="block w-2/12 text-nelsa_primary font-semibold">
                            Discount %
                          </label>
                          <label className="block w-2/12 text-nelsa_primary font-semibold">
                            Amount
                          </label>
                        </div>

                        {values.ingredients.map((friend, index) => (
                          <div
                            className=" flex flex-row space-x-3 "
                            key={index}
                          >
                            {/** both these conventions do the same */}

                            <div className="w-4/12">
                              <Field
                                as="select"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md  focus:outline-none focus:border-blue-950`}
                                name={`ingredients.${index}.ingredient_id`}
                              >
                                <option value="">Select Option</option>
                                {ingredients.map((ingredient) => (
                                  <option
                                    key={ingredient.id}
                                    value={ingredient.id}
                                  >
                                    {ingredient.name}
                                  </option>
                                ))}
                              </Field>

                              <ErrorMessage2
                                name={`ingredients.${index}.ingredient_id`}
                              />
                            </div>
                            <div className="w-2/12">
                              {/* <Quantiy
                                type="number"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none focus:border-blue-950`}
                                name={`ingredients.${index}.quantity`}
                              /> */}
                              <Field
                                type="number"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none focus:border-blue-950`}
                                name={`ingredients.${index}.quantity`}
                              />
                              <ErrorMessage2
                                name={`ingredients.${index}.quantity`}
                              />
                            </div>
                            <div className="w-2/12">
                              <Field
                                type="number"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md  focus:outline-none focus:border-blue-950`}
                                name={`ingredients.${index}.unit_price`}
                              />
                              <ErrorMessage2
                                name={`ingredients.${index}.unit_price`}
                              />
                            </div>
                            <div className="w-2/12">
                              <Field
                                type="number"
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none focus:border-blue-950`}
                                name={`ingredients.${index}.discount`}
                              />
                              <ErrorMessage2
                                name={`ingredients.${index}.discount`}
                              />
                            </div>
                            <div className="w-2/12">
                              <Field
                                type="number"
                                disabled
                                className={`w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none focus:border-blue-950`}
                                name={`ingredients.${index}.amount`}
                              />
                              <ErrorMessage2
                                name={`ingredients.${index}.amount`}
                              />
                            </div>
                            {values.ingredients.length !== 1 && (
                              <button
                                type="button"
                                className="flex items-center justify-center text-2xl mt-2 w-10 h-8 bg-red-600 text-white p-1.5 rounded"
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                -
                              </button>
                            )}
                          </div>
                        ))}

                        <button
                          type="button"
                          className="text-xs mt-2 text-blue-600 bg-white p-1.5 border border-blue-600 rounded"
                          onClick={() =>
                            arrayHelpers.push({
                              ingredient_id: "",
                              quantity: "",
                              unit_price: "",
                              discount: "",
                              amount: "",
                            })
                          }
                        >
                          Add more
                        </button>
                        <TaxArrayErrors />
                      </div>
                    )}
                  />
                </div>
                <div className="flex justify-end">
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-row w-full items-center gap-3">
                      <label className="flex justify-end w-1/2 text-nelsa_primary font-semibold">
                        Shipping Charges
                      </label>
                      <div className="flex flex-col w-1/2">
                        <Field
                          type="number"
                          autoComplete="off"
                          name="shipping_charges"
                          className={`w-full px-4 py-3 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                            errors.shipping_charges && touched.shipping_charges
                              ? "border-red-500"
                              : ""
                          } focus:border-blue-950`}
                        />
                        <ErrorMessage
                          name="shipping_charges"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full items-center gap-3">
                      <label className="flex justify-end w-1/2 text-nelsa_primary font-semibold">
                        Parking Charges
                      </label>
                      <div className="flex flex-col w-1/2">
                        <Field
                          type="number"
                          autoComplete="off"
                          name="parking_charges"
                          className={`w-full px-4 py-3 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                            errors.parking_charges && touched.parking_charges
                              ? "border-red-500"
                              : ""
                          } focus:border-blue-950`}
                        />
                        <ErrorMessage
                          name="parking_charges"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full items-center gap-3">
                      <h4 className="flex justify-end w-1/2 text-nelsa_primary font-semibold">
                        Total
                      </h4>
                      <div className="flex flex-col w-1/2">
                        <Field
                          type="text"
                          autoComplete="off"
                          name="total"
                          disabled
                          className={`w-full px-4 py-3 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                            errors.total && touched.total
                              ? "border-red-500"
                              : ""
                          } focus:border-blue-950`}
                        />
                        <ErrorMessage
                          name="total"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                  </div>
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

export default NewPurchaseOrder;
