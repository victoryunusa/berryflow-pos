import React, { useEffect, useState } from "react";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { cn } from "../../functions/functions";
import useScroll from "../../hooks/useScroll";

import Cart from "../../components/pos/Cart";
import Product from "../../components/pos/Product";
import Selector from "../../components/common/Selector";
import RunningOrders from "../../components/pos/modals/RunningOrders";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  clearCart,
  getCartItems,
  getTotals,
} from "../../features/pos/cartSlice";
import AddCustomer from "../../components/modals/AddCustomer";
import { getCustomers } from "../../features/customer/customerSlice";

const MainScreen = () => {
  const [openRunnungOrders, setOpenRunningOrders] = useState(false);
  const [items, setItems] = useState([]);
  const [openCustomerAdd, setOpenCustomerAdd] = useState(false);
  const [billingType, setBillingType] = useState("Fine Dine");

  const scrolled = useScroll(5);

  const dispatch = useDispatch();

  const BaseUrl = import.meta.env.VITE_BASE_API_URL;

  const { token } = useSelector((state) => state.auth);

  const { billing_types } = useSelector((state) => state.billing_types);
  var options = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ];

  const loadProducts = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      `${BaseUrl}/products/load_pos_products`,
      config
    );

    setItems(response.data.products);
  };

  const { customers } = useSelector((state) => state.customers);

  var newCustomers = customers.map(function (obj) {
    return { value: obj.slug, label: obj.name };
  });

  let dollarUSLocale = Intl.NumberFormat("en-US");

  const cartItems = useSelector(getCartItems);

  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const initialValues = {
    customer_id: "",
  };

  // Set initial values
  const validationSchema = Yup.object().shape({
    customer_id: Yup.string().required("This field is required!"),
  });

  const handleSubmit = () => {};

  return (
    <>
      <div className="flex-1 h-fit relative	">
        <div
          className={cn(
            `sticky inset-x-0 top-0 z-30 w-full bg-white border-b transition-all py-2`,
            {
              "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
            }
          )}
        >
          <div className="flex px-5">
            <div className=" bg-nelsa_primary rounded-lg">
              <button
                onClick={() => setOpenRunningOrders(true)}
                className="w-full px-2 py-1  text-white text-md md:text-md font-semibold  focus-none"
              >
                Truetab
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex md:flex-row flex-col w-2/3">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex flex-col w-full bg-white gap-10 p-5">
                <div className="flex flex-row justify-between">
                  <div>
                    <h5 className="text-lg font-semibold">New Order</h5>
                  </div>
                  <div className="flex flex-row gap-3">
                    <div>
                      <select
                        name="billing_type"
                        className={`w-full px-3 py-2 border border-neutral-300 text-neutral-600 text-xs rounded-md focus:outline-none
                          `}
                      >
                        {billing_types.map((billing_type) => (
                          <option value={billing_type.id}>
                            {billing_type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button className="text-xs border border-neutral-500 rounded-md px-3 py-2 text-neutral-600 hover:bg-nelsa_primary hover:text-white">
                        Digital Menu Orders
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setOpenRunningOrders(true)}
                        className="text-xs border border-neutral-500 rounded-md px-3 py-2 text-neutral-600 hover:bg-nelsa_primary hover:text-white"
                      >
                        Running Orders
                      </button>
                    </div>
                    <div>
                      <button className="text-xs border border-neutral-500 rounded-md px-3 py-2 text-neutral-600 hover:bg-nelsa_primary hover:text-white">
                        Hold List
                      </button>
                    </div>
                    <div>
                      <button className="text-xs border border-red-600 bg-red-600 rounded-md px-3 py-2 text-white">
                        Close Register
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="w-4/5 rounded-md border border-zinc-200 bg-zinc-50 px-3 py-2">
                    <input
                      type="text"
                      name=""
                      id=""
                      placeholder="Search"
                      className="focus-none bg-zinc-50 outline-none w-full"
                    />
                  </div>
                  <div className="w-1/5 bg-nelsa_primary px-3 py-2 rounded-md">
                    <button className="w-full  text-white text-md font-semibold  focus-none">
                      Category
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-5 bg-zinc-100 py-3 px-5">
                {items?.map((product, index) => (
                  <Product product={product} key={index} />
                ))}
              </div>
            </div>
          </div>

          <div className="w-1/3 bg-white fixed top-12 right-0 h-full">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form className="h-full">
                  {/* <div className="flex flex-row items-center justify-between gap-3">
                        <button className="w-1/3 px-4 py-3 rounded-lg font-bold bg-neutral-100 hover:bg-neutral-300  text-neutral-700">
                          Dine in
                        </button>
                        <button className="w-1/3 px-4 py-3 rounded-lg font-bold bg-neutral-100 hover:bg-neutral-300 text-neutral-700">
                          Take away
                        </button>
                        <button className="w-1/3 px-4 py-3 rounded-lg font-bold bg-neutral-100 hover:bg-neutral-300 text-neutral-700">
                          Delivery
                        </button>
                      </div> */}
                  <div className="w-full flex flex-row justify-end items-end h-20 px-5">
                    <div className="flex flex-row items-end gap-2">
                      <div className="flex flex-col w-64">
                        <span className="text-xs">Customer:</span>
                        <Selector
                          options={newCustomers}
                          value={values.customer_id}
                          setFieldValue={setFieldValue}
                          name="customer_id"
                        />
                      </div>
                      <div className="flex flex-row">
                        <button
                          onClick={() => {
                            setOpenCustomerAdd(true);
                          }}
                          className="px-4 py-3 rounded-md text-xs font-bold border bg-neutral-100 text-neutral-700 hover:bg-nelsa_primary hover:text-white"
                        >
                          Add customer
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="h-3/6 overflow-y-scroll px-5 my-5 bg-neutral-50 border rounded-md mx-5">
                    <Cart />
                  </div>

                  {/* <div className="px-5 mt-5">
                        <div className="rounded-xl border px-4 py-4">
                          <div className="flex flex-row justify-between items-center">
                            <div className="flex flex-col">
                              <span className="uppercase text-xs font-semibold">
                                cashless credit
                              </span>
                              <span className="text-xl font-bold text-black">
                                ₦ 300,000
                              </span>
                              <span className=" text-xs text-zinc-400 ">
                                Available
                              </span>
                            </div>
                            <div className="px-4 py-3 bg-zinc-200 text-zinc-800 rounded-lg font-bold">
                              Cancel
                            </div>
                          </div>
                        </div>
                      </div> */}
                  <div className=" w-full p-5">
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex w-full rounded-lg">
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Enter coupon code"
                          className="w-full rounded-l-md border px-3 border-zinc-200 bg-zinc-50 focus:outline-none"
                        />
                        <button className="bg-black text-white text-sm font-semibold p-3 rounded-r-md focus-none">
                          Apply
                        </button>
                      </div>
                      <div className="flex flex-col md:gap-1">
                        <div className="flex justify-between ">
                          <span className="font-semibold text-sm">
                            Subtotal
                          </span>
                          <span className="font-bold">
                            ₦{" "}
                            {dollarUSLocale.format(
                              Math.round(cart.cartTotalAmount)
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between ">
                          <span className="font-semibold text-sm">
                            Discount
                          </span>
                          <span className="font-bold">- ₦0.00</span>
                        </div>
                        <div className="flex justify-between ">
                          <span className="font-semibold text-sm">
                            Shipping
                          </span>
                          <span className="font-bold">₦2.25</span>
                        </div>
                        <div className="border-t border-zinc-200 flex items-center justify-between">
                          <span className="text-lg">Total</span>
                          <span className="font-bold text-lg">
                            ₦{" "}
                            {dollarUSLocale.format(
                              Math.round(cart.cartTotalAmount)
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-3  mt-5">
                      <button
                        onClick={handleClearCart}
                        className="px-2 py-3 md:px-4 md:py-3 w-full rounded-md md:rounded-lg text-xs md:text-sm text-center border border-red-500 hover:bg-red-500 text-red-500 hover:text-white font-semibold"
                      >
                        Cancel
                      </button>
                      {billingType === "Fine Dine" ? (
                        <button className="px-2 py-3 md:px-4 md:py-3 w-full text-xs md:text-sm rounded-md md:rounded-lg text-center bg-nelsa_primary hover:bg-neutral-700 text-white font-semibold">
                          Send to Kitchen
                        </button>
                      ) : (
                        <>
                          <button className="px-2 py-3 md:px-4 md:py-3 w-full text-xs md:text-sm rounded-md md:rounded-lg text-center border hover:bg-neutral-200 text-neutral-500 font-semibold">
                            Hold Order
                          </button>
                          <button className="px-2 py-3 md:px-4 md:py-3 w-full text-xs md:text-sm rounded-md md:rounded-lg text-center bg-nelsa_primary hover:bg-neutral-700 text-white font-semibold">
                            Close Order
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div
          className={cn(
            `fixed inset-x-0 bottom-0 z-30 w-full bg-white border-t transition-all py-3`,
            {
              "border-t border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
            }
          )}
        >
          <div className="flex px-5">
            <p className="text-xs font-normal text-neutral-500">
              © Powered by: Truetab
            </p>
          </div>
        </div>
      </div>

      {openCustomerAdd && <AddCustomer setOpenCustomer={setOpenCustomerAdd} />}
      {openRunnungOrders && (
        <RunningOrders
          open={openRunnungOrders}
          setOpen={setOpenRunningOrders}
        />
      )}
    </>
  );
};

export default MainScreen;
