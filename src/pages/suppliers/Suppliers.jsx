import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as HeIcons from "react-icons/fa6";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

import { getSuppliers } from "../../features/suppliers/suppliersSlice";
import { prettyDate } from "../../functions/functions";
import AddSupplier from "../../components/modals/AddSupplier";

// const suppliers = [
//   {
//     name: "Agrilet Limited",
//     code: "AGR100992",
//     status: "Active",
//     created_on: "2015-12-09",
//     updated_on: "2015-12-09",
//     created_by: "Victor Yunusa",
//   },
// ];

const CustomInputComponent = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <div>
    <textarea type="text" {...field} {...props}></textarea>
  </div>
);

const Suppliers = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { suppliers, message, isError } = useSelector(
    (state) => state.suppliers
  );

  useEffect(() => {
    dispatch(getSuppliers());
  }, []);

  const toast = useRef(null);

  const acceptFunc = (id) => {
    alert(id);
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirmDelete = (id) => {
    confirmDialog({
      message: `Do you want to delete this record?`,
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: () => acceptFunc(id),
      reject,
    });
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row items-center justify-center gap-3">
        <button className="bg-blue-600 p-2 text-xs text-white rounded-md">
          <HeIcons.FaSquarePen size={12} />
        </button>
        <button
          onClick={() => confirmDelete(rowData.id)}
          className="bg-red-600 p-2 text-xs text-white rounded-md"
        >
          <HeIcons.FaTrash size={12} />
        </button>
      </div>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row items-center">
        {prettyDate(rowData.created_at)}
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
        value={rowData.status_data.label}
        className={`${
          rowData.status === 1 ? "bg-green-600" : "bg-red-500"
        } text-xs font-manrope w-[3.5rem]`}
        severity={getSeverity(rowData.status)}
      />
    );
  };

  const dt = useRef(null);

  const cols = [
    { field: "name", header: "Supplier Name" },
    { field: "supplier_code", header: "Supplier Code" },
    { field: "status", header: "Status" },
    { field: "created_by", header: "Created By" },
    { field: "created_at", header: "Created Date" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, suppliers);
        const docName = `suppliers_${new Date().getTime()}.pdf`;
        doc.save(docName);
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(suppliers);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "suppliers");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const header = (
    <div className="flex flex-row items-center justify-end gap-2">
      <button
        className="flex items-center justify-center p-2 bg-nelsa_primary text-white rounded-lg"
        onClick={() => exportCSV(false)}
      >
        <HeIcons.FaFileCsv size={20} />
      </button>

      <button
        className="flex items-center justify-center p-2 bg-green-600 text-white rounded-lg"
        onClick={exportExcel}
      >
        <HeIcons.FaFileExcel size={20} />
      </button>
      <button
        className="flex items-center justify-center p-2 bg-red-700 text-white rounded-lg"
        onClick={exportPdf}
      >
        <HeIcons.FaFilePdf size={20} />
      </button>
    </div>
  );

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Suppliers</h3>
            <p className="text-xs text-neutral-400">
              Select the plan that you want to subscribe to
            </p>
          </div>
          <div>
            <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-nelsa_primary text-white text-small font-semibold rounded-md"
            >
              Add New
            </button>
          </div>
        </div>

        <div className="bg-white border p-5 rounded-lg text-xs">
          <DataTable
            value={suppliers}
            stripedRows
            paginator
            rows={10}
            tableStyle={{ minWidth: "50rem" }}
            className="text-sm font-br"
          >
            <Column
              field="supplier_code"
              className="w-1/6"
              sortable
              header="Supplier Code"
            ></Column>
            <Column
              field="name"
              className="w-1/4"
              sortable
              header="Supplier Name"
            ></Column>
            <Column
              field="phone"
              className="w-1/6"
              sortable
              header="Phone Number"
            ></Column>
            <Column
              field="email"
              className="w-1/6"
              sortable
              header="Email"
            ></Column>
            <Column
              field="status"
              sortable
              header="Status"
              body={statusBodyTemplate}
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
      {visible && <AddSupplier setOpenSupplier={setVisible} />}
    </>
  );
};

export default Suppliers;
