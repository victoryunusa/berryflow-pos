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
        <div className="flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-0">
            <p className="text-sm text-neutral-500 font-semibold">
              Plan Details
            </p>
            <h4 className="text-lg text-tt_rich_black font-bold">
              Trial period
            </h4>
          </div>
          <div>
            <p className="text-sm text-neutral-500 font-semibold">Expires On</p>
            <h4 className="text-base text-tt_rich_black font-semibold">
              2024-09-25 21:27:20
            </h4>
          </div>
        </div>
        <div className="flex flex-col justify-end">
          <Link
            to="subscription"
            className="px-3 py-2.5 bg-tt_rich_black hover:bg-neutral-700 text-white text-xs rounded-md font-semibold"
          >
            Subscribe to plan
          </Link>
        </div>
      </div>
      <div className="">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Invoices</h3>
          <p className="text-xs text-neutral-400">
            You can view your invoices and past billing details here
          </p>
        </div>
      </div>
      <div className="bg-white border p-5 rounded-lg text-xs w-full">
        <div className="flex flex-col overflow-x-auto">
          <div className="">
            <div className="inline-block w-full py-2 sm:px-2 lg:px-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-neutral-500 rounded">
                  <thead className="text-md text-neutral-700 capitalize bg-neutral-100 border-b">
                    <tr>
                      <th className="px-2 py-3">Date</th>
                      <th className="px-2 py-3">Description</th>
                      <th className="px-2 py-3">Amount</th>
                      <th className="px-2 py-3">Next Billing Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  {/* <tbody>
                      {customers?.data?.map((customer, index) => (
                        <tr
                          className="bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50"
                          key={index}
                        >
                          <td className="px-2 py-3 font-semibold">
                            {customer.name}
                          </td>
                          <td className="px-2 py-3">
                            {customer.email ? customer.email : "--"}
                          </td>
                          <td className="px-2 py-3">
                            {customer.phone ? customer.phone : "--"}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {customer.loyalty_point}
                          </td>
                          <td className="px-2 py-3">
                            {customer?.status_data
                              ? customer?.status_data.label
                              : "--"}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {customer.created_at}
                          </td>
                          <td className="">
                            <button className="underline px-2 py-1 text-xs text-cyan-500  rounded-md">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody> */}
                  <tfoot className="w-full "></tfoot>
                </table>
              </div>

              {/* <div className="flex flex-row gap-2 justify-between mt-5">
                  <div>
                    <p>{`Showing  ${customers.from ? customers.from : 0} to ${
                      customers.to ? customers.to : 0
                    } of ${customers.total ? customers.total : 0} entries`}</p>
                  </div>
                  <div className="flex flex-row gap-2 ">
                    {customers?.links?.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => getNextAccount(link.url.slice(-7))}
                        className={`${
                          link.active
                            ? "bg-tt_rich_black text-white"
                            : "border text-tt_rich_black"
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
  );
};

export default Billing;
