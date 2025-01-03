import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddAccount from "../../components/modals/AddAccount";
import EditAccount from "../../components/modals/EditAccount";
import { getVariantOptions } from "../../features/variant_option/variantOptionSlice";
import AddVariantOption from "../../components/modals/AddVariantOption";

const VariantOption = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { variant_options } = useSelector((state) => state.variant_options);

  const getNextAccount = (url) => {
    dispatch(getVariantOptions(url));
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
    dispatch(getVariantOptions());
  }, [dispatch]);
  return (
    <>
      <div className="flex flex-col space-y-5 font-br">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Variant Options</h3>
            <p className="text-xs text-neutral-400">
              Options for creating product variants such eg. size, color,
              quantity etc.
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
                        <th className="px-2 py-3">S/N</th>
                        <th className="px-2 py-3">Account Name</th>
                        <th className="px-2 py-3">Status</th>
                        <th className="px-2 py-3">Created Date</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {variant_options?.data?.map((variant_option, index) => (
                        <tr
                          className="bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50"
                          key={index}
                        >
                          <td className="px-2 py-3 font-semibold">
                            {index + 1}
                          </td>
                          <td className="px-2 py-3 font-semibold">
                            {variant_option.label}
                          </td>
                          <td className="px-2 py-3">{variant_option.label}</td>

                          <td className=" whitespace-nowrap px-2 py-3">
                            {variant_option.created_at}
                          </td>
                          <td className="">
                            <button
                              onClick={() => handleEditClick(variant_option)}
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
                      variant_options.from ? variant_options.from : 0
                    } to ${variant_options.to ? variant_options.to : 0} of ${
                      variant_options.total ? variant_options.total : 0
                    } entries`}</p>
                  </div>
                  <div className="flex flex-row gap-2 ">
                    {variant_options?.links?.map((link, index) => (
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
      {visible && <AddVariantOption setOpen={setVisible} />}
      {isEditModalOpen && (
        <EditAccount setOpen={closeModal} account={selectedAccount} />
      )}
    </>
  );
};

export default VariantOption;
