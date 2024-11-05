import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAccount from "../../components/modals/AddAccount";
import { getAccounts } from "../../features/account/accountSlice";
import EditAccount from "../../components/modals/EditAccount";

const Accounts = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { accounts } = useSelector((state) => state.accounts);

  const getNextAccount = (url) => {
    dispatch(getAccounts(url));
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
    dispatch(getAccounts());
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-5 font-br">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Accounts</h3>
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
        <div className="bg-white border p-5 rounded-lg text-xs w-full">
          <div className="flex flex-col overflow-x-auto">
            <div className="">
              <div className="inline-block w-full py-2 sm:px-2 lg:px-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-neutral-500 rounded">
                    <thead className="text-md text-neutral-700 capitalize bg-neutral-100 border-b">
                      <tr>
                        <th className="px-2 py-3">Account Code</th>
                        <th className="px-2 py-3">Account Name</th>
                        <th className="px-2 py-3">Type</th>
                        <th className="px-2 py-3">POS Default</th>
                        <th className="px-2 py-3">Status</th>
                        <th className="px-2 py-3">Created Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts?.data?.map((account, index) => (
                        <tr
                          className="bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50"
                          key={index}
                        >
                          <td className="px-2 py-3 font-semibold">
                            {account.account_code}
                          </td>
                          <td className="px-2 py-3">{account.label}</td>
                          <td className="px-2 py-3">
                            {account?.account_type_data != null
                              ? account?.account_type_data?.label
                              : "--"}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {account.pos_default == 1 ? "Yes" : "No"}
                          </td>
                          <td className="px-2 py-3">
                            {account?.status_data
                              ? account?.status_data.label
                              : "--"}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {account.created_at}
                          </td>
                          <td className="">
                            <button
                              onClick={() => handleEditClick(account)}
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
                            ? "bg-nelsa_primary text-white"
                            : "border text-nelsa_primary"
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
      {visible && <AddAccount setOpen={setVisible} />}
      {isEditModalOpen && (
        <EditAccount setOpen={closeModal} account={selectedAccount} />
      )}
    </>
  );
};

export default Accounts;
