import React from "react";
import Cart from "../../components/pos/Cart";
import Product from "../../components/pos/Product";
import Selector from "../../components/common/Selector";

const MainScreen = () => {
  var options = [
    { value: 1, label: "Yes" },
    { value: 0, label: "No" },
  ];
  return (
    <div className="w-full">
      <div className="flex md:flex-row flex-col gap-5 bg-white p-2.5 w-full">
        <div className="w-full lg:w-3/5 min-h-screen">
          <div className="flex flex-row justify-between items-center px-5 mt-5">
            <div className="">
              <div className="font-bold text-xl">Select items</div>
            </div>
            <div className="flex items-center">
              <div className="text-sm text-center mr-4">
                <div className="font-light text-zinc-500">last synced</div>
                <span className="font-semibold">3 mins ago</span>
              </div>
              <div>
                <span className="px-4 py-2 bg-zinc-200 text-zinc-800 font-bold rounded-lg">
                  Help
                </span>
              </div>
            </div>
          </div>

          {/* <div className="mt-5 w-96 flex flex-row px-2 overflow-x-auto bg-zinc-100 py-2 mx-5 rounded-lg">
            <span className="px-3 py-2.5 bg-black rounded-lg text-white text-xs mr-4 hover:cursor-pointer">
              All
            </span>

            {categories.map((category) => (
              <span
                className="flex items-center px-3 py-2.5 bg-white shadow-md rounded-lg text-xs font-semibold mr-4 hover:cursor-pointer"
                key={category.id}
              >
                <p className="min-w-max">{category.name}</p>
              </span>
            ))}
          </div> */}

          <div className="flex px-4 w-full rounded-lg my-4 gap-5">
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

          <div className="md:m-5 grid grid-cols-2 md:grid-cols-3 bg-zinc-100 p-3 gap-3 px-5 mt-2.5 overflow-y-auto rounded-xl h-[810px]">
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
          </div>
        </div>
        <div className="w-full lg:w-2/5">
          <div className="flex flex-row items-center justify-between px-5 mt-5 gap-3">
            <button className="w-1/3 px-4 py-2 rounded-lg text-sm font-bold bg-neutral-100 hover:bg-neutral-300  text-neutral-700">
              Dine in
            </button>
            <button className="w-1/3 px-4 py-2 rounded-lg text-sm font-bold bg-neutral-100 hover:bg-neutral-300 text-neutral-700">
              Take away
            </button>
            <button className="w-1/3 px-4 py-2 rounded-lg text-sm font-bold bg-neutral-100 hover:bg-neutral-300 text-neutral-700">
              Delivery
            </button>
          </div>
          <div className="flex flex-row items-end justify-between px-5 mt-5 gap-3">
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
              <button className="w-1/2 px-4 py-2 rounded-lg text-sm font-bold bg-neutral-100 text-neutral-500">
                Edit
              </button>
              <button className="w-1/2 px-4 py-2 rounded-lg text-sm font-bold bg-neutral-100 text-neutral-700">
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
          <div className="flex flex-row w-full px-5 mt-5 gap-3">
            <button className="px-4 py-4 w-full rounded-xl shadow-lg text-center bg-red-500 hover:bg-red-600 text-white font-semibold">
              Cancel
            </button>
            <button className="px-4 py-4 w-full rounded-xl shadow-lg text-center bg-black hover:bg-zinc-900 text-white font-semibold">
              Hold
            </button>
            <button className="px-4 py-4 w-full rounded-xl shadow-lg text-center bg-black hover:bg-zinc-900 text-white font-semibold">
              Quick Bill
            </button>
            <button className="px-4 py-4 w-full rounded-xl shadow-lg text-center bg-black hover:bg-zinc-900 text-white font-semibold">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;
