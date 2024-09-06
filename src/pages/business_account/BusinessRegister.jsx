import React, { useEffect, useState } from "react";
import { getProducts } from "../../features/products/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getBusinessRegisters } from "../../features/business_register/businessRegisterSlice";

const BusinessRegister = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { business_registers } = useSelector(
    (state) => state.business_registers
  );

  const getNextRegisters = (url) => {
    dispatch(getBusinessRegisters(url));
  };

  const showProduct = (slug) => {
    navigate(`${slug}`);
  };

  useEffect(() => {
    dispatch(getBusinessRegisters());
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-5 font-br">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700 ">
              Business Registers
            </h3>
            <p className="text-xs text-neutral-400">
              Select the plan that you want to subscribe to
            </p>
          </div>
          <div>
            <div className="px-3 py-2 bg-neutral-100 text-neutral-100 text-small font-semibold rounded-md">
              Add New
            </div>
          </div>
        </div>
        <div className="bg-white border p-5 text-xs rounded-lg w-full ">
          <div className="flex flex-col overflow-x-auto">
            <div className="">
              <div className="inline-block w-full py-2 sm:px-2 lg:px-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-neutral-500 rounded">
                    <thead className="text-md text-neutral-700 capitalize bg-neutral-100 border-b">
                      <tr>
                        <th className="px-2 py-3">User</th>
                        <th className="px-2 py-3">Opened On</th>
                        <th className="px-2 py-3">Closed On</th>
                        <th className="px-2 py-3">Opening Amount</th>
                        <th className="px-2 py-3">Closing Amount</th>
                        <th className="px-2 py-3">Created At</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {business_registers?.data?.map((register, index) => (
                        <tr
                          className="odd:bg-white even:bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50"
                          key={index}
                        >
                          <td className="px-2 py-3 font-semibold">
                            {register.user.full_name}
                          </td>
                          <td className="px-2 py-3">{register.opening_date}</td>
                          <td className="px-2 py-3">
                            {register.closing_date != null
                              ? register.closing_date
                              : "--"}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {register.opening_amount}
                          </td>
                          <td className="px-2 py-3">
                            {register.closing_amount != ""
                              ? register.closing_amount
                              : "-"}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {register.created_at}
                          </td>
                          <td className="">
                            <button className="underline px-2 py-1 text-xs text-cyan-500  rounded-md">
                              View
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
                      business_registers.from != null
                        ? business_registers.from
                        : 0
                    } to ${
                      business_registers.to != null ? business_registers.to : 0
                    } of ${business_registers.total} entries`}</p>
                  </div>
                  <div className="flex flex-row gap-2 ">
                    {business_registers?.links?.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => getNextRegisters(link.url.slice(-7))}
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
      {visible && <AddProduct setOpen={setVisible} />}
    </>
  );
};

export default BusinessRegister;
