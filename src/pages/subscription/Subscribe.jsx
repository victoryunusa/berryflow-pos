import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa6";
import { getSubscriptionPlans } from "../../features/subscription_plan/subscriptionPlanSlice";
import { getDetail, textEllipsis } from "../../functions/functions";
import { getPaymentGateways } from "../../features/payment_gateways/paymentGatewaySlice";
import { getGlobalCurrencies } from "../../features/master_actions/globalCurrencySlice";
import { getModules } from "../../features/master_actions/modulesSlice";

const Subscribe = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedGateway, setSelectedGateway] = useState(null);

  const [currency, setCurrency] = useState(2);
  const [packageType, setPackageType] = useState("monthly");

  const { subscription_plans } = useSelector(
    (state) => state.subscription_plans
  );

  const { gateways } = useSelector((state) => state.gateways);
  const { global_currencies } = useSelector((state) => state.global_currencies);
  const { modules } = useSelector((state) => state.modules);

  console.log(selectedGateway);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptionPlans({ currency, period: packageType }));
  }, [dispatch, currency, packageType]);

  useEffect(() => {
    dispatch(getGlobalCurrencies());
  }, []);

  useEffect(() => {
    dispatch(getModules());
  }, []);

  useEffect(() => {
    dispatch(getPaymentGateways());
  }, []);

  const handleFilterChange = (filter) => {
    setCurrency(filter);
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">
            Billing & Subscription
          </h3>
          <p className="text-xs text-neutral-400">
            Select the plan that you want to subscribe to
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-5">
        <div className="flex flex-row w-1/4 gap-2">
          <button
            type="button"
            onClick={() => {
              setPackageType("monthly");
            }}
            className={`w-1/2 text-xs ${
              packageType == "monthly"
                ? "bg-tt_celestial_blue text-white"
                : "bg-white text-neutral-400"
            } font-bold px-3 py-3 text-center border border-r flex flex-row gap-1 rounded-lg`}
          >
            <span
              className={`flex items-center w-4 h-4 rounded-full p-1 ${
                packageType == "monthly" ? "bg-white" : "bg-neutral-300"
              } `}
            >
              <FaIcons.FaCircle
                size={10}
                className={`${
                  packageType == "monthly"
                    ? "text-tt_celestial_blue"
                    : "text-white"
                }`}
              />
            </span>
            Monthly
          </button>
          <button
            type="button"
            onClick={() => {
              setPackageType("annual");
            }}
            className={`w-1/2 text-xs ${
              packageType == "annual"
                ? "bg-tt_celestial_blue text-white"
                : "bg-white text-neutral-400"
            } font-bold px-3 py-3 text-center border flex flex-row gap-1 rounded-lg`}
          >
            <span
              className={`flex items-center w-4 h-4 rounded-full p-1 ${
                packageType == "annual" ? "bg-white" : "bg-neutral-300"
              } `}
            >
              <FaIcons.FaCircle
                size={10}
                className={`${
                  packageType == "annual"
                    ? "text-tt_celestial_blue"
                    : "text-white"
                }`}
              />
            </span>
            Annual
          </button>
        </div>
        <select
          className={`w-1/5 px-3 py-2.5 border border-neutral-300 text-neutral-600 text-small rounded-lg focus:outline-none`}
          onChange={(e) => handleFilterChange(e.target.value)}
          value={currency}
        >
          {global_currencies?.map((currency, index) => (
            <option key={index} value={currency.id}>
              {currency.currency_name} ({currency.currency_symbol})
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-row items-start gap-3 bg-zinc-100 ">
        {/* <div className="flex flex-col bg-white shadow-md border rounded-lg cursor-pointer p-2 w-1/4">
          <div className=" w-full">
            <p className="text-sm md:text-md font-semibold text-neutral-700">
              Pick Your Plan
            </p>
            <span>
              <p className="text-xs"></p>
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {modules?.map((module, index) => (
              <div key={index}>{module.name}</div>
            ))}
          </div>
        </div> */}
        {subscription_plans?.map((plan, index) => (
          <div
            key={index}
            className="flex flex-col bg-white border rounded-lg cursor-pointer p-4 w-1/4"
          >
            <div className="flex flex-col gap-1.5 rounded">
              <div className=" w-full">
                <p className="text-sm md:text-md font-semibold text-neutral-700">
                  {textEllipsis(plan.package_name, 20)}
                </p>
                <span>
                  <p className="text-xs"></p>
                </span>
              </div>
              <div className="flex flex-row">
                <span className="self-end font-bold text-base md:text-md text-tt_rich_black">
                  {plan.currency.currency_symbol}
                  {parseFloat(plan.price).toFixed(2)}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h4 className="text-base font-semibold">Features</h4>
                <ul className="flex flex-col gap-1 text-xs">
                  <li>
                    {getDetail(plan?.metadata, "branch_limit") == "-1"
                      ? "Unlimited"
                      : getDetail(plan?.metadata, "branch_limit")}{" "}
                    Branch(es)
                  </li>
                  <li>
                    {" "}
                    {getDetail(plan?.metadata, "users_limit") == "-1"
                      ? "Unlimited"
                      : getDetail(plan?.metadata, "users_limit")}{" "}
                    Users
                  </li>
                  <li>
                    {getDetail(plan?.metadata, "invoice_limit") == "-1"
                      ? "Unlimited"
                      : getDetail(plan?.metadata, "invoice_limit")}{" "}
                    Invoices
                  </li>
                  <li>
                    {getDetail(plan?.metadata, "purchase_order_limit") == "-1"
                      ? "Unlimited"
                      : getDetail(plan?.metadata, "purchase_order_limit")}{" "}
                    Purchase Orders
                  </li>
                  <li>
                    {getDetail(plan?.metadata, "products_limit") == "-1"
                      ? "Unlimited"
                      : getDetail(plan?.metadata, "products_limit")}{" "}
                    Products
                  </li>
                  <li>
                    {getDetail(plan?.metadata, "ingredients_limit") == "-1"
                      ? "Unlimited"
                      : getDetail(plan?.metadata, "ingredients_limit")}{" "}
                    Ingredients
                  </li>
                  <li>
                    {getDetail(plan?.metadata, "bulksms_limit") == "-1"
                      ? "Unlimited"
                      : getDetail(plan?.metadata, "bulksms_limit")}{" "}
                    SMS
                  </li>
                  <li>
                    {getDetail(plan?.metadata, "bulkemail_limit") == "-1"
                      ? "Unlimited"
                      : getDetail(plan?.metadata, "bulkemail_limit")}{" "}
                    Email
                  </li>
                </ul>
              </div>
              <div className="w-full flex flex-row gap-2">
                <button className="p-2 flex items-center justify-center text-white rounded-md bg-tt_rich_black hover:bg-tt_rich_black/90 w-full">
                  <span className="text-sm font-semibold">View</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscribe;
