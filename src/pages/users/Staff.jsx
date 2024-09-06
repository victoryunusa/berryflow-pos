import { useEffect, useState } from "react";
import * as HeIcons from "react-icons/fa6";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AddUser from "../../components/modals/AddUser";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../features/users/usersSlice";
import { prettyDate } from "../../functions/functions";

//const users = {};

const actionBodyTemplate = (rowData) => {
  return (
    <div className="flex flex-row items-center justify-center space-x-3">
      <button className="bg-blue-600 p-2 text-xs text-white rounded-md">
        <HeIcons.FaSquarePen size={12} />
      </button>
      <button className="bg-red-600 p-2 text-xs text-white rounded-md">
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

const Staff = () => {
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Staff</h3>
            <p className="text-xs text-neutral-400">
              Select the plan that you want to subscribe to
            </p>
          </div>
          <div>
            <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-nelsa_primary text-white text-sm rounded-md"
            >
              Add User
            </button>
          </div>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs">
          <DataTable
            value={users}
            stripedRows
            paginator
            rows={10}
            tableStyle={{ minWidth: "50rem" }}
            className="text-sm font-vr rounded-lg"
          >
            <Column field="user_code" header="Code"></Column>
            <Column field="full_name" header="Full Name"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="phone" header="Phone No"></Column>
            <Column field="role.name" header="Role"></Column>
            <Column field="status" header="Status"></Column>
            <Column
              field="created_at"
              dataType="date"
              sortable
              body={dateBodyTemplate}
              header="Created On"
            ></Column>
            <Column field="created_user.full_name" header="Created By"></Column>
            <Column
              body={actionBodyTemplate}
              className="w-1/12"
              exportable={false}
              header="Action"
            ></Column>
          </DataTable>
        </div>
      </div>
      {visible && <AddUser setOpenUser={setVisible} />}
    </>
  );
};

export default Staff;
