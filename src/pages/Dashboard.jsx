import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import { useDispatch, useSelector } from "react-redux";
import * as HeIcons from "react-icons/fa6";
import * as TbIcons from "react-icons/tb";
import { Outlet, NavLink, Link, useNavigate, Navigate } from "react-router-dom";
import { alertActions } from "../app/store";
import { reset } from "../features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.user
  );

  const { countries } = useSelector((state) => state.countries);
  const { branches } = useSelector((state) => state.branches);

  const activeBranch = branches?.find(
    (branch) => branch.id === user?.branch_id
  );

  const currency = countries?.find(
    (country) => country.id === activeBranch?.currency_id
  );

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const data = {
      labels: ["Q1", "Q2", "Q3", "Q4"],
      datasets: [
        {
          label: "Sales",
          data: [540, 325, 702, 620],
          backgroundColor: [
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgb(255, 159, 64)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
          ],
          borderWidth: 1,
        },
      ],
    };
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <div className="flex flex-col space-y-12">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row w-[30rem] bg-gray-200 p-2.5 gap-5 rounded-lg">
          <button className="bg-white px-3 py-2 rounded-lg cursor-pointer">
            <h3 className="text-sm font-semibold text-gray-700">Overview</h3>
          </button>
          <button className="p-2 rounded-lg cursor-pointer">
            <h3 className="text-sm font-semibold text-gray-500">
              Cashflow Report
            </h3>
          </button>
          <button className=" p-2 rounded-lg cursor-pointer">
            <h3 className="text-sm font-semibold text-gray-500">
              Customers Report
            </h3>
          </button>
        </div>
        <div className="flex md:flex-row flex-col gap-10 mt-4">
          <div className="md:w-2/5 w-full p-5 rounded-xl bg-nelsa_primary ">
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
          </div>
          <div className=" w-3/5 p-4 rounded-xl border-[0.1rem] border-gray-100  bg-white flex flex-row justify-between space-x-1 items-center"></div>
        </div>
      </div>
      <div className="">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Other Statistics</h3>
        </div>
        <div className="flex md:flex-row flex-col gap-5 mt-4">
          <div className="md:w-2/4 w-full p-4 rounded-xl border-[0.1rem] border-gray-100  bg-white flex flex-row justify-between space-x-1 items-center">
            <span className=" px-5">
              <p className="text-sm text-gray-400">Total Sales</p>
              <h1 className="text-2xl text-gray-700 font-bold mt-1">{200}</h1>
            </span>
            <span className="bg-white border border-zinc-100 rounded-lg flex items-center w-10 h-10 justify-center">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.0002 10.9692V13.0292C22.0002 13.5792 21.5602 14.0292 21.0002 14.0492H19.0402C17.9602 14.0492 16.9702 13.2592 16.8802 12.1792C16.8202 11.5492 17.0602 10.9592 17.4802 10.5492C17.8502 10.1692 18.3602 9.94922 18.9202 9.94922H21.0002C21.5602 9.96922 22.0002 10.4192 22.0002 10.9692Z"
                  fill="#1A5AFF"
                />
                <path
                  d="M20.47 15.55H19.04C17.14 15.55 15.54 14.12 15.38 12.3C15.29 11.26 15.67 10.22 16.43 9.48C17.07 8.82 17.96 8.45 18.92 8.45H20.47C20.76 8.45 21 8.21 20.97 7.92C20.75 5.49 19.14 3.83 16.75 3.55C16.51 3.51 16.26 3.5 16 3.5H7C6.72 3.5 6.45 3.52 6.19 3.56C3.64 3.88 2 5.78 2 8.5V15.5C2 18.26 4.24 20.5 7 20.5H16C18.8 20.5 20.73 18.75 20.97 16.08C21 15.79 20.76 15.55 20.47 15.55ZM13 9.75H7C6.59 9.75 6.25 9.41 6.25 9C6.25 8.59 6.59 8.25 7 8.25H13C13.41 8.25 13.75 8.59 13.75 9C13.75 9.41 13.41 9.75 13 9.75Z"
                  fill="#1A5AFF"
                />
              </svg>
            </span>
          </div>
          <div className="md:w-1/4 w-full p-4 rounded-xl border-[0.1rem] border-gray-100  bg-white flex flex-row justify-between space-x-1 items-center">
            <span className=" px-5">
              <p className="text-sm text-gray-400">Total POS Sale Value</p>
              <h1 className="text-2xl text-gray-700 font-bold mt-1">20,000</h1>
            </span>
            <span className="bg-white border border-zinc-100 rounded-lg flex items-center w-10 h-10 justify-center">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.0002 10.9692V13.0292C22.0002 13.5792 21.5602 14.0292 21.0002 14.0492H19.0402C17.9602 14.0492 16.9702 13.2592 16.8802 12.1792C16.8202 11.5492 17.0602 10.9592 17.4802 10.5492C17.8502 10.1692 18.3602 9.94922 18.9202 9.94922H21.0002C21.5602 9.96922 22.0002 10.4192 22.0002 10.9692Z"
                  fill="#1A5AFF"
                />
                <path
                  d="M20.47 15.55H19.04C17.14 15.55 15.54 14.12 15.38 12.3C15.29 11.26 15.67 10.22 16.43 9.48C17.07 8.82 17.96 8.45 18.92 8.45H20.47C20.76 8.45 21 8.21 20.97 7.92C20.75 5.49 19.14 3.83 16.75 3.55C16.51 3.51 16.26 3.5 16 3.5H7C6.72 3.5 6.45 3.52 6.19 3.56C3.64 3.88 2 5.78 2 8.5V15.5C2 18.26 4.24 20.5 7 20.5H16C18.8 20.5 20.73 18.75 20.97 16.08C21 15.79 20.76 15.55 20.47 15.55ZM13 9.75H7C6.59 9.75 6.25 9.41 6.25 9C6.25 8.59 6.59 8.25 7 8.25H13C13.41 8.25 13.75 8.59 13.75 9C13.75 9.41 13.41 9.75 13 9.75Z"
                  fill="#1A5AFF"
                />
              </svg>
            </span>
          </div>
          <div className="md:w-1/4 w-full p-4 rounded-xl border-[0.1rem] border-gray-100  bg-white flex flex-row justify-between space-x-1 items-center">
            <span className=" px-5">
              <p className="text-sm text-gray-400">Total Revenue</p>
              <h1 className="text-2xl text-gray-700 font-bold mt-1">20,000</h1>
            </span>
            <span className="bg-white border border-zinc-100 rounded-lg flex items-center w-10 h-10 justify-center">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.0002 10.9692V13.0292C22.0002 13.5792 21.5602 14.0292 21.0002 14.0492H19.0402C17.9602 14.0492 16.9702 13.2592 16.8802 12.1792C16.8202 11.5492 17.0602 10.9592 17.4802 10.5492C17.8502 10.1692 18.3602 9.94922 18.9202 9.94922H21.0002C21.5602 9.96922 22.0002 10.4192 22.0002 10.9692Z"
                  fill="#1A5AFF"
                />
                <path
                  d="M20.47 15.55H19.04C17.14 15.55 15.54 14.12 15.38 12.3C15.29 11.26 15.67 10.22 16.43 9.48C17.07 8.82 17.96 8.45 18.92 8.45H20.47C20.76 8.45 21 8.21 20.97 7.92C20.75 5.49 19.14 3.83 16.75 3.55C16.51 3.51 16.26 3.5 16 3.5H7C6.72 3.5 6.45 3.52 6.19 3.56C3.64 3.88 2 5.78 2 8.5V15.5C2 18.26 4.24 20.5 7 20.5H16C18.8 20.5 20.73 18.75 20.97 16.08C21 15.79 20.76 15.55 20.47 15.55ZM13 9.75H7C6.59 9.75 6.25 9.41 6.25 9C6.25 8.59 6.59 8.25 7 8.25H13C13.41 8.25 13.75 8.59 13.75 9C13.75 9.41 13.41 9.75 13 9.75Z"
                  fill="#1A5AFF"
                />
              </svg>
            </span>
          </div>
          <div className="md:w-1/4 w-full p-4 rounded-xl border-[0.1rem] border-gray-100  bg-white flex flex-row justify-between space-x-1 items-center">
            <span className=" px-5">
              <p className="text-sm text-gray-400">Net Profit</p>
              <h1 className="text-2xl text-gray-700 font-bold mt-1">20,000</h1>
            </span>
            <span className="bg-white border border-zinc-100 rounded-lg flex items-center w-10 h-10 justify-center">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.0002 10.9692V13.0292C22.0002 13.5792 21.5602 14.0292 21.0002 14.0492H19.0402C17.9602 14.0492 16.9702 13.2592 16.8802 12.1792C16.8202 11.5492 17.0602 10.9592 17.4802 10.5492C17.8502 10.1692 18.3602 9.94922 18.9202 9.94922H21.0002C21.5602 9.96922 22.0002 10.4192 22.0002 10.9692Z"
                  fill="#1A5AFF"
                />
                <path
                  d="M20.47 15.55H19.04C17.14 15.55 15.54 14.12 15.38 12.3C15.29 11.26 15.67 10.22 16.43 9.48C17.07 8.82 17.96 8.45 18.92 8.45H20.47C20.76 8.45 21 8.21 20.97 7.92C20.75 5.49 19.14 3.83 16.75 3.55C16.51 3.51 16.26 3.5 16 3.5H7C6.72 3.5 6.45 3.52 6.19 3.56C3.64 3.88 2 5.78 2 8.5V15.5C2 18.26 4.24 20.5 7 20.5H16C18.8 20.5 20.73 18.75 20.97 16.08C21 15.79 20.76 15.55 20.47 15.55ZM13 9.75H7C6.59 9.75 6.25 9.41 6.25 9C6.25 8.59 6.59 8.25 7 8.25H13C13.41 8.25 13.75 8.59 13.75 9C13.75 9.41 13.41 9.75 13 9.75Z"
                  fill="#1A5AFF"
                />
              </svg>
            </span>
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
