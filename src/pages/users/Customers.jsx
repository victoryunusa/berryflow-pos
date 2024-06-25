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
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Customers</h3>
          </div>
          <div>
            <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md"
            >
              Add New
            </button>
          </div>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs">
          <DataTable
            value={customers}
            stripedRows
            tableStyle={{ minWidth: "50rem" }}
            className="text-sm font-manrope rounded-lg"
          >
            <Column field="name" header="Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="phone" header="Phone No"></Column>
            <Column field="status" header="Status"></Column>
            <Column
              body={actionBodyTemplate}
              className="w-1/12"
              exportable={false}
              header="Action"
            ></Column>
          </DataTable>
        </div>
      </div>
      {visible && <AddCustomer setOpenCustomer={setVisible} />}
    </>
  );
};

export default Customers;
