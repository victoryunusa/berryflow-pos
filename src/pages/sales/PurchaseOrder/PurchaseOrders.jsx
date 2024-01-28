import React from "react";
import * as HeIcons from "react-icons/fa6";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";

const customers = [
  {
    name: "David Yunusa",
    code: "AGR100992",
    email: "david@getnelsa.com",
    phone: "0807998866",
    status: "Active",
    created_on: "2015-12-09",
    updated_on: "2015-12-09",
    created_by: "Victor Yunusa",
  },
];

const actionBodyTemplate = (rowData) => {
  return (
    <div className="flex flex-row space-x-3">
      <button className="bg-blue-600 p-2 text-xs text-white rounded-md">
        <HeIcons.FaSquarePen size={12} />
      </button>
      <button className="bg-red-600 p-2 text-xs text-white rounded-md">
        <HeIcons.FaTrash size={12} />
      </button>
    </div>
  );
};

const PurchaseOrders = () => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Purchase Orders</h3>
        </div>
        <Link to="/stock/purchase_orders/add">
          <button className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md">
            Add New
          </button>
        </Link>
      </div>
      <div className="bg-white border p-5 rounded-lg text-xs">
        <DataTable
          value={customers}
          stripedRows
          tableStyle={{ minWidth: "50rem" }}
          className="text-sm font-manrope rounded-lg"
        >
          <Column field="name" header="PO Number"></Column>
          <Column field="email" header="PO Reference"></Column>
          <Column field="phone" header="Supplier"></Column>
          <Column field="name" header="Order Date"></Column>
          <Column field="email" header="Order Due Date"></Column>
          <Column field="phone" header="Amount"></Column>
          <Column field="status" header="Status"></Column>
          <Column field="created_by" header="Created By"></Column>
          <Column
            body={actionBodyTemplate}
            className="w-1/12"
            exportable={false}
            header="Action"
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};

export default PurchaseOrders;
