import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link, useNavigate } from "react-router-dom";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
//import { Button } from "primereact/button";
import AddTable from "../../components/modals/AddTable";
import QRCode from "react-qr-code";
import { getTables } from "../../features/table/tableSlice";

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

const areaBodyTemplate = (rowData) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-3">
      {rowData.name}
    </div>
  );
};

const Tables = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openAdd, setOpenAdd] = useState(false);
  const { tables, message } = useSelector((state) => state.tables);

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch, message]);

  const imageBodyTemplate = (product) => {
    const url = `https://getnelsa.com/${product.slug}`;
    return (
      <QRCode
        size={5}
        style={{ height: "auto", maxWidth: "50%", width: "50%" }}
        value={url}
        viewBox={`0 0 50 50`}
      />
    );
  };

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Tables</h3>
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
            value={tables}
            stripedRows
            tableStyle={{ minWidth: "50rem" }}
            className="text-sm font-manrope rounded-lg"
          >
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column field="table_name" header="Name"></Column>
            <Column field="table_number" header="Number"></Column>
            <Column field="no_of_occupants" header="Seats"></Column>
            <Column
              field="floor_plan.name"
              header="Section (Floor Plan)"
            ></Column>
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
      {openAdd && <AddTable open={openAdd} setOpenAdd={setOpenAdd} />}
    </>
  );
};

export default Tables;
