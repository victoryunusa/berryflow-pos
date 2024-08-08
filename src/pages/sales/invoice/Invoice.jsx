import React from "react";
import { Link } from "react-router-dom";

const Invoice = () => {
  return (
    <div className="flex flex-col space-y-12">
      <div className="flex flex-row justify-between items-center">
        <div className="">
          <h3 className="text-lg font-bold text-neutral-700">Invoices</h3>
        </div>
        <Link to="/finance/invoice/add">
          <button className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md">
            Add New
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Invoice;
