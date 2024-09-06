import React from "react";

import * as FaIcons from "react-icons/fa6";
import food from "../../assets/images/food.jpg";
import profile from "../../assets/images/profile.png";

const SingleOrder = () => {
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
              Order ID: #00899666
            </h3>
            <span className="flex gap-3">
              <span className="flex items-center px-2.5 h-5 rounded-lg bg-green-100 text-green-600 text-xs font-bold">
                Paid
              </span>
              <span className="flex items-center px-2.5 h-5 rounded-lg bg-green-100 text-green-600 text-xs font-bold">
                Accepted
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex text-small text-neutral-500">
              <FaIcons.FaCalendarDays size={15} className="mr-2" />
              08:50 PM, 04-07-2024
            </p>
            <p className="text-small text-neutral-500">
              Order From:{" "}
              <span className="text-neutral-700 font-bold">Digital Menu</span>
            </p>
            <p className="text-small text-neutral-500">
              Payment Mode:{" "}
              <span className="text-neutral-700 font-bold">Cash</span>
            </p>
            <p className="text-small text-neutral-500">
              Order Type:{" "}
              <span className="text-neutral-700 font-bold">Table</span>
            </p>
            <p className="text-small text-neutral-500">
              Billing Type:{" "}
              <span className="text-neutral-700 font-bold">Fine Dine</span>
            </p>
            <p className="text-small text-neutral-500">
              Table: <span className="text-neutral-700 font-bold">-</span>
            </p>
            <p className="text-small text-neutral-500">
              Waiter: <span className="text-neutral-700 font-bold">-</span>
            </p>
            <p className="text-small text-neutral-500">
              Delivery Time:
              <span className="text-neutral-700 font-bold">04-07-2024</span>
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
            <button className="flex bg-nelsa_primary text-white px-3 py-2.5 rounded-md text-sm font-semibold">
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
          <div className="flex p-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-3 items-center">
                <div className="flex flex-row">
                  <img
                    src={food}
                    className="w-16 h-16 object-fit rounded-lg"
                    alt="food"
                  />
                  {/* <span className="flex bg-nelsa_primary text-white font-bold h-8 w-8 rounded-full items-center justify-center relative top-4 -left-20 shadow-xl">
                    30
                  </span> */}
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm text-neutral-700 font-bold">
                    Beef With Mix Vegetables
                  </h3>
                  <p className="text-small text-neutral-500">
                    Steak Size: Large, Steak Temperature: Well
                  </p>
                  <p className="text-sm text-neutral-700 font-bold">$172.80</p>
                </div>
                <div>x 3</div>
              </div>
              <div className="flex flex-col w-full">
                <span className="flex flex-row text-neutral-700 w-full text-small gap-1">
                  Extras:<p className="text-neutral-500"> Onion, Mushrooms</p>
                </span>
                <span className="flex flex-row text-neutral-700 w-full text-small gap-1">
                  Instruction:
                  <p className="text-neutral-500">Nice</p>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 flex flex-col gap-5">
          <div className="bg-white rounded-md border flex flex-col w-full">
            <div className="flex flex-col gap-3 p-5">
              <div className="flex flex-row justify-between w-full text-neutral-700 text-sm font-normal">
                <span>Subtotal</span>
                <span>$186.30</span>
              </div>
              <div className="flex flex-row justify-between w-full text-neutral-700 text-sm font-normal">
                <span>Discount</span>
                <span>$186.30</span>
              </div>
            </div>
            <div className="flex border-t border-dashed w-full">
              <div className="flex flex-row justify-between p-5 w-full text-neutral-700 font-bold">
                <span>Total</span>
                <span>$186.30</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-md border py-5">
            <div className="border-b">
              <h3 className="px-5 mb-5 text-lg text-neutral-500 font-bold">
                Delivery Information
              </h3>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <div className="flex items-center gap-3 border-b pb-2">
                <img
                  src={profile}
                  className="w-10 h-10 rounded-full"
                  alt="Profile"
                />
                <h4>Name Name</h4>
              </div>
              <div className="flex flex-col gap-3 border-b pb-2">
                <span className="flex items-center text-small text-neutral-500">
                  <FaIcons.FaEnvelope size={15} className="mr-2" />
                  customer@example.com
                </span>
                <span className="flex items-center text-small text-neutral-500">
                  <FaIcons.FaPhoneVolume size={15} className="mr-2" />
                  08069072412
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
