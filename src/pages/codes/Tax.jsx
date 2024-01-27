import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import AddArea from "../../components/modals/AddArea";
import AddTax from "../../components/modals/AddTax";
import { getTaxes } from "../../features/tax/taxSlice";

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

const Tax = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openAdd, setOpenAdd] = useState(false);
  const { taxes, message, isError } = useSelector((state) => state.taxes);

  useEffect(() => {
    dispatch(getTaxes());
  }, [message]);
  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Taxes</h3>
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
          <DataTable
            value={taxes}
            stripedRows
            tableStyle={{ minWidth: "50rem" }}
            className="text-sm font-manrope rounded-lg"
          >
            <Column field="label" header="Lable"></Column>
            <Column field="tax_code" header="Tax Code"></Column>
            <Column field="total_tax_percentage" header="Percentage"></Column>
            <Column field="tax_type" header="Type"></Column>
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
      {openAdd && <AddTax open={openAdd} setOpenAdd={setOpenAdd} />}
    </>
  );
};

export default Tax;
