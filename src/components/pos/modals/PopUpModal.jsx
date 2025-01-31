import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa6";
import { addItemToCart } from "../../../features/pos/cartSlice";
import { play_beep } from "../../../functions/functions";

const PopUpModal = ({ setOpen, open, product }) => {
  const currentTemp = 0;
  if (typeof document !== "undefined") {
    return createPortal(
      <>
        <div className="fixed inset-0 z-[999] overflow-y-auto">
          <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
          <div className="flex items-center min-h-screen px-4 py-4">
            <div className="relative w-full max-w-xl p-4 md:p-5 mx-auto font-br bg-white rounded-md shadow-lg">
              <div className="w-full">
                <div className="flex flex-col justify-center">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold text-tt_rich_black">
                      Choose Variant {product.name}
                    </h3>
                    <div
                      onClick={() => setOpen(false)}
                      className="cursor-pointer"
                    >
                      <FaIcons.FaXmark size={20} className="text-red-600" />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-col justify-center items-center"></div>
                  <div>
                    <button
                      type="button"
                      className={`w-full  ${
                        currentTemp === 0
                          ? "bg-neutral-200 text-neutral-500"
                          : "bg-tt_rich_black text-white"
                      } p-3 rounded-md `}
                      //   onClick={() => {
                      //     // Add to cart logic here
                      //     handleAddToCart(currentTemp);
                      //     setOpen(false);
                      //   }}
                    >
                      Add to order -
                    </button>
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

export default PopUpModal;
