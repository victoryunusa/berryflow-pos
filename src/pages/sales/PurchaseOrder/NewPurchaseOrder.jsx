import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
  updateUnitPrice,
  getOrderItems,
  removeOrderItem,
  updateDiscountPrice,
  updateQuantity,
} from "../../../features/purchase/purchaseCartSlice";
import {
  addPurchaseOrder,
  getPurchaseOrders,
} from "../../../features/purchase/purchaseOrderSlice";
import AddIngredient from "../../../components/modals/AddIngredient";
import AddTax from "../../../components/modals/AddTax";
import AddSupplier from "../../../components/modals/AddSupplier";
import { alertActions } from "../../../app/store";

const CustomInputComponent = ({ field, ...props }) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const NewPurchaseOrder = () => {
  let dollarUSLocale = Intl.NumberFormat("en-US");

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
    shipping_charge: "",
    packing_charge: "",
    total: "",
    tax_type: "",
  };

  // Set initial values
  const validationSchema = Yup.object().shape({
    supplier_id: Yup.string().required("This field is required!"),
    po_number: Yup.string().required("This field is required!"),
    po_reference: Yup.string().required("This field is required!"),
    po_order_date: Yup.string().required("This field is required!"),
    po_due_date: Yup.string().required("This field is required!"),
    supplier_currency: Yup.string().required("This field is required!"),
  });

  const [loading, setLoading] = useState(false);
  const [openIngredient, setOpenIngredient] = useState(false);
  const [openTax, setOpenTax] = useState(false);
  const [openVendor, setOpenVendor] = useState(false);

  const dispatch = useDispatch();

  const { suppliers } = useSelector((state) => state.suppliers);

  const { countries } = useSelector((state) => state.countries);

  const currencies = countries?.filter(
    (currency) => currency.currency_name !== "" || currency.currency_code !== ""
  );

  var newCurrencies = currencies.map(function (obj) {
    return {
      value: obj.id,
      label: obj.name + " - " + obj.currency_symbol,
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
    return { value: obj.slug, label: obj.name };
  });

  const cartItems = useSelector(getOrderItems);

  const { orderItemsTotalAmount } = useSelector(
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

  const handleChangeUnitPrice = ({ id, value }) => {
    dispatch(updateUnitPrice({ id, unit_price: value }));
  };

  const handleChangeDiscountPrice = ({ id, value }) => {
    dispatch(updateDiscountPrice({ id, discount_price: value }));
  };

  const handleChangeQuantity = ({ id, value }) => {
    dispatch(updateQuantity({ id, new_quantity: value }));
  };

  const handleSubmit = async (formValue) => {
    const {
      supplier_id,
      po_number,
      po_reference,
      po_order_date,
      po_due_date,
      supplier_currency,
      tax_option,
      update_stock,
      shipping_charge,
      packing_charge,
    } = formValue;

    dispatch(alertActions.clear());
    try {
      setLoading(true);

      await dispatch(
        addPurchaseOrder({
          supplier_id: supplier_id,
          po_number: po_number,
          po_reference: po_reference,
          order_date: po_order_date,
          order_due_date: po_due_date,
          supplier_currency: supplier_currency,
          tax_option: tax_option,
          update_stock: update_stock,
          shipping_charge: shipping_charge,
          packing_charge: packing_charge,
          products: cartItems,
          tax_type: "",
        })
      ).unwrap();
      //localStorage.setItem("email", JSON.stringify(email));

      dispatch(
        alertActions.success({
          message: "Purchase Order successfully added.",
          showAfterRedirect: true,
        })
      );
      // navigate("/suppliers");
      window.location.reload(true);
      dispatch(getPurchaseOrders());
      setLoading(false);
    } catch (error) {
      dispatch(alertActions.error(error));
      setLoading(false);
    }
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
        <div className="bg-white p-10 rounded-lg text-sm border">
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
                      <label className="block text-nelsa_primary font-semibold mb-1">
                        Vendor
                        <span
                          onClick={() => setOpenVendor(true)}
                          className="ml-2 cursor-pointer rounded px-1 text-blue-600 border border-blue-600 text-xs font-normal"
                        >
                          Add new
                        </span>
                      </label>

                      <Selector
                        options={newArray}
                        value={values.supplier_id}
                        setFieldValue={setFieldValue}
                        name="supplier_id"
                        errors={errors}
                        touched={touched}
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
                        <span
                          onClick={() => setOpenTax(true)}
                          className="ml-2 cursor-pointer rounded px-1 text-blue-600 border border-blue-600 text-xs font-normal"
                        >
                          Add new
                        </span>
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
                                    className="inline-flex items-center justify-center p-1 text-sm font-medium h-[1.85rem] w-6 text-gray-500 bg-white border border-gray-300 rounded-l focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
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
                                      onChange={(e) =>
                                        handleChangeQuantity({
                                          id: cartItem.id,
                                          value: e.target.value,
                                        })
                                      }
                                      className="bg-gray-50 w-14 text-center border border-gray-300 text-gray-600 text-sm focus:outline-none block px-2.5 py-1"
                                      placeholder="1"
                                      required
                                    />
                                  </div>
                                  <button
                                    className="inline-flex items-center justify-center h-[1.85rem] w-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
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
                                <div className="flex flex-row items-center gap-2">
                                  <input
                                    type="number"
                                    value={cartItem.cartUnitPrice}
                                    onChange={(e) =>
                                      handleChangeUnitPrice({
                                        id: cartItem.id,
                                        value: e.target.value,
                                      })
                                    }
                                    className="bg-gray-50 w-32 text-left border border-gray-300 text-gray-600 focus:outline-none text-sm rounded block px-2.5 py-1"
                                  />
                                  /{cartItem.storage_unit.unit_code}
                                </div>
                              </td>
                              <td scope="col" className="px-6 py-3">
                                <div>
                                  <input
                                    type="number"
                                    onChange={(e) =>
                                      handleChangeDiscountPrice({
                                        id: cartItem.id,
                                        value: e.target.value,
                                      })
                                    }
                                    className="bg-gray-50 w-32 text-left border border-gray-300 text-gray-600 text-sm rounded focus:outline-none block px-2.5 py-1"
                                  />
                                </div>
                              </td>
                              <td scope="col" className="px-6 py-3">
                                {dollarUSLocale.format(
                                  Math.round(
                                    cartItem.cartUnitPrice *
                                      cartItem.cartQuantity -
                                      (cartItem.cartUnitPrice *
                                        cartItem.cartQuantity *
                                        cartItem.cartDiscountPrice) /
                                        100
                                  )
                                )}
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
                            name="shipping_charge"
                            className={`w-full px-4 py-3 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                              errors.shipping_charge && touched.shipping_charge
                                ? "border-red-500"
                                : ""
                            } focus:border-blue-950`}
                          />
                          <ErrorMessage
                            name="shipping_charge"
                            component="div"
                            className="text-red-500 text-sm"
                          />
                        </div>
                      </div>
                      <div className="flex flex-row w-full items-center gap-3">
                        <label className="flex justify-end w-1/2 text-nelsa_primary font-semibold">
                          Packing Charges
                        </label>
                        <div className="flex flex-col w-1/2">
                          <Field
                            type="number"
                            autoComplete="off"
                            name="packing_charge"
                            className={`w-full px-4 py-3 border text-neutral-500 text-sm rounded-md focus:outline-none ${
                              errors.packing_charge && touched.packing_charge
                                ? "border-red-500"
                                : ""
                            } focus:border-blue-950`}
                          />
                          <ErrorMessage
                            name="packing_charge"
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
                            value={
                              orderItemsTotalAmount +
                              values.shipping_charge +
                              values.packing_charge
                            }
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
                        className="w-full md:w-[11.1em] px-4 py-3 mt-4 font-bold  bg-nelsa_primary/60 text-[#ffffff] rounded-md flex items-center justify-center"
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

      {openTax && <AddTax setOpenAdd={setOpenTax} />}
      {openVendor && <AddSupplier setOpenSupplier={setOpenVendor} />}
    </>
  );
};

export default NewPurchaseOrder;
