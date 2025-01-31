import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubscriptionPlans } from "../../features/subscription_plan/subscriptionPlanSlice";
import { getDetail } from "../../functions/functions";
import { getPaymentGateways } from "../../features/payment_gateways/paymentGatewaySlice";

const Subscribe = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedGateway, setSelectedGateway] = useState(null);

  const { subscription_plans } = useSelector(
    (state) => state.subscription_plans
  );

  const { gateways } = useSelector((state) => state.gateways);

  console.log(selectedGateway);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSubscriptionPlans());
  }, []);

  useEffect(() => {
    dispatch(getPaymentGateways());
  }, []);

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
      <div className="flex flex-col md:flex-row place-items-start justify-between gap-5">
        <div className="flex w-full md:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-zinc-100 w-full">
            {subscription_plans?.map((plan, index) => (
              <div
                className="flex flex-row rounded-lg w-full justify-between h-80"
                onClick={() => {
                  setSelectedPlan(plan);
                }}
                key={index}
              >
                <label
                  className={`flex flex-row justify-between w-full gap-3 p-5 text-neutral-600 border hover:border-tt_rich_black hover:bg-orange-50 ${
                    selectedPlan?.slug == plan.slug
                      ? "border-tt_rich_black bg-orange-50"
                      : "bg-white"
                  } rounded-md hover:cursor-pointer`}
                >
                  <div className="flex flex-col gap-5">
                    <div className="">
                      <h4 className="w-full text-base">{plan.name}</h4>
                      <h4 className="w-full text-xl font-bold">{plan.price}</h4>
                      <p>Per {plan.period == "monthly" ? "month" : "year"}</p>
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
                          {getDetail(plan?.metadata, "purchase_order_limit") ==
                          "-1"
                            ? "Unlimited"
                            : getDetail(
                                plan?.metadata,
                                "purchase_order_limit"
                              )}{" "}
                          Purchase Orders
                        </li>
                        <li>
                          {getDetail(plan?.metadata, "products_limit") == "-1"
                            ? "Unlimited"
                            : getDetail(plan?.metadata, "products_limit")}{" "}
                          Products
                        </li>
                        <li>
                          {getDetail(plan?.metadata, "ingredients_limit") ==
                          "-1"
                            ? "Unlimited"
                            : getDetail(
                                plan?.metadata,
                                "ingredients_limit"
                              )}{" "}
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
                  </div>
                  <span>
                    <input
                      className={`relative peer shrink-0
                                 appearance-none w-7 h-7 border  rounded bg-white
                                 mt-1
                                  ${
                                    selectedPlan?.slug == plan.slug
                                      ? "checked:bg-tt_rich_black checked:border-0 border-tt_rich_black "
                                      : ""
                                  }`}
                      type="radio"
                    />
                    <svg
                      className="
           absolute 
           w-4 h-4 -mt-7 ml-1.5
           hidden peer-checked:block text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-full  md:w-1/3 bg-white gap-3 p-5 rounded-md ">
          <h4 className="font-semibold">Summary</h4>
          {selectedPlan ? (
            <div className="flex flex-col w-full gap-2">
              <div className="flex flex-row justify-between">
                <span className="">
                  <p className="text-sm mb-1">{selectedPlan.name}</p>
                  <span className="text-center bg-neutral-100 text-neutral-600 text-xs font-semibold capitalize px-2 py-1 rounded">
                    {selectedPlan.period}
                  </span>
                </span>
                <span>{selectedPlan.price}</span>
              </div>
              <hr />
              <div className="flex flex-row justify-between">
                <span>
                  <p className="text-sm mb-1">Gross Total</p>
                </span>
                <span>{selectedPlan.price}</span>
              </div>
              <div className="flex flex-row justify-between mt-3">
                <span>
                  <p className="text-xl font-bold">Total</p>
                </span>
                <span className="text-xl font-bold">{selectedPlan.price}</span>
              </div>
              <hr />
              <div className="flex flex-col gap-2">
                <h4>Pay via</h4>
                {gateways?.map((gateway, index) => (
                  <div
                    key={index}
                    className={`flex flex-row gap-2 cursor-pointer`}
                    onClick={() => {
                      setSelectedGateway(gateway.name);
                    }}
                  >
                    <span
                      className={`relative
                                  w-5 h-5 border rounded 
                                 mt-1
                                  ${
                                    selectedGateway == "Paystack"
                                      ? "bg-tt_rich_black border-0 border-tt_rich_black "
                                      : "bg-white"
                                  }`}
                    >
                      <svg
                        className="
           absolute 
           w-4 h-4 mt-0.5 ml-0.5
           text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </span>
                    <span>
                      <p>{gateway.name}</p>
                    </span>
                  </div>
                ))}
              </div>
              <button
                disabled={selectedGateway ? false : true}
                className={`px-2 py-2.5 rounded-md mt-4 ${
                  selectedGateway
                    ? "bg-tt_rich_black text-white"
                    : "bg-neutral-200 text-neutral-400"
                }`}
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="flex border border-dashed rounded h-32  justify-center items-center">
              <p className="text-sm">Select plan to continue</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
