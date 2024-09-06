import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getInvoices } from "../../../features/invoice/invoiceSlice";

const Invoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { invoices } = useSelector((state) => state.invoices);

  const getNextInvoices = (url) => {
    dispatch(getInvoices(url));
  };

  const showProduct = (slug) => {
    navigate(`${slug}`);
  };

  useEffect(() => {
    dispatch(getInvoices());
  }, []);
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex flex-row justify-between items-center">
        <div className="">
          <h3 className="text-lg font-bold text-neutral-700">Invoices</h3>
          <p className="text-xs text-neutral-400">
            Select the plan that you want to subscribe to
          </p>
        </div>
        <Link to="/finance/invoice/add">
          <button className="px-3 py-2 bg-nelsa_primary text-white text-small font-semibold rounded-md">
            Add New
          </button>
        </Link>
      </div>
      <div className="bg-white border p-5 rounded-lg text-xs w-full">
        <div className="flex flex-col overflow-x-auto">
          <div className="">
            <div className="inline-block w-full py-2 sm:px-2 lg:px-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-neutral-500 rounded">
                  <thead className="text-md text-neutral-700 capitalize bg-neutral-100 border-b">
                    <tr>
                      <th className="px-2 py-3">Number</th>
                      <th className="px-2 py-3">Reference</th>
                      <th className="px-2 py-3">Bill To</th>
                      <th className="px-2 py-3">Bill To Name</th>
                      <th className="px-2 py-3">Invoice Date</th>
                      <th className="px-2 py-3">Due Date</th>
                      <th className="px-2 py-3">Amount</th>
                      <th className="px-2 py-3">Status</th>
                      <th className="px-2 py-3">Created By</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices?.data?.map((invoice, index) => (
                      <tr
                        className="bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50"
                        key={index}
                      >
                        <td className="px-2 py-3 font-semibold">
                          {invoice.invoice_number}
                        </td>
                        <td className="px-2 py-3">
                          {invoice.invoice_reference}
                        </td>
                        <td className="px-2 py-3">{invoice.bill_to}</td>
                        <td className=" whitespace-nowrap px-2 py-3">
                          {invoice.bill_to_name}
                        </td>
                        <td className="px-2 py-3">{invoice.invoice_date}</td>
                        <td className=" whitespace-nowrap px-2 py-3">
                          {invoice.invoice_due_date}
                        </td>
                        <td className=" whitespace-nowrap px-2 py-3">
                          {invoice.total_order_amount}
                        </td>
                        <td className=" whitespace-nowrap px-2 py-3">
                          {invoice?.status_data?.label}
                        </td>
                        <td className=" whitespace-nowrap px-2 py-3">
                          {invoice?.created_user?.full_name}
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
                    invoices.from != null ? invoices.from : 0
                  } to ${invoices.to != null ? invoices.to : 0} of ${
                    invoices.total
                  } entries`}</p>
                </div>
                <div className="flex flex-row gap-2 ">
                  {invoices?.links?.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => getNextInvoices(link.url.slice(-7))}
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
  );
};

export default Invoice;
