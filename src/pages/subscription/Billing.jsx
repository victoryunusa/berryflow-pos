import React from "react";
import { Link } from "react-router-dom";

const Billing = () => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">
            Billing & Subscription
          </h3>
          <p className="text-xs text-neutral-400">
            View & manage your billing history
          </p>
        </div>
      </div>
      <div className="flex flex-row bg-white p-5 rounded-lg justify-between">
        <div className="flex flex-col justify-between gap-6">
          <div>
            <p className="text-sm text-neutral-500">Plan Details</p>
            <h4 className="text-lg text-nelsa_primary font-bold">
              Trial period
            </h4>
          </div>
          <div>
            <p className="text-sm text-neutral-500">Expires On</p>
            <h4 className="text-lg text-nelsa_primary font-semibold">
              2024-09-25 21:27:20
            </h4>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <Link
            to="subscription"
            className="px-3 py-2.5 bg-nelsa_primary hover:bg-neutral-700 text-white text-sm rounded-md font-semibold"
          >
            Subscribe to plan
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Billing;
