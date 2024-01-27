import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as HeIcons from "react-icons/fa6";
import { confirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

import { getIngredients } from "../../features/ingredients/ingredientsSlice";
import AddIngredient from "../../components/modals/AddIngredient";

const Ingredients = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const { ingredients } = useSelector((state) => state.ingredients);

  useEffect(() => {
    dispatch(getIngredients());
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
            <h3 className="text-lg font-bold text-gray-700">Ingredients</h3>
          </div>
          <div>
            <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md"
            >
              Add New
            </button>
          </div>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs">
          <DataTable
            value={ingredients}
            stripedRows
            size="small"
            tableStyle={{ minWidth: "50rem" }}
            className="text-sm font-manrope rounded-lg"
          >
            <Column
              field="name"
              className="w-1/4"
              sortable
              header="Name"
            ></Column>
            <Column field="cost" sortable header="Cost"></Column>
            <Column field="price" sortable header="Price"></Column>
            <Column field="unit.label" sortable header="Unit"></Column>
            <Column
              field="quantity"
              sortable
              header="Available Quantity"
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
      {visible && <AddIngredient setOpenIngredient={setVisible} />}
    </>
  );
};

export default Ingredients;
