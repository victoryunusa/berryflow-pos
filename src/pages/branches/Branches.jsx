import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import * as HeIcons from "react-icons/fa6";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { getBranches } from "../../features/branch/branchSlice";
import { prettyDate } from "../../functions/functions";
import { Link } from "react-router-dom";

const Branches = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { branches, message } = useSelector((state) => state.branches);

  useEffect(() => {
    dispatch(getBranches());
  }, [message, dispatch]);

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

  const getSeverity = (status) => {
    switch (status) {
      case "0":
        return "danger";

      case "1":
        return "success";

      case "new":
        return "info";

      case "negotiation":
        return "warning";

      default:
        return null;
    }
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status === 1 ? "Active" : "Inactive"}
        className={`${
          rowData.status === 1 ? "bg-green-600" : "bg-red-500"
        } text-xs font-manrope w-[3.5rem]`}
        severity={getSeverity(rowData.status)}
      />
    );
  };

  const dateBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row items-center">
        {prettyDate(rowData.created_at)}
      </div>
    );
  };

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">
              Settings/Branches
            </h3>
          </div>
        </div>
        <div className="flex flex-row space-x-5">
          <div className="w-full p-10 bg-white rounded-lg">
            <div className="flex flex-col space-y-5">
              <div className="flex flex-row justify-end items-center">
                <Link to="/settings/branches/add">
                  <button className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md">
                    Add new
                  </button>
                </Link>
              </div>
              <div className="bg-white border p-5 rounded-lg text-xs">
                <DataTable
                  value={branches}
                  stripedRows
                  paginator
                  rows={10}
                  size="small"
                  tableStyle={{ minWidth: "50rem" }}
                  className="text-sm font-manrope rounded-lg"
                >
                  <Column field="store_code" header="Branch Code"></Column>
                  <Column field="name" header="Name"></Column>
                  <Column
                    field="created_at"
                    header="Created On"
                    body={dateBodyTemplate}
                  ></Column>
                  <Column
                    field="updated_at"
                    header="Updated On"
                    body={dateBodyTemplate}
                  ></Column>
                  <Column field="created_by" header="Created By"></Column>
                  <Column
                    field="status"
                    body={statusBodyTemplate}
                    header="Status"
                  ></Column>
                  <Column
                    body={actionBodyTemplate}
                    className="w-1/12"
                    exportable={false}
                    header="Action"
                  ></Column>
                </DataTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Branches;
