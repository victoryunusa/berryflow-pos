import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import AddDiscount from "../../components/modals/AddDiscount";
import { getDiscountCodes } from "../../features/discount/discountSlice";

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

const DiscountCodes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openAdd, setOpenAdd] = useState(false);
  const { discounts, message } = useSelector((state) => state.discounts);

  useEffect(() => {
    dispatch(getDiscountCodes());
  }, [message]);

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Discount Code</h3>
          </div>
          <div>
            <button
              className="px-3 py-2 bg-tt_rich_black text-white text-sm rounded-md"
              onClick={() => setOpenAdd(true)}
            >
              Add New
            </button>
          </div>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs">
          <DataTable
            value={discounts}
            stripedRows
            tableStyle={{ minWidth: "50rem" }}
            className="text-sm font-manrope rounded-lg"
          >
            <Column field="label" header="Label"></Column>
            <Column field="discount_code" header="Discount Code"></Column>
            <Column field="discount_percentage" header="Percentage"></Column>
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
      {openAdd && <AddDiscount open={openAdd} setOpenAdd={setOpenAdd} />}
    </>
  );
};

export default DiscountCodes;
