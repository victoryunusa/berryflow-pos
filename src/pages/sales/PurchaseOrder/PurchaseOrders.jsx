import { useEffect } from "react";
import * as HeIcons from "react-icons/fa6";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPurchaseOrders } from "../../../features/purchase/purchaseOrderSlice";

const actionBodyTemplate = (rowData) => {
  console.log(rowData);
  return (
    <div className="flex flex-row space-x-3">
      <button className="bg-sky-400 p-2 text-xs text-white rounded-md">
        <HeIcons.FaEye size={12} />
      </button>
      <button className="bg-blue-500 p-2 text-xs text-white rounded-md">
        <HeIcons.FaPen size={12} />
      </button>
    </div>
  );
};

const PurchaseOrders = () => {
  const dispatch = useDispatch();

  const { purchase_orders } = useSelector((state) => state.purchase_orders);

  useEffect(() => {
    dispatch(getPurchaseOrders());
  }, [dispatch]);

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="">
          <h3 className="text-lg font-bold text-gray-700">Purchase Orders</h3>
        </div>
        <Link to="/inventory/purchase_orders/add">
          <button className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md">
            Add New
          </button>
        </Link>
      </div>
      <div className="bg-white border p-5 rounded-lg text-xs">
        <DataTable
          value={purchase_orders}
          stripedRows
          paginator
          rows={10}
          tableStyle={{ minWidth: "50rem" }}
          className="text-sm font-br rounded-lg"
        >
          <Column field="po_number" header="PO Number"></Column>
          <Column field="po_reference" header="PO Reference"></Column>
          <Column field="supplier.name" header="Supplier"></Column>
          <Column field="order_date_raw" header="Order Date"></Column>
          <Column field="order_due_date_raw" header="Order Due Date"></Column>
          <Column field="total_order_amount" header="Amount"></Column>
          <Column field="status.label" header="Status"></Column>
          <Column field="created_by.full_name" header="Created By"></Column>
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
