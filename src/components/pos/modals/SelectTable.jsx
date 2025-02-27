import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa6";
import * as SiIcons from "react-icons/si";
import { getTables } from "../../../features/table/tableSlice";

const SelectTable = ({ setOpen, setSelectedTable }) => {
  const dispatch = useDispatch();

  const { tables, message } = useSelector((state) => state.tables);

  const tablesIndex = tables?.filter((table) => table.status === 1);

  console.log(tablesIndex);

  useEffect(() => {
    dispatch(getTables());
  }, [dispatch, message]);

  if (typeof document !== "undefined") {
    return createPortal(
      <>
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="flex items-center min-h-screen px-4 py-4">
            <div className="relative w-full max-w-3xl mx-auto font-br bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between px-6 py-4">
                    <h3 className="text-md font-bold">Tables</h3>

                    <div
                      onClick={() => setOpen(false)}
                      className="cursor-pointer"
                    >
                      <FaIcons.FaXmark size={20} className="text-red-600" />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col justify-center items-center">
                    <div className="w-full">
                      <div className="max-h-[520px] overflow-scroll px-6 md:px-6">
                        <div className="grid grid-cols-3 gap-3">
                          {tablesIndex.map((table, index) => (
                            <div
                              key={index}
                              className="flex flex-col w-full gap-3 bg-neutral-50 p-3 rounded-md border"
                            >
                              <div className="flex flex-col w-full gap-3">
                                <div className="flex flex-row items-center justify-between">
                                  <div>
                                    <h3 className="text-neutral-500 text-sm font-medium">
                                      <span className="font-bold">Name: </span>
                                      {table.table_name}
                                    </h3>
                                    <h3 className="text-neutral-500  text-sm font-medium">
                                      <span className="font-bold">
                                        Sitting Capacity:{" "}
                                      </span>
                                      {table.no_of_occupants}
                                    </h3>
                                    <h3 className="text-neutral-500 font-medium text-sm ">
                                      <span className="font-bold">
                                        Available:{" "}
                                      </span>
                                      {table.no_of_occupants -
                                        table.no_current_occupants}
                                    </h3>
                                  </div>
                                  <div>
                                    <SiIcons.SiTablecheck
                                      size={50}
                                      className={`${
                                        table.no_current_occupants >= 1 &&
                                        table.no_current_occupants <
                                          table.no_of_occupants
                                          ? "text-tt_mustard"
                                          : table.no_current_occupants >=
                                            table.no_of_occupants
                                          ? "text-red-500"
                                          : "text-tt_light_green-300"
                                      }`}
                                    />
                                  </div>
                                </div>

                                <div className="flex flex-row items-end gap-2 mt-2 w-full">
                                  <div className="flex flex-col w-2/6">
                                    <label className="text-sm text-neutral-500">
                                      Persons
                                    </label>
                                    <input
                                      type="number"
                                      className=" px-3 py-2 border text-neutral-500 text-sm rounded-md focus:outline-none"
                                    />
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSelectedTable(table);
                                      setOpen(false);
                                    }}
                                    className="w-4/6 px-3 py-2.5 bg-tt_rich_black text-white rounded-md text-small font-medium"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-row justify-end mt-10 p-4 md:p-5">
                        <div className="flex items-baseline justify-between gap-3 w-1/4">
                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="w-full px-4 py-3 text-xs font-semibold bg-neutral-100 text-neutral-500 rounded-lg"
                          >
                            cancel
                          </button>
                          {/* {loading ? (
                            <button
                              type="submit"
                              className="w-full px-4 py-3 font-bold bg-tt_rich_black/80 text-[#ffffff] rounded-md flex items-center justify-center"
                              disabled={loading}
                            >
                              <span
                                className="mr-5 inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                role="status"
                              >
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                  Loading...
                                </span>
                              </span>
                              Loading...
                            </button>
                          ) : (
                            <button
                              type="submit"
                              className="w-full px-4 py-3 text-xs font-semibold bg-tt_rich_black text-[#ffffff] rounded-lg"
                            >
                              Submit
                            </button>
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>,
      document.body
    );
  } else {
    return null;
  }
};

export default SelectTable;
