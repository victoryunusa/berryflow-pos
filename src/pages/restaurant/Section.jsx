import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import AddArea from "../../components/modals/AddArea";
import { getAreas } from "../../features/area/areaSlice";

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

const Section = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openAdd, setOpenAdd] = useState(false);
  const { areas, message, isError } = useSelector((state) => state.areas);

  useEffect(() => {
    dispatch(getAreas());
  }, [message]);

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">
              Sections (Floor Plan)
            </h3>
            <p className="text-xs text-neutral-400">
              Select the plan that you want to subscribe to
            </p>
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
        <div className="bg-white p-5 rounded-lg text-xs">
          <DataTable
            value={areas}
            stripedRows
            tableStyle={{ minWidth: "50rem" }}
            className="text-sm font-manrope rounded-lg"
          >
            <Column field="name" header="Name"></Column>
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
      {openAdd && <AddArea open={openAdd} setOpenAdd={setOpenAdd} />}
    </>
  );
};

export default Section;
