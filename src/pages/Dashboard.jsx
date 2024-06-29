import { useSelector } from "react-redux";
import * as HeIcons from "react-icons/fa6";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  const { countries } = useSelector((state) => state.countries);
  const { branches } = useSelector((state) => state.branches);

  const activeBranch = branches?.find(
    (branch) => branch.id === user?.branch_id
  );

  const currency = countries?.find(
    (country) => country.id === activeBranch?.currency_id
  );

  return (
    <div className="flex flex-col space-y-12">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row w-full md:w-[20rem] bg-gray-200 p-2.5 gap-5 rounded-lg">
          <button className="bg-white px-3 py-2 rounded-lg cursor-pointer">
            <h3 className="text-sm font-semibold text-gray-700">General</h3>
          </button>
          <button className="p-2 rounded-lg cursor-pointer">
            <h3 className="text-sm font-semibold text-gray-500">Branches</h3>
          </button>
          <button className=" p-2 rounded-lg cursor-pointer">
            <h3 className="text-sm font-semibold text-gray-500">Inventory</h3>
          </button>
        </div>
        <div className="flex md:flex-row flex-col gap-5 mt-2">
          {/* <div className="md:w-2/5 w-full p-5 rounded-xl bg-nelsa_primary ">
            <div className="flex flex-row justify-between items-center">
              <div className="w-full">
                <span className="flex flex-row justify-between">
                  <p className="text-md font-semibold text-gray-300">
                    Wallet Balance
                  </p>
                  <button className="text-gray-400 flex flex-row text-xs items-center gap-2">
                    Refresh Balance
                    <HeIcons.FaArrowRotateLeft size={15} className="" />
                  </button>
                </span>

                <h1 className="text-4xl text-gray-50 font-extrabold mt-5">
                  {currency?.currency_symbol}200,000,000.00
                </h1>
                <p className="text-sm font-semibold text-gray-200">
                  2042014888 - Bank Corp MFB
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between mt-5 space-x-5">
              <button className="bg-white flex flex-row items-center justify-center gap-1 text-gray-700 font-bold px-2 py-3 w-1/2 rounded-lg">
                <span>
                  <TbIcons.TbCircleArrowDownRight size={25} />
                </span>
                Add Money
              </button>
              <button className="bg-white flex flex-row items-center justify-center gap-1 text-gray-700 font-bold px-2 py-3 w-1/2 rounded-lg">
                <span>
                  <TbIcons.TbCircleArrowUpRight size={25} className="" />
                </span>
                Withdraw
              </button>
            </div>
          </div> */}
          <div className="w-full md:w-1/4 p-4 rounded-lg border-[0.09rem] border-gray-200  bg-white flex flex-col gap-2 justify-between">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-3">
                <span className="w-10 h-10 bg-nelsa_primary/15 text-nelsa_primary rounded-md p-3">
                  <HeIcons.FaWallet />
                </span>
                <p className="text-sm antialiased">Total Revenue</p>
              </div>
              <div>
                <span>
                  <HeIcons.FaEllipsisVertical />
                </span>
              </div>
            </div>
            <div className="">
              <h2 className="font-normal text-3xl text-gray-800">
                {currency?.currency_symbol}300,000,000.00
              </h2>
              <span>
                <p className="text-xs antialiased">0% change from last month</p>
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-4 rounded-lg border-[0.09rem] border-gray-200  bg-white flex flex-col gap-2 justify-between">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-3">
                <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-md p-3">
                  <HeIcons.FaBookmark />
                </span>
                <p className="text-sm antialiased">Total Order</p>
              </div>
              <div>
                <span>
                  <HeIcons.FaEllipsisVertical />
                </span>
              </div>
            </div>
            <div className="">
              <h2 className="font-normal text-3xl text-gray-800">0</h2>
              <span>
                <p className="text-xs">0% change from last month</p>
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-4 rounded-lg border-[0.09rem] border-gray-200  bg-white flex flex-col gap-2 justify-between">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-3">
                <span className="w-10 h-10 bg-blue-50 text-blue-600 rounded-md p-3">
                  <HeIcons.FaChartPie />
                </span>
                <p className="text-sm antialiased">Average Sale</p>
              </div>
              <div>
                <span>
                  <HeIcons.FaEllipsisVertical />
                </span>
              </div>
            </div>
            <div className="">
              <h2 className="font-normal text-3xl text-gray-800">
                {currency?.currency_symbol}0.00
              </h2>
              <span>
                <p className="text-xs">0% change from last month</p>
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/4 p-4 rounded-lg border-[0.09rem] border-gray-200  bg-white flex flex-col gap-2 justify-between">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-3">
                <span className="w-10 h-10 bg-green-100 text-green-600 rounded-md p-3">
                  <HeIcons.FaAward />
                </span>
                <p className="text-sm antialiased">Total Discount</p>
              </div>
              <div>
                <span>
                  <HeIcons.FaEllipsisVertical />
                </span>
              </div>
            </div>
            <div className="">
              <h2 className="font-normal text-3xl text-gray-800">
                {currency?.currency_symbol}0.00
              </h2>
              <span>
                <p className="text-xs">0% change from last month</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex md:flex-row flex-col gap-5">
          <div className="md:w-2/3 w-full p-4 rounded-lg border bg-white flex flex-row justify-between">
            <div className="w-full">
              <span className="flex flex-row justify-between items-center">
                <p className="text-sm text-gray-900 font-semibold">
                  Sales Overview
                </p>
                <HeIcons.FaEllipsisVertical />
              </span>
            </div>
          </div>

          <div className="md:w-1/3 w-full p-4 rounded-lg border bg-white flex flex-row justify-between">
            <div className="w-full">
              <span className="flex flex-row justify-between items-center">
                <p className="text-sm text-gray-900 font-semibold">Payment</p>
                <HeIcons.FaEllipsisVertical />
              </span>
            </div>
          </div>
        </div>
        {/* <div className="card">
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
        <div className="card md:p-10 p-4 bg-white rounded-lg">
          <Chart type="bar" data={chartData} options={chartOptions} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
