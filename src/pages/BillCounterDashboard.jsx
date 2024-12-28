import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBillingCounterStats } from "../features/business_register/billingCounterStatSlice";

const BillCounterDashboard = () => {
  const dispatch = useDispatch();

  const { billing_counter_stats } = useSelector(
    (state) => state.billing_counter_stats
  );

  useEffect(() => {
    dispatch(getBillingCounterStats());
  }, []);

  return (
    <div className="flex flex-col space-y-5">
      <div className="">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">
            Billing Counter Dashboard
          </h3>
          <p className="text-xs text-neutral-400">
            Select the plan that you want to subscribe to
          </p>
        </div>
      </div>
      <div className="flex flex-row w-full gap-5">
        {billing_counter_stats?.map((register, index) => (
          <div
            className="flex flex-col w-full md:w-1/4 bg-white border rounded-md p-5"
            key={index}
          >
            <div className="flex flex-row justify-between">
              <h2 className="text-md text-gray-700 font-bold">
                {register.bill_counter_code} - {register.counter_name}
              </h2>
              {register.business_register != null ? (
                <span className="flex items-center bg-green-100 rounded text-xs font-semibold text-green-600 px-2 text-center">
                  <p>Open</p>
                </span>
              ) : (
                <span className="flex items-center bg-red-100 rounded text-xs font-semibold text-red-600 px-2 text-center">
                  <p>Closed</p>
                </span>
              )}
            </div>
            <div className="flex flex-row justify-between border-t border-b mt-5 mb-5 py-2">
              <span className="flex flex-col gap-3  ">
                <p>Total Orders</p>
                <h4>
                  {register.order_data.order_count != null
                    ? register.order_data.order_count
                    : 0}
                </h4>
              </span>
              <span className="flex flex-col gap-3  text-end">
                <p>Order Value</p>
                <h4>
                  NGN{" "}
                  {register.order_data.order_value != null
                    ? register.order_data.order_value
                    : 0}
                </h4>
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-row justify-between">
                <span className="w-2/4 text-xs">Payment Method</span>
                <span className="w-1/4 text-xs">No of Orders</span>
                <span className="w-1/4 text-xs text-end">Order Value</span>
              </div>
              {register.payment_method_data.map((payment_method, index) => (
                <div className="flex flex-row justify-between" key={index}>
                  <span className="w-2/4 text-xs">
                    {payment_method.payment_method}
                  </span>
                  <span className="w-1/4 text-xs">
                    {payment_method.order_count != null
                      ? payment_method.order_count
                      : 0}
                  </span>
                  <span className="w-1/4 text-xs text-end">
                    NGN{" "}
                    {payment_method.value != null ? payment_method.value : 0}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-between border-t mt-5 py-2">
              <span className="flex flex-col gap-3  text-sm">
                <p>Recently Opened On</p>
                <h4 className="text-xs">
                  {register.business_register != null
                    ? register.business_register.opening_date
                    : " - "}
                </h4>
              </span>
              <span className="flex flex-col gap-3  text-end text-sm">
                <p>Opened By</p>
                <h4 className="text-xs">
                  {register.business_register != null
                    ? register.business_register.user.full_name
                    : " - "}
                </h4>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillCounterDashboard;
