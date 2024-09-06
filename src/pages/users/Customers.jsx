import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import AddCustomer from "../../components/modals/AddCustomer";
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../../features/customer/customerSlice";

// const customers = [
//   {
//     name: "David Yunusa",
//     code: "AGR100992",
//     email: "david@getnelsa.com",
//     phone: "0807998866",
//     status: "Active",
//     created_on: "2015-12-09",
//     updated_on: "2015-12-09",
//     created_by: "Victor Yunusa",
//   },
// ];

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

const Customers = () => {
  const [visible, setVisible] = useState(false);
  const { customers } = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  const { accounts } = useSelector((state) => state.accounts);

  const getNextAccount = (url) => {
    dispatch(getCustomers(url));
  };

  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Customers</h3>
            <p className="text-xs text-neutral-400">
              Select the plan that you want to subscribe to
            </p>
          </div>
          <div>
            <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-nelsa_primary text-white text-small font-semibold rounded-md"
            >
              Add New
            </button>
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
                        <th className="px-2 py-3">Name</th>
                        <th className="px-2 py-3">Email</th>
                        <th className="px-2 py-3">Phone No</th>
                        <th className="px-2 py-3">Loyalty Point(s)</th>
                        <th className="px-2 py-3">Status</th>
                        <th className="px-2 py-3">Created Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
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
                    </tbody>
                    <tfoot className="w-full "></tfoot>
                  </table>
                </div>

                <div className="flex flex-row gap-2 justify-between mt-5">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visible && <AddCustomer setOpenCustomer={setVisible} />}
    </>
  );
};

export default Customers;
