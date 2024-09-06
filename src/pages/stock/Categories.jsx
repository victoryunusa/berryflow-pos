import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as HeIcons from "react-icons/fa6";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { Tag } from "primereact/tag";

import { getCategories } from "../../features/category/categoriesSlice";
import AddCategory from "../../components/modals/AddCategory";

const Categories = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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

  const getSeverity = (status) => {
    switch (status) {
      case "0":
        return "danger";

      case "1":
        return "success";

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

  const posBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.display_on_pos_screen === 1 ? "Yes" : "No"}
        className={`${
          rowData.display_on_pos_screen === 1
            ? "text-green-500"
            : "text-red-600"
        } bg-transparent text-xs font-semibold font-manrope w-2/3 `}
        severity={getSeverity(rowData.display_on_pos_screen)}
      />
    );
  };

  const qrBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.display_on_qr_menu === 1 ? "Yes" : "No"}
        className={`${
          rowData.display_on_qr_menu === 1 ? "text-green-500" : "text-red-600"
        } bg-transparent text-xs font-semibold font-manrope w-2/3 `}
        severity={getSeverity(rowData.display_on_qr_menu)}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row items-center justify-center space-x-3">
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

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Categories</h3>
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
            value={categories}
            stripedRows
            paginator
            rows={10}
            tableStyle={{ minWidth: "50rem" }}
            className="text-sm font-br rounded-lg"
          >
            <Column field="label" header="Category Name"></Column>
            <Column field="category_code" header="Category Code"></Column>
            <Column
              body={posBodyTemplate}
              field="display_on_pos_screen"
              header="Show on POS Screen"
            ></Column>
            <Column
              body={qrBodyTemplate}
              field="display_on_qr_menu"
              header="Show on QR Menu"
            ></Column>
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
      {visible && <AddCategory setOpenCategory={setVisible} />}
    </>
  );
};

export default Categories;
