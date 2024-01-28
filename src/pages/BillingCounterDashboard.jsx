const BillingCounterDashboard = () => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">
            Billing Counter Dashboard
          </h3>
        </div>
      </div>
      <div className="flex flex-row w-full">
        <div className="flex flex-col w-full md:w-1/3 bg-white border rounded-md p-5">
          <div className="flex flex-row justify-between">
            <h2 className="text-md text-gray-700 font-bold">
              B0001 - Counter Name
            </h2>
            <span className="flex items-center bg-green-100 rounded text-xs font-semibold text-green-600 px-2 text-center">
              <p>Open</p>
            </span>
          </div>
          <div className="flex flex-row justify-between border-t border-b mt-5 mb-5 py-2">
            <span className="flex flex-col gap-3  ">
              <p>Total Orders</p>
              <h4>0</h4>
            </span>
            <span className="flex flex-col gap-3  text-end">
              <p>Order Value</p>
              <h4>NGN0</h4>
            </span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between">
              <span className="w-2/4 text-xs">Payment Method</span>
              <span className="w-1/4 text-xs">No of Orders</span>
              <span className="w-1/4 text-xs text-end">Order Value</span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="w-2/4 text-xs">CASH</span>
              <span className="w-1/4 text-xs">0</span>
              <span className="w-1/4 text-xs text-end">NGN 0</span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="w-2/4 text-xs">BERRY PAY</span>
              <span className="w-1/4 text-xs">0</span>
              <span className="w-1/4 text-xs text-end">NGN 0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingCounterDashboard;
