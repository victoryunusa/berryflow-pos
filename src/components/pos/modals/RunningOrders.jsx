import React from "react";
import { createPortal } from "react-dom";

import * as FaIcons from "react-icons/fa6";

const RunningOrders = ({ setOpen }) => {
  if (typeof document !== "undefined") {
    return createPortal(
      <>
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="flex items-center justify-end min-h-screen">
            <div className="relative w-full max-w-lg h-screen  font-br bg-white rounded-l-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between border-b px-6 py-4">
                    <h3 className="text-md font-bold">Running Orders</h3>

                    <div
                      onClick={() => setOpen(false)}
                      className="cursor-pointer"
                    >
                      <FaIcons.FaXmark size={20} className="text-red-600" />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col justify-center items-center"></div>
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

export default RunningOrders;
