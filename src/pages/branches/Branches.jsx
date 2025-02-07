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
import Sidebar from "../settings/Sidebar/Sidebar";

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
        <div className="">
          <Sidebar />
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Branches</h3>
          </div>
          <div className="flex flex-row justify-end items-center">
            <Link to="/manage/branches/add">
              <button className="px-3 py-2 bg-tt_rich_black text-white text-sm rounded-md">
                Add New
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white border p-5 rounded-lg text-xs">
          <div className="flex flex-col overflow-x-auto">
            <div className="">
              <div className="inline-block w-full py-2 sm:px-2 lg:px-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-neutral-500 rounded">
                    <thead className="text-md text-neutral-700 capitalize bg-neutral-100 border-b">
                      <tr>
                        <th className="px-2 py-3">Branch Code</th>
                        <th className="px-2 py-3">Branch Name</th>
                        <th className="px-2 py-3">Status</th>
                        <th className="px-2 py-3">Created On</th>
                        <th className="px-2 py-3">Created By</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {branches?.map((branch, index) => (
                        <tr
                          className="bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50"
                          key={index}
                        >
                          <td className="px-2 py-3 font-bold">
                            {branch.store_code}
                          </td>
                          <td className="px-2 py-3">{branch.name}</td>
                          <td className="px-2 py-3">
                            {branch?.status ? branch?.status : "--"}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {branch.created_at}
                          </td>
                          <td className="px-2 py-3">
                            {branch?.created_user
                              ? branch?.created_user?.full_name
                              : "--"}
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
    </>
  );
};

export default Branches;
