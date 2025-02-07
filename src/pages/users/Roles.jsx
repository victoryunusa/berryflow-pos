import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import AddRole from "../../components/modals/AddRole";
import { useDispatch, useSelector } from "react-redux";
import { getRoles } from "../../features/role/roleSlice";
import { prettyDate } from "../../functions/functions";

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
            <p className="text-xs text-neutral-400">List of all roles</p>
          </div>
          <div>
            <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-tt_rich_black text-white text-sm rounded-md"
            >
              Add New
            </button>
          </div>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs w-full">
          <div className="flex flex-col overflow-x-auto">
            <div className="">
              <div className="inline-block w-full py-2 sm:px-2 lg:px-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-neutral-500 rounded">
                    <thead className="text-md text-neutral-700 capitalize bg-neutral-100 border-b">
                      <tr>
                        <th className="px-2 py-3">Code</th>
                        <th className="px-2 py-3">Name</th>
                        <th className="px-2 py-3">Status</th>
                        <th className="px-2 py-3">Created Date</th>
                        <th className="px-2 py-3">Created By</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {roles?.map((role, index) => (
                        <tr
                          className="w-full bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50 py-1"
                          key={index}
                        >
                          <td className="px-2 py-3 font-semibold">
                            {role.code}
                          </td>
                          <td className="px-2 py-3 font-semibold">
                            {role.name}
                          </td>
                          <td className="px-2 py-3">{role.status}</td>

                          <td className=" whitespace-nowrap px-2 py-3">
                            {prettyDate(role.created_at)}
                          </td>
                          <td className="px-2 py-3">{role.created_by}</td>
                          <td className="flex gap-2 items-center mt-2">
                            <button
                              // onClick={() => handleEditClick(account)}
                              className=" px-2 py-1 text-xs bg-blue-600 text-white font-semibold  rounded-md"
                            >
                              Edit
                            </button>
                            <button className=" px-2 py-1 text-xs bg-red-600 text-white font-semibold rounded-md">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="w-full "></tfoot>
                  </table>
                </div>

                {/* <div className="flex flex-row gap-2 justify-between mt-5">
                                  <div>
                                    <p>{`Showing  ${accounts.from ? accounts.from : 0} to ${
                                      accounts.to ? accounts.to : 0
                                    } of ${accounts.total ? accounts.total : 0} entries`}</p>
                                  </div>
                                  <div className="flex flex-row gap-2 ">
                                    {accounts?.links?.map((link, index) => (
                                      <button
                                        key={index}
                                        onClick={() => getNextAccount(link.url.slice(-7))}
                                        className={`${
                                          link.active
                                            ? "bg-tt_rich_black text-white"
                                            : "border text-tt_rich_black"
                                        } px-2 py-1 rounded-md`}
                                        disabled={link.url == null ? true : false}
                                      >
                                        {link.label == "&laquo; Previous"
                                          ? "<"
                                          : link.label
                                          ? link.label == "Next &raquo;"
                                            ? ">"
                                            : link.label
                                          : ""}
                                      </button>
                                    ))}
                                  </div>
                                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {visible && <AddRole setOpenRole={setVisible} />}
    </>
  );
};

export default Roles;
