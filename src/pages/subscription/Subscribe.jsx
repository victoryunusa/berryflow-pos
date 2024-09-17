import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSubscriptionPlans } from "../../features/subscription_plan/subscriptionPlanSlice";
import { getDetail } from "../../functions/functions";
import { getPaymentGateways } from "../../features/payment_gateways/paymentGatewaySlice";

const Subscribe = () => {
  const { subscription_plans } = useSelector(
    (state) => state.subscription_plans
  );

  const { gateways } = useSelector((state) => state.gateways);

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
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="flex w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-zinc-100 w-full">
            {subscription_plans?.map((plan, index) => (
              <div
                className="flex flex-row rounded-lg w-full justify-between h-80"
                key={index}
              >
                <label className="flex flex-row justify-between w-full gap-3 p-5 text-neutral-600 border hover:border-green-400 hover:bg-green-50 rounded-md hover:cursor-pointer">
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
                      className="relative peer shrink-0
                                 appearance-none w-4 h-4 border border-green-500 rounded bg-white
                                 mt-1
                                 checked:bg-green-600 checked:border-0"
                      type="radio"
                    />
                    <svg
                      className="
           absolute 
           w-2 h-2 mt-1 ml-1
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
        <div className="flex flex-col w-1/3 bg-white gap-3 p-5 rounded-md ">
          <h4>Summary</h4>
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-row justify-between">
              <span>
                <p>Full Package</p>
                <span>Monthly</span>
              </span>
              <span>50</span>
            </div>
            <hr />
            <div className="flex flex-row justify-between">
              <span>
                <p>Gross Total</p>
              </span>
              <span>50</span>
            </div>
            <div className="flex flex-row justify-between">
              <span>
                <p className="text-xl font-bold">Total</p>
              </span>
              <span className="text-xl font-bold">50</span>
            </div>
            <hr />
            <div>
              <h4>Pay via</h4>
              <div>
                {gateways?.map((gateway, index) => (
                  <span key={index}>{gateway.name}</span>
                ))}
              </div>
            </div>
            <button className="px-2 py-2.5 rounded-md bg-nelsa_primary text-white mt-4">
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
