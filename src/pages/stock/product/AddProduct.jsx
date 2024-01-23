import React from "react";
import { Link } from "react-router-dom";

const AddProduct = () => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="">
        <div className="flex flex-row gap-2 items-center">
          <Link
            to="/menu/products"
            className="text-lg font-bold text-gray-500 "
          >
            Products
          </Link>
          {"/"}
          <h3 className="text-lg font-bold text-gray-700">Add</h3>
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg text-xs"></div>
    </div>
  );
};

export default AddProduct;
