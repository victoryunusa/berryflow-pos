import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

const roles = [
  {
    name: "Admin",
    code: "102",
    role: "Admin",
    status: "Active",
    created_on: "2015-12-09",
    updated_on: "2015-12-09",
    created_by: "Victor Yunusa",
  },
];

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

const Roles = () => {
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Role</h3>
        </div>
        <div>
          <button className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md">
            New Role
          </button>
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg text-xs">
        <DataTable
          value={roles}
          stripedRows
          size="small"
          tableStyle={{ minWidth: "50rem" }}
          className="text-sm font-manrope rounded-lg"
        >
          <Column field="code" header="Role Code"></Column>
          <Column field="name" header="Name"></Column>
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

export default Roles;
