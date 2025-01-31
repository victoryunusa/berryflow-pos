import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditAccount from "../../components/modals/EditAccount";
import NewAddonGroup from "../../components/modals/NewAddonGroup";
import { getAddonGroups } from "../../features/addon_group/addonGroupSlice";

const AddOnGroups = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { addon_groups } = useSelector((state) => state.addon_groups);

  const getNextAccount = (url) => {
    dispatch(getAddonGroups(url));
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleEditClick = (account) => {
    setSelectedAccount(account);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedAccount(null);
  };

  useEffect(() => {
    dispatch(getAddonGroups());
  }, [dispatch]);
  return (
    <>
      <div className="flex flex-col space-y-5 font-br">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Add-on Groups</h3>
            <p className="text-xs text-neutral-400">
              Options for creating product variants such eg. size, color,
              quantity etc.
            </p>
          </div>
          <div>
            <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-tt_rich_black text-white text-small font-semibold rounded-md"
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
                        <th className="px-2 py-3">S/N</th>
                        <th className="px-2 py-3">Add-on Group Code</th>
                        <th className="px-2 py-3">Add-on Group</th>
                        <th className="px-2 py-3">Status</th>
                        <th className="px-2 py-3">Created Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {addon_groups?.data?.map((addon_group, index) => (
                        <tr
                          className="bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50"
                          key={index}
                        >
                          <td className="px-2 py-3 font-semibold">
                            {index + 1}
                          </td>
                          <td className="px-2 py-3 font-semibold">
                            {addon_group.addon_group_code}
                          </td>
                          <td className="px-2 py-3 font-semibold">
                            {addon_group.label}
                          </td>
                          <td className="px-2 py-3">{addon_group.status}</td>

                          <td className=" whitespace-nowrap px-2 py-3">
                            {addon_group.created_at}
                          </td>
                          <td className="">
                            <button
                              onClick={() => handleEditClick(addon_group)}
                              className="underline px-2 py-1 text-xs text-blue-500  rounded-md"
                            >
                              Edit
                            </button>
                            <button className="underline px-2 py-1 text-xs text-red-500  rounded-md">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="w-full "></tfoot>
                  </table>
                </div>

                <div className="flex flex-row gap-2 justify-between mt-5">
                  <div>
                    <p>{`Showing  ${
                      addon_groups.from ? addon_groups.from : 0
                    } to ${addon_groups.to ? addon_groups.to : 0} of ${
                      addon_groups.total ? addon_groups.total : 0
                    } entries`}</p>
                  </div>
                  <div className="flex flex-row gap-2 ">
                    {addon_groups?.links?.map((link, index) => (
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visible && <NewAddonGroup setOpen={setVisible} />}
      {isEditModalOpen && (
        <EditAccount setOpen={closeModal} account={selectedAccount} />
      )}
    </>
  );
};

export default AddOnGroups;
