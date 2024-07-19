import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AddBillingCounter from "../../../components/modals/AddBillingCounter";
import { getBillCounters } from "../../../features/bill_counter/billCounterSlice";

const actionBodyTemplate = (rowData) => {
  return (
    <div className="flex flex-row space-x-3">
      <button className="bg-blue-600 px-2 py-1 text-xs text-white rounded-md">
        Edit
      </button>
      <button className="bg-red-600 px-2 py-1 text-xs text-white rounded-md">
        Delete
      </button>
    </div>
  );
};

const BillCounters = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openAdd, setOpenAdd] = useState(false);

  const { bill_counters } = useSelector((state) => state.bill_counters);

  useEffect(() => {
    dispatch(getBillCounters());
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">
              Billing Counters
            </h3>
          </div>
          <div>
            <button
              className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md"
              onClick={() => setOpenAdd(true)}
            >
              Add New
            </button>
          </div>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs">
          <div className="flex flex-col overflow-x-auto">
            <div className="">
              <div className="inline-block w-full py-2 sm:px-2 lg:px-4">
                <div className="overflow-x-auto rounded-md">
                  <table className="w-full text-sm text-left rtl:text-right text-neutral-500 rounded">
                    <thead className="text-md text-neutral-700 capitalize bg-neutral-200 border-b">
                      <tr>
                        <th scope="col" className="p-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 bg-neutral-100 border-neutral-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label className="sr-only">checkbox</label>
                          </div>
                        </th>
                        <th className="px-2 py-4">Counter Code</th>
                        <th className="px-2 py-4">Counter Name</th>
                        <th className="px-2 py-4">Status</th>
                        <th className="px-2 py-4">Created On</th>
                        <th className="px-2 py-4">Created By</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {bill_counters?.map((bill_counter, index) => (
                        <tr
                          className="odd:bg-white even:bg-neutral-50 border-b font-medium text-sm cursor-pointer hover:bg-neutral-100"
                          key={index}
                          onClick={() => showProduct(product.slug)}
                        >
                          <td className="w-4 p-4">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 bg-neutral-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label className="sr-only">checkbox</label>
                            </div>
                          </td>
                          <td className="px-2 py-4 font-bold">
                            {bill_counter.billing_counter_code}
                          </td>
                          <td className="px-2 py-4">
                            {bill_counter.counter_name}
                          </td>
                          <td className="px-2 py-4">{bill_counter.status}</td>
                          <td className=" whitespace-nowrap px-2 py-4">
                            {bill_counter.created_at}
                          </td>
                          <td className="px-2 py-4">
                            {bill_counter.created_by}
                          </td>

                          <td className="">
                            <button className="underline px-2 py-1 text-xs text-cyan-500  rounded-md">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="w-full "></tfoot>
                  </table>
                </div>

                {/* <div className="flex flex-row gap-2 justify-between mt-5">
                  <div>
                    <p>{`Showing  ${products.from} to ${products.to} of ${products.total} entries`}</p>
                  </div>
                  <div className="flex flex-row gap-2 ">
                    {products?.links?.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => getNextProduct(link.url.slice(-7))}
                        className={`${
                          link.active
                            ? "bg-nelsa_primary text-white"
                            : "border text-nelsa_primary"
                        } px-2 py-1 rounded-md`}
                        disabled={link.url == null ? true : false}
                      >
                        {link.label == "&laquo; Previous"
                          ? "<"
                          : link.label
                          ? link.label == "Next &raquo;"
                            ? ">"
                            : link.label
                          : ""}
                      </button>
                    ))}
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {openAdd && <AddBillingCounter open={openAdd} setOpenAdd={setOpenAdd} />}
    </>
  );
};

export default BillCounters;
