import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa6";
import { getBranches } from "../../../../features/branch/branchSlice";
import { getOrder } from "../../../../features/order/singleOrderSlice";
import { prettyDate } from "../../../../functions/functions";

const PrintOrder = ({ setOpen, slug, open }) => {
  const dispatch = useDispatch();
  const printRef = useRef();
  const [readyToPrint, setReadyToPrint] = useState(false); // To check if content is ready

  const { user } = useSelector((state) => state.user);
  const { branches } = useSelector((state) => state.branches);
  const activeBranch = branches?.find((branch) => branch.id === user.branch_id);
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getBranches());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrder(slug));
  }, [dispatch, slug]);

  // Set readyToPrint to true after order and branch data is available
  useEffect(() => {
    if (order && activeBranch) {
      setReadyToPrint(true);
    }
  }, [order, activeBranch]);

  const handlePrint = () => {
    if (printRef.current) {
      // Make sure content is rendered before printing
      window.print();
    }
  };

  if (typeof document !== "undefined") {
    return createPortal(
      <>
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div
            className="fixed inset-0 w-full h-full bg-black opacity-40"
            onClick={setOpen}
          ></div>
          <div className="flex items-center min-h-screen px-4 py-4">
            <div
              className="relative w-full max-w-md p-4 md:p-5 mx-auto font-br bg-white rounded-md print-container printable-area"
              ref={printRef}
            >
              {readyToPrint ? (
                <div className="w-full printable-area">
                  <div className="flex flex-col">
                    <div className="flex flex-col items-center justify-center my-5">
                      <h1 className="text-2xl font-extrabold">
                        {user?.vendor.business_name}
                      </h1>
                      <h2>{activeBranch?.name}</h2>
                      <p className="text-center">
                        Address: {activeBranch?.address}
                      </p>
                      {activeBranch?.primary_contact && (
                        <p className="text-center">
                          Phone: {activeBranch?.primary_contact}
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col border-y border-dashed border-neutral-600 py-2 text-sm">
                      <div>
                        <p className="font-semibold">
                          Order #{order?.order_number}
                        </p>
                      </div>
                      <div>
                        <p>{prettyDate(order?.created_at_label)}</p>
                      </div>
                      <p className="">
                        Payment Method:{" "}
                        <span className="font-bold">
                          {order?.payment_method}
                        </span>
                      </p>
                      <p className="">
                        Order Type:{" "}
                        <span className="font-bold">{order?.order_type}</span>
                      </p>
                      <p className="">
                        Billing Type:{" "}
                        <span className="font-bold">
                          {order?.billing_type_data?.label}
                        </span>
                      </p>
                      <p className="">
                        Table: <span className="font-bold">-</span>
                      </p>
                      <p className="">
                        Waiter: <span className="font-bold">-</span>
                      </p>
                    </div>
                    <div className="flex flex-row py-2 text-sm font-semibold justify-between">
                      <div className="flex w-2/3">
                        <p className="w-1/6">Qty</p>
                        <p>Item Description</p>
                      </div>
                      <div className="">
                        <p>Price</p>
                      </div>
                    </div>
                    <div className="flex flex-col text-sm border-y border-dashed border-neutral-600 py-2">
                      {order?.products?.map((product, index) => (
                        <div
                          key={index}
                          className="flex flex-row justify-between my-0.5"
                        >
                          <div className="flex w-2/3">
                            <p className="w-1/6">{product.quantity}</p>
                            <p>{product.name}</p>
                          </div>
                          <div className="">
                            <p>
                              {order.currency_code} {product.total_price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Print Button */}
                    <div className="mt-5 flex flex-row items-center justify-center gap-3 my-3 export-hide">
                      <button
                        onClick={setOpen}
                        className="w-1/3 flex flex-row items-center px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700"
                      >
                        <FaIcons.FaX size={15} className="mr-2" />
                        Close
                      </button>
                      <button
                        onClick={handlePrint}
                        className="w-1/3 flex flex-row items-center px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700"
                      >
                        <FaIcons.FaPrint size={15} className="mr-2" />
                        Print
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>Loading...</div>
              )}
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

export default PrintOrder;
