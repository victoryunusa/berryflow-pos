import React, { useState } from "react";
import Cart from "../../components/pos/Cart";
import Product from "../../components/pos/Product";
import Selector from "../../components/common/Selector";
import RunningOrders from "../../components/pos/modals/RunningOrders";

const MainScreen = () => {
  const [openRunnungOrders, setOpenRunningOrders] = useState(false);
  var options = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ];
  return (
    <>
      <div className="flex flex-col gap-5 w-full p-5">
        <div className="flex flex-row gap-3 w-full">
          <div className="w-1/6 bg-nelsa_primary px-4 py-3 rounded-lg">
            <button
              onClick={() => setOpenRunningOrders(true)}
              className="w-full  text-white text-xs md:text-md font-semibold  focus-none"
            >
              Running Orders
            </button>
          </div>
          <div className="w-1/6 bg-nelsa_primary px-4 py-3 rounded-lg">
            <button className="w-full  text-white text-xs md:text-md font-semibold  focus-none">
              Hold List
            </button>
          </div>
          <div className="w-1/6 bg-nelsa_primary px-4 py-3 rounded-lg">
            <button className="w-full  text-white text-xs md:text-md font-semibold  focus-none">
              Register
            </button>
          </div>
          <div className="w-1/6 bg-nelsa_primary px-4 py-3 rounded-lg">
            <button className="w-full  text-white text-xs md:text-md font-semibold  focus-none">
              Category
            </button>
          </div>
          <div className="w-1/6 bg-nelsa_primary px-4 py-3 rounded-lg">
            <button className="w-full  text-white text-xs md:text-md font-semibold  focus-none">
              Category
            </button>
          </div>
          <div className="w-1/6 bg-nelsa_primary px-4 py-3 rounded-lg">
            <button className="w-full  text-white text-xs md:text-md font-semibold  focus-none">
              Category
            </button>
          </div>
        </div>
        <div className="flex md:flex-row flex-col gap-10 bg-white w-full p-2 md:p-5 rounded-xl">
          <div className="flex flex-col gap-3 w-full lg:w-3/5 min-h-screen">
            <div className="flex w-full rounded-lg gap-5">
              <div className="w-4/5 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search"
                  className="focus-none bg-zinc-50 outline-none w-full"
                />
              </div>
              <div className="w-1/5 bg-nelsa_primary px-4 py-3 rounded-lg">
                <button className="w-full  text-white text-md font-semibold  focus-none">
                  Category
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-6 bg-zinc-100 p-5 gap-3 overflow-y-auto rounded-xl h-[300px] md:h-[450px] lg:h-[710px]">
              {/* {products.map((product) => (
              <Product product={product} key={product.id} />
            ))} */}
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
              <Product />
            </div>
          </div>
          <div className="space-y-5 w-full lg:w-2/5">
            <div className="flex flex-row items-center justify-between gap-3">
              <button className="w-1/3 px-4 py-3 rounded-lg font-bold bg-neutral-100 hover:bg-neutral-300  text-neutral-700">
                Dine in
              </button>
              <button className="w-1/3 px-4 py-3 rounded-lg font-bold bg-neutral-100 hover:bg-neutral-300 text-neutral-700">
                Take away
              </button>
              <button className="w-1/3 px-4 py-3 rounded-lg font-bold bg-neutral-100 hover:bg-neutral-300 text-neutral-700">
                Delivery
              </button>
            </div>
            <div className="flex flex-row items-end justify-between gap-3">
              <div className="w-2/5 flex flex-col">
                <span>Waiter:</span>
                <Selector
                  options={options}
                  value={""}
                  setFieldValue={""}
                  name="display_on_pos_screen"
                />
              </div>
              <div className="w-2/5 flex flex-col">
                <span>Customer:</span>
                <Selector
                  options={options}
                  value={""}
                  setFieldValue={""}
                  name="display_on_pos_screen"
                />
              </div>
              <div className="w-1/5 flex flex-row gap-3">
                <button className="w-1/2 px-2 py-3 rounded-lg text-sm font-bold bg-neutral-100 text-neutral-500">
                  Edit
                </button>
                <button className="w-1/2 px-2 py-3 rounded-lg text-sm font-bold bg-neutral-100 text-neutral-700">
                  +
                </button>
              </div>
            </div>
            <Cart />
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
                  <span className=" text-xs text-zinc-400 ">Available</span>
                </div>
                <div className="px-4 py-3 bg-zinc-200 text-zinc-800 rounded-lg font-bold">
                  Cancel
                </div>
              </div>
            </div>
          </div> */}
            <div className="flex flex-row w-full mt-5 gap-3">
              <button className="px-4 py-3 w-full rounded-lg shadow-lg text-center bg-red-500 hover:bg-red-600 text-white font-semibold">
                Cancel
              </button>
              <button className="px-4 py-3 w-full rounded-lg shadow-lg text-center bg-purple-400 hover:bg-purple-700 text-white font-semibold">
                Hold
              </button>
              <button className="px-4 py-3 w-full rounded-lg shadow-lg text-center bg-blue-500 hover:bg-blue-700 text-white font-semibold">
                Quick Bill
              </button>
              <button className="px-4 py-3 w-full rounded-lg shadow-lg text-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
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
