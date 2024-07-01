import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AddRole from "../../components/modals/AddRole";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../features/role/roleSlice";

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

const Roles = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const { roles } = useSelector((state) => state.roles);

  useEffect(() => {
    dispatch(getRoles());
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Role</h3>
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
            value={roles}
            stripedRows
            paginator
            rows={10}
            tableStyle={{ minWidth: "50rem" }}
            className="text-sm font-br rounded-lg"
          >
            <Column field="code" sortable header="Role Code"></Column>
            <Column field="name" sortable header="Name"></Column>
            <Column field="status" sortable header="Status"></Column>
            <Column field="created_on" sortable header="Created On"></Column>
            <Column field="updated_on" sortable header="Updated On"></Column>
            <Column field="created_by" sortable header="Created By"></Column>
            <Column
              body={actionBodyTemplate}
              className="w-1/12"
              exportable={false}
              header="Action"
            ></Column>
          </DataTable>
        </div>
      </div>
      {visible && <AddRole setOpenRole={setVisible} />}
    </>
  );
};

export default Roles;
