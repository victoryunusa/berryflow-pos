import React from "react";
import * as HeIcons from "react-icons/fa6";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const users = [
  {
    name: "David Yunusa",
    code: "AGR100992",
    email: "david@getnelsa.com",
    phone: "0807998866",
    role: "Admin",
    status: "Active",
    created_on: "2015-12-09",
    updated_on: "2015-12-09",
    created_by: "Victor Yunusa",
  },
  {
    name: "David Yunusa",
    code: "AGR100992",
    email: "david@getnelsa.com",
    phone: "0807998866",
    role: "Admin",
    status: "Active",
    created_on: "2015-12-09",
    updated_on: "2015-12-09",
    created_by: "Victor Yunusa",
  },
];

const actionBodyTemplate = (rowData) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-3">
      <button className="bg-blue-600 p-2 text-xs text-white rounded-md">
        <HeIcons.FaSquarePen size={12} />
      </button>
      <button className="bg-red-600 p-2 text-xs text-white rounded-md">
        <HeIcons.FaTrash size={12} />
      </button>
    </div>
  );
};

const Staff = () => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Staff</h3>
        </div>
        <div>
          <button className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md">
            New User
          </button>
        </div>
      </div>
      <div className="bg-white border p-5 rounded-lg text-xs">
        <DataTable
          value={users}
          stripedRows
          tableStyle={{ minWidth: "50rem" }}
          className="text-sm font-manrope rounded-lg"
        >
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Full Name"></Column>
          <Column field="email" header="Email"></Column>
          <Column field="phone" header="Phone No"></Column>
          <Column field="role" header="Role"></Column>
          <Column field="status" header="Status"></Column>
          <Column field="created_on" header="Created On"></Column>
          <Column field="updated_on" header="Updated On"></Column>
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

export default Staff;
