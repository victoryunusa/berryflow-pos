import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddTransaction from "../../components/modals/AddTransaction";
import { getTransactions } from "../../features/transactions/transactionSlice";
import EditTransaction from "../../components/modals/EditTransaction";

const Transactions = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { transactions } = useSelector((state) => state.transactions);

  const getNextTransactions = (url) => {
    dispatch(getTransactions(url));
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTrasaction, setSelectedTrasaction] = useState(null);

  const handleEditClick = (account) => {
    setSelectedTrasaction(account);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setSelectedTrasaction(null);
  };

  useEffect(() => {
    dispatch(getTransactions());
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-5 font-br">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Transactions</h3>
            <p className="text-xs text-neutral-400">
              Select the plan that you want to subscribe to
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
                        <th className="px-2 py-3">Code</th>
                        <th className="px-2 py-3">Date</th>
                        <th className="px-2 py-3">Type</th>
                        <th className="px-2 py-3">Account</th>
                        <th className="px-2 py-3">Payment Method</th>
                        <th className="px-2 py-3">Bill To Type</th>
                        <th className="px-2 py-3">Bill To Name</th>
                        <th className="px-2 py-3">Amount</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions?.data?.map((transaction, index) => (
                        <tr
                          className="bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50"
                          key={index}
                        >
                          <td className="px-2 py-3 font-semibold">
                            {transaction.transaction_code}
                          </td>
                          <td className="px-2 py-3">
                            {transaction.transaction_date}
                          </td>
                          <td className="px-2 py-3">
                            {transaction?.transaction_type_data?.label}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {transaction.account.label}
                          </td>
                          <td className="px-2 py-3">
                            {transaction.payment_method}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {transaction.bill_to}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {transaction.bill_to_name}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {transaction.amount}
                          </td>
                          <td className="">
                            <button
                              onClick={() => handleEditClick(transaction)}
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
                      transactions.from != null ? transactions.from : 0
                    } to ${transactions.to != null ? transactions.to : 0} of ${
                      transactions.total
                    } entries`}</p>
                  </div>
                  <div className="flex flex-row gap-2 ">
                    {transactions?.links?.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => getNextTransactions(link.url.slice(-7))}
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
      {visible && <AddTransaction setOpen={setVisible} />}
      {isEditModalOpen && (
        <EditTransaction
          setOpen={closeModal}
          transaction={selectedTrasaction}
        />
      )}
    </>
  );
};

export default Transactions;
