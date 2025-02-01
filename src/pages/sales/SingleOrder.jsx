import { useEffect, useState } from "react";

import * as FaIcons from "react-icons/fa6";

//import food from "../../assets/images/food.jpg";
import profile from "../../assets/images/profile.png";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getOrder } from "../../features/order/singleOrderSlice";
import { prettyDate } from "../../functions/functions";
import PrintOrder from "./order/modals/PrintOrder";

const SingleOrder = () => {
  const [openPrintOrder, setOpenPrintOrder] = useState(false);
  const [processedOrder, setProcessedOrder] = useState(null);
  const [openPrint, setOpenPrint] = useState(false);

  const dispatch = useDispatch();
  const { slug } = useParams();
  //const navigate = useNavigate();

  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder(slug));
  }, [dispatch, slug]);

  const handleOpenPrint = (slug) => {
    setProcessedOrder(slug);
    setOpenPrintOrder(true);
  };

  const closeModal = () => {
    setOpenPrintOrder(false);
    setProcessedOrder(null);
  };

  return (
    <div className="flex flex-col space-y-5">
      {/* Top */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-3">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.history.back()}
          >
            <p className="text-sm text-blue-800">{"< Back"}</p>
          </div>
          <div>
            <h3 className="font-bold text-lg text-neutral-7">Order Details</h3>
            <p className="text-xs text-neutral-400">
              Select the plan that you want to subscribe to
            </p>
          </div>
        </div>
      </div>
      {/* Product Info */}
      <div className="flex flex-row justify-between bg-white border p-5 rounded-lg text-xs w-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-5">
            <h3 className="text-xl font-bold text-neutral-500">
              Order ID: #{order?.order_number}
            </h3>
            <span className="flex gap-3">
              <span className="flex items-center px-2.5 h-5 rounded-lg bg-green-50 text-green-600 text-xs font-bold">
                Paid
              </span>
              <span className="flex items-center px-2.5 h-5 rounded-lg bg-green-50 text-green-600 text-xs font-bold">
                Accepted
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex text-sm text-neutral-500">
              <FaIcons.FaCalendarDays size={15} className="mr-2" />
              {prettyDate(order?.created_at_label)}
            </p>
            <p className="text-sm text-neutral-500">
              Order From:{" "}
              <span className="text-neutral-700 font-bold">
                {order?.order_origin}
              </span>
            </p>
            <p className="text-sm text-neutral-500">
              Payment Method:{" "}
              <span className="text-neutral-700 font-bold">
                {order?.payment_method}
              </span>
            </p>
            <p className="text-sm text-neutral-500">
              Order Type:{" "}
              <span className="text-neutral-700 font-bold">
                {order?.order_type}
              </span>
            </p>
            <p className="text-sm text-neutral-500">
              Billing Type:{" "}
              <span className="text-neutral-700 font-bold">
                {" "}
                {order?.billing_type_data?.label}
              </span>
            </p>
            <p className="text-sm text-neutral-500">
              Table: <span className="text-neutral-700 font-bold">-</span>
            </p>
            <p className="text-sm text-neutral-500">
              Waiter: <span className="text-neutral-700 font-bold">-</span>
            </p>
            <p className="text-sm text-neutral-500">
              Delivery Time:
              <span className="text-neutral-700 font-bold">--</span>
            </p>
          </div>
        </div>
        <div className="flex flex-row items-end gap-3">
          <div>
            <select
              name="billing_type"
              className={`w-full px-3 py-2.5 border border-neutral-300 text-neutral-600 text-small rounded-md focus:outline-none
                          `}
            >
              <option value="1">Paid</option>
              <option value="1">Unpaid</option>
            </select>
          </div>
          <div>
            <select
              name="billing_type"
              className={`w-full px-3 py-2.5 border border-neutral-300 text-neutral-600 text-small rounded-md focus:outline-none
                          `}
            >
              <option value="1">Paid</option>
              <option value="1">Unpaid</option>
            </select>
          </div>
          <div>
            <button
              onClick={() => handleOpenPrint(order?.slug)}
              className="flex bg-tt_rich_black text-white px-3 py-2.5 rounded-md text-sm font-semibold"
            >
              <FaIcons.FaPrint size={15} className="mr-2" /> Print
            </button>
          </div>
        </div>
      </div>
      {/* Product Info */}
      <div className="flex flex-row gap-5 w-full">
        <div className="bg-white w-1/2 rounded-md py-5 border">
          <div className="border-b">
            <h3 className="px-5 mb-5 text-lg text-neutral-500 font-bold">
              Order Items
            </h3>
          </div>
          <div className="flex flex-col gap-5 p-5">
            {order?.products?.map((product, index) => (
              <div className="flex flex-col gap-2 w-full" key={index}>
                <div className="flex flex-row gap-3 items-start justify-between w-full">
                  <div className="flex flex-row gap-2 items-center">
                    <img
                      src={
                        "https://pub-c53156c3afbd424aa9f8f46985cf39b7.r2.dev/nelsa-app/" +
                        product?.product.images[0]?.filename
                      }
                      className="w-16 h-16 object-fit rounded-lg"
                      alt="food"
                    />
                    {/* <span className="flex bg-tt_rich_black text-white font-bold h-8 w-8 rounded-full items-center justify-center relative top-4 -left-20 shadow-xl">
                    30
                  </span> */}
                    <div className="flex flex-col items-start ">
                      <h3 className="text-base text-neutral-700 font-bold">
                        {product.name}
                      </h3>
                      {/* <p className="text-small text-neutral-500">
                      Steak Size: Large, Steak Temperature: Well
                    </p> */}
                      <p className="text-sm text-neutral-700 font-bold">
                        {order.currency_code} {product.price}
                      </p>
                      x {product.quantity}
                    </div>
                  </div>

                  <div>
                    {order.currency_code} {product.total_price}
                  </div>
                </div>
                {/* <div className="flex flex-col w-full">
                  <span className="flex flex-row text-neutral-700 w-full text-small gap-1">
                    Extras:<p className="text-neutral-500"> Onion, Mushrooms</p>
                  </span>
                  <span className="flex flex-row text-neutral-700 w-full text-small gap-1">
                    Instruction:
                    <p className="text-neutral-500">Nice</p>
                  </span>
                </div> */}
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-5">
          <div className="bg-white rounded-md border flex flex-col w-full">
            <div className="flex flex-col gap-3 p-5">
              <div className="flex flex-row justify-between w-full text-neutral-700 text-sm font-normal">
                <span>Subtotal</span>
                <span>
                  {order.currency_code}{" "}
                  {order.sale_amount_subtotal_excluding_tax}
                </span>
              </div>
              <div className="flex flex-row justify-between w-full text-neutral-700 text-sm font-normal">
                <span>Discount</span>
                <span>
                  {order.currency_code} -
                  {order.total_discount_amount
                    ? order.total_discount_amount
                    : "--"}
                </span>
              </div>
              <div className="flex flex-row justify-between w-full text-neutral-700 text-sm font-normal">
                <span>Tax</span>
                <span>
                  {order.currency_code}{" "}
                  {order.total_tax_amount ? order.total_tax_amount : "--"}
                </span>
              </div>
            </div>
            <div className="flex border-t border-dashed w-full">
              <div className="flex flex-row justify-between p-5 w-full text-neutral-700 font-bold">
                <span>Total</span>
                <span>
                  {order.currency_code} {order.total_order_amount}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md border py-5">
            <div className="border-b">
              <h3 className="px-5 mb-5 text-lg text-neutral-500 font-bold">
                Customer Information
              </h3>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-3 border-b pb-2">
                <img
                  src={profile}
                  className="w-10 h-10 rounded-full"
                  alt="Profile"
                />
                <h4>{order?.customer_name}</h4>
              </div>
              <div className="flex flex-col gap-3 border-b pb-2">
                <span className="flex items-center text-small text-neutral-500">
                  <FaIcons.FaEnvelope size={15} className="mr-2" />
                  {order?.customer_email}
                </span>
                <span className="flex items-center text-small text-neutral-500">
                  <FaIcons.FaPhoneVolume size={15} className="mr-2" />
                  {order?.customer_phone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openPrintOrder && (
        <PrintOrder setOpen={closeModal} slug={processedOrder} />
      )}
    </div>
  );
};

export default SingleOrder;
