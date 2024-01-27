import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getSuppliers } from "../../../features/suppliers/suppliersSlice";
import { getTaxes } from "../../../features/tax/taxSlice";
import { getIngredients } from "../../../features/ingredients/ingredientsSlice";
import Selector from "../../../components/common/Selector";
import OrderSelect from "../../../components/common/OrderSelect";
import {
  addItem,
  clearOrderItems,
  decreaseOrderItem,
  getOrderItemTotals,
  getOrderItems,
  removeOrderItem,
} from "../../../features/purchase/purchaseCartSlice";
import AddIngredient from "../../../components/modals/AddIngredient";

const CustomInputComponent = ({ field, ...props }) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

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
    supplier_id: Yup.number().required("This field is required!"),
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
  const [openIngredient, setOpenIngredient] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { suppliers } = useSelector((state) => state.suppliers);

  const { countries } = useSelector((state) => state.countries);

  const currencies = countries?.filter(
    (currency) => currency.currency_name !== "" || currency.currency_code !== ""
  );

  var newCurrencies = currencies.map(function (obj) {
    return {
      value: obj.id,
      label: obj.currency_code + " - " + obj.currency_name,
    };
  });

  const { taxes } = useSelector((state) => state.taxes);
  var newTaxes = taxes.map(function (obj) {
    return {
      value: obj.id,
      label: obj.label + " -" + obj.total_tax_percentage + "%",
    };
  });
  const { ingredients } = useSelector((state) => state.ingredients);

  var newArray = suppliers.map(function (obj) {
    return { value: obj.id, label: obj.name };
  });

  const cartItems = useSelector(getOrderItems);

  const { purchase_order_items } = useSelector(
    (state) => state.purchase_order_items
  );

  useEffect(() => {
    dispatch(clearOrderItems());
  }, []);

  useEffect(() => {
    dispatch(getOrderItemTotals());
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  useEffect(() => {
    dispatch(getTaxes());
  }, []);

  useEffect(() => {
    dispatch(getSuppliers());
  }, []);

  //Add product to cart
  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  //Decrease product quantity
  const handleDecreaseCart = (item) => {
    dispatch(decreaseOrderItem(item));
  };

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeOrderItem(cartItem));
  };

  const handleSubmit = async (formValue) => {
    //const { email, password } = formValue;

    console.log(formValue);

    // dispatch(alertActions.clear());

    // try {
    //   setLoading(true);

    //   //await dispatch(login({ email, password })).unwrap();
    //   //localStorage.setItem("email", JSON.stringify(email));
    //   navigate("/");

    //   setLoading(false);
    // } catch (error) {
    //   dispatch(alertActions.error(error));
    //   setLoading(false);
    // }
  };

  return (
    <>
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
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <div className="flex flex-col">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold">
                        Vendor
                      </label>

                      <Selector
                        options={newArray}
                        value={values.supplier_id}
                        setFieldValue={setFieldValue}
                        name="supplier_id"
                      />
                      <ErrorMessage
                        name="supplier_id"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold mb-1">
                        Supplier Currency
                      </label>
                      <Selector
                        options={newCurrencies}
                        value={values.supplier_currency}
                        setFieldValue={setFieldValue}
                        name="supplier_currency"
                      />

                      <ErrorMessage
                        name="supplier_currency"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold mb-1">
                        Tax Option
                      </label>
                      <Selector
                        options={newTaxes}
                        value={values.tax_option}
                        setFieldValue={setFieldValue}
                        name="tax_option"
                      />
                      <ErrorMessage
                        name="tax_option"
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
                      when the purchase order is closed.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-3 mt-4">
                    <div className="flex flex-col">
                      <label className="block text-nelsa_primary font-semibold mb-1">
                        Select Ingredient
                        <span
                          onClick={() => setOpenIngredient(true)}
                          className="ml-2 cursor-pointer rounded px-1 text-blue-600 border border-blue-600 text-xs font-normal"
                        >
                          Add new
                        </span>
                      </label>

                      <OrderSelect
                        options={ingredients}
                        handleAddToCart={handleAddToCart}
                      />
                    </div>
                  </div>
                  <div className="mt-4 relative overflow-x-auto border rounded-lg p-5">
                    <table className="w-full text-sm text-left ">
                      <thead className=" text-gray-900 uppercase border-b-2">
                        <tr className="">
                          <th scope="col" className="py-3">
                            Item
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Quantity
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Unit Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Discount %
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Amount
                          </th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody className=" text-gray-500">
                        {cartItems.length >= 1 ? (
                          cartItems.map((cartItem, index) => (
                            <tr key={index} className="border-t">
                              <td scope="col" className="">
                                {cartItem.name}
                              </td>
                              <td scope="col" className="px-6 py-3">
                                <div className="flex items-center">
                                  <button
                                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                    type="button"
                                    onClick={() => {
                                      handleDecreaseCart(cartItem);
                                    }}
                                  >
                                    <span className="sr-only">
                                      Quantity button
                                    </span>
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 2"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 1h16"
                                      />
                                    </svg>
                                  </button>
                                  <div>
                                    <input
                                      type="number"
                                      value={cartItem.cartQuantity}
                                      className="bg-gray-50 w-14 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                                      placeholder="1"
                                      required
                                    />
                                  </div>
                                  <button
                                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                                    type="button"
                                    onClick={() => {
                                      handleAddToCart(cartItem);
                                    }}
                                  >
                                    <span className="sr-only">
                                      Quantity button
                                    </span>
                                    <svg
                                      className="w-3 h-3"
                                      aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 18 18"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 1v16M1 9h16"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </td>
                              <td scope="col" className="px-6 py-3">
                                <div>
                                  <input
                                    type="number"
                                    value={cartItem.cartUnitPrice}
                                    className="bg-gray-50 w-44 text-left border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                                    placeholder="1"
                                    required
                                  />
                                </div>
                              </td>
                              <td scope="col" className="px-6 py-3">
                                <div>
                                  <input
                                    type="number"
                                    value=""
                                    className="bg-gray-50 w-44 text-left border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1"
                                    placeholder="1"
                                    required
                                  />
                                </div>
                              </td>
                              <td scope="col" className="px-6 py-3">
                                {cartItem.price * cartItem.cartQuantity}
                              </td>
                              <td>
                                <button
                                  type="button"
                                  className=" p-2 w-8 h-8 bg-red-600 border border-red-100 rounded-md text-white"
                                  onClick={() => handleRemoveFromCart(cartItem)}
                                >
                                  -
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <div className="text-center text-sm mt-10">
                            <div>Please select items to add</div>
                          </div>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex justify-end mt-4">
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
                              errors.shipping_charges &&
                              touched.shipping_charges
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
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-1 gap-3">
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
      {openIngredient && (
        <AddIngredient
          open={openIngredient}
          setOpenIngredient={setOpenIngredient}
        />
      )}
    </>
  );
};

export default NewPurchaseOrder;
