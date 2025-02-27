import React, { useEffect, useState } from "react";

import * as FaIcons from "react-icons/fa6";
import { MdOutlineTableBar } from "react-icons/md";
import { GoGear } from "react-icons/go";

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
import ConfirmOrder from "../../components/pos/modals/ConfirmOrder";
import { getPaymentMethods } from "../../features/payment_method/paymentMethodSlice";
import { getTables } from "../../features/table/tableSlice";
import SelectTable from "../../components/pos/modals/SelectTable";
import CloseRegister from "../../components/pos/modals/CloseRegister";
import HoldList from "../../components/pos/modals/HoldList";
import { useNavigate } from "react-router";
import { getRegister } from "../../features/pos/businessRegisterSlice";
import { getProfile } from "../../features/user/userSlice";
import PrintOrder from "../sales/order/modals/PrintOrder";
import { getRegisterOrderAmount } from "../../features/order/registerOrderAmountSlice";

const MainScreen = () => {
  const [openPrintOrder, setOpenPrintOrder] = useState(false);
  const [processedOrder, setProcessedOrder] = useState(null);
  const [openRunnungOrders, setOpenRunningOrders] = useState(false);
  const [items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [openCustomerAdd, setOpenCustomerAdd] = useState(false);
  const [openConfirmOrder, setOpenConfirmOrder] = useState(false);
  const [openSelectTable, setOpenSelectTable] = useState(false);
  const [openCloseRegister, setOpenCloseRegister] = useState(false);
  const [openHoldList, setOpenHoldList] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderType, setOrderType] = useState("TAKEWAY");

  const scrolled = useScroll(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BaseUrl = import.meta.env.VITE_BASE_API_URL;

  const { token } = useSelector((state) => state.auth);

  const { order_types } = useSelector((state) => state.order_types);

  const { tables, message } = useSelector((state) => state.tables);

  const { activeRegister } = useSelector((state) => state.active_register);

  const tablesIndex = tables?.filter((table) => table.status === 1);

  const { billing_types } = useSelector((state) => state.billing_types);

  const [billingType, setBillingType] = useState(
    billing_types[1]?.billing_type_constant
  );

  const { register_order_total } = useSelector(
    (state) => state.register_order_total
  );

  console.log(register_order_total);

  useEffect(() => {
    dispatch(getRegisterOrderAmount());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRegister());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  useEffect(() => {
    if (!activeRegister) {
      navigate("/finance/business_register/add");
    }
  }, [navigate, activeRegister]);

  var options = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ];

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const loadProducts = async () => {
    const response = await axios.get(
      `${BaseUrl}/products/load_pos_products`,
      config
    );

    console.log(response.data.products);

    setItems(response.data.products);
  };

  const loadCustomers = async () => {
    const response = await axios.get(
      `${BaseUrl}/customers/loadCustomers`,
      config
    );
    setCustomers(response.data.customers);
  };

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
    dispatch(getPaymentMethods());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch, message]);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  useEffect(() => {
    loadProducts();
    loadCustomers();
  }, []);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  //const customerIndex = Object.keys(customers).length - 1;

  const initialValues = {
    customer_id: customers[0]?.slug ? customers[0]?.slug : "",
  };

  // Set initial values
  const validationSchema = Yup.object().shape({
    customer_id: Yup.string().required("This field is required!"),
  });

  const handleSubmit = () => {};

  const handleOpenPrint = (slug) => {
    setProcessedOrder(slug);
    setOpenPrintOrder(true);
  };

  const closeModal = () => {
    setOpenPrintOrder(false);
    setProcessedOrder(null);
  };

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
            <div className=" bg-tt_rich_black rounded-lg">
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
                    <h5 className="text-lg font-bold">New Order</h5>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-3">
                    <div className="">
                      <select
                        name="billing_type"
                        className={`w-full px-3 py-2.5 border border-neutral-500 text-neutral-600 text-small  rounded-md focus:outline-none
                          `}
                        onChange={(e) => setBillingType(e.target.value)}
                        value={billingType}
                      >
                        {billing_types.map((billing_type, index) => (
                          <option
                            value={billing_type.billing_type_constant}
                            key={index}
                          >
                            {billing_type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <button className="text-small font-semibold border border-neutral-500 rounded-md px-3 py-2.5 text-neutral-600 hover:bg-tt_rich_black hover:text-white">
                        Digital Menu Orders
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setOpenRunningOrders(true)}
                        className="text-small font-semibold border border-neutral-500 rounded-md px-3 py-2.5 text-neutral-600 hover:bg-tt_rich_black hover:text-white"
                      >
                        Running Orders
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setOpenHoldList(true)}
                        className="text-small font-semibold border border-neutral-500 rounded-md px-3 py-2.5 text-neutral-600 hover:bg-tt_rich_black hover:text-white"
                      >
                        Hold List
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => setOpenCloseRegister(true)}
                        className="text-small font-semibold border border-red-600 bg-red-600 rounded-md px-3 py-2.5 text-white"
                      >
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
                      className="focus-none bg-zinc-50 outline-none w-full placeholder:text-sm"
                    />
                  </div>
                  <div className="w-1/5 bg-tt_rich_black px-3 py-2 rounded-md">
                    <button className="w-full  text-white text-md font-semibold  focus-none">
                      Category
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-3  py-3 px-5 h-1/2">
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
                  <div className="flex flex-col px-5 mt-5">
                    <div className="flex flex-row items-center w-full rounded-md  border">
                      {order_types?.map((order_type, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={() => {
                            setOrderType(order_type.order_type_constant);
                            // if (order_type.order_type_constant == "DINEIN") {
                            //   setOpenSelectTable(true);
                            // }
                          }}
                          className={`w-1/2 text-xs ${
                            order_type.order_type_constant == orderType
                              ? "bg-neutral-200"
                              : "bg-neutral-50 text-neutral-400"
                          } font-bold px-3 py-3 text-center border-r flex flex-row gap-1`}
                        >
                          <span
                            className={`flex items-center w-4 h-4 rounded-full p-1 ${
                              order_type.order_type_constant == orderType
                                ? "bg-tt_celestial_blue"
                                : "bg-neutral-300"
                            } `}
                          >
                            <FaIcons.FaCircle
                              size={10}
                              className="text-white"
                            />
                          </span>
                          {order_type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  {orderType == "DINEIN" && (
                    <div className="flex flex-col px-5 my-3">
                      <div className="flex">
                        {selectedTable ? (
                          <div className="flex flex-row items-center gap-2 px-2">
                            <MdOutlineTableBar />
                            {selectedTable?.table_name}
                            <button
                              type="button"
                              className="px-2 py-1.5 border rounded-md"
                              onClick={() => setOpenSelectTable(true)}
                            >
                              <GoGear />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="border rounded-md px-3 py-2 text-sm"
                            onClick={() => setOpenSelectTable(true)}
                          >
                            Assign table
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="w-full flex flex-row gap-2 items-end mt-2 mb-4 px-5">
                    {/* <div className="flex flex-col w-1/3">
                      <span className="text-xs">Waiter:</span>
                      <Selector
                        options={newCustomers}
                        value={values.customer_id}
                        setFieldValue={setFieldValue}
                        name="customer_id"
                      />
                    </div> */}
                    <div className="flex flex-col w-10/12">
                      <span className="text-xs">Customer:</span>
                      <Selector
                        options={newCustomers}
                        value={values.customer_id}
                        setFieldValue={setFieldValue}
                        name="customer_id"
                      />
                    </div>
                    <div className="flex flex-col justify-center w-2/12">
                      <button
                        onClick={() => {
                          setOpenCustomerAdd(true);
                        }}
                        className="items-center px-3 py-3 rounded-md text-xs font-bold border bg-neutral-100 text-neutral-700 hover:bg-tt_rich_black hover:text-white"
                      >
                        <FaIcons.FaUserPlus size={17} className="self-center" />
                      </button>
                    </div>
                  </div>
                  <div className="h-2/6 overflow-y-scroll px-2 my-2 bg-neutral-50 border rounded-md mx-5">
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
                      <div className="flex flex-col md:gap-1">
                        <div className="flex justify-between ">
                          <span className="font-semibold text-sm">
                            Subtotal
                          </span>
                          <span className="font-bold">
                            {dollarUSLocale.format(cart.cartTotalAmount)}
                          </span>
                        </div>
                        <div className="flex justify-between ">
                          <span className="font-semibold text-sm">
                            Discount
                          </span>
                          <span className="font-bold">
                            - {dollarUSLocale.format(cart.cartTotalDiscount)}
                          </span>
                        </div>
                        <div className="flex justify-between ">
                          <span className="font-semibold text-sm">
                            Total after Discount
                          </span>
                          <span className="font-bold">
                            {dollarUSLocale.format(
                              cart.cartTotalAmount - cart.cartTotalDiscount
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between ">
                          <span className="font-semibold text-sm">
                            Total Tax
                          </span>
                          <span className="font-bold">
                            {dollarUSLocale.format(cart.cartTotalTax)}
                          </span>
                        </div>
                        {/* <div className="flex justify-between ">
                          <span className="font-semibold text-sm">
                            Shipping
                          </span>
                          <span className="font-bold">₦2.25</span>
                        </div> */}
                        <div className="border-t border-zinc-200 flex items-center justify-between">
                          <span className="text-lg font-bold">Total</span>
                          <span className="font-bold text-lg">
                            {dollarUSLocale.format(
                              cart.cartTotalAmount -
                                cart.cartTotalDiscount +
                                cart.cartTotalTax
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-3  mt-3">
                      {/* <button
                        onClick={handleClearCart}
                        className="px-2 py-3 md:px-4 md:py-3 w-full rounded-md md:rounded-lg text-xs md:text-sm text-center border border-red-500 hover:bg-red-500 text-red-500 hover:text-white font-semibold"
                      >
                        Cancel
                      </button> */}
                      {billingType === "FINE_DINE" ? (
                        <button
                          onClick={() => setOpenConfirmOrder(true)}
                          className="px-2 py-3 md:px-4 md:py-3 w-full text-xs md:text-sm rounded-md md:rounded-lg text-center bg-tt_rich_black hover:bg-neutral-700 text-white font-semibold"
                        >
                          Send to Kitchen
                        </button>
                      ) : (
                        <>
                          <button className="px-2 py-3 md:px-4 md:py-3 w-full text-xs md:text-sm rounded-md md:rounded-lg text-center border hover:bg-neutral-200 text-neutral-500 font-semibold">
                            Hold
                          </button>
                          <button
                            onClick={() => setOpenConfirmOrder(true)}
                            className="px-2 py-3 md:px-4 md:py-3 w-full text-xs md:text-sm rounded-md md:rounded-lg text-center bg-tt_rich_black hover:bg-neutral-700 text-white font-semibold"
                          >
                            Complete
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

      {openPrintOrder && (
        <PrintOrder setOpen={closeModal} slug={processedOrder} />
      )}
      {openCustomerAdd && <AddCustomer setOpenCustomer={setOpenCustomerAdd} />}
      {openSelectTable && (
        <SelectTable
          setOpen={setOpenSelectTable}
          setSelectedTable={setSelectedTable}
        />
      )}
      {openCloseRegister && (
        <CloseRegister
          register_order_total={register_order_total}
          setOpen={setOpenCloseRegister}
        />
      )}
      {openHoldList && <HoldList setOpen={setOpenHoldList} />}
      {openConfirmOrder && (
        <ConfirmOrder
          setOpen={setOpenConfirmOrder}
          cart={cart}
          register={activeRegister}
          billingType={billingType}
          orderType={orderType}
          customer={customers[0]}
          setProcessedOrder={handleOpenPrint}
        />
      )}
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
