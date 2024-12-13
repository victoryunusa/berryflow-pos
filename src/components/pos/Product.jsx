import React, { useState } from "react";

import ProductModal from "./modals/ProductModal";
import { textEllipsis } from "../../functions/functions";

const Product = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleAddToCart = (product) => {
    //dispatch(addItemToCart(product));
    console.log(product);
  };

  //Decrease product quantity

  let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="flex flex-col bg-white shadow-md border rounded-lg cursor-pointer h-36"
      >
        <div className="flex w-full h-2/3">
          <img
            src={
              "https://pub-c53156c3afbd424aa9f8f46985cf39b7.r2.dev/nelsa-app/" +
              product?.images[0]?.filename
            }
            className="w-full rounded-t-lg"
            alt={product.name}
          />
        </div>

        <div className="flex flex-col p-2 h-1/2">
          <div className=" w-full">
            <p className="text-xs md:text-xs font-normal text-neutral-700">
              {textEllipsis(product.name, 20)}
            </p>
          </div>
          <div className="flex flex-row">
            <span className="self-end font-bold text-xs md:text-md text-neutral-700">
              ₦{dollarUSLocale.format(parseFloat(product.price).toFixed(2))}
            </span>
          </div>
          {/* <div className="w-full">
          <div className=" ">
            <button
              className="p-1 flex items-center justify-center text-white rounded-md bg-black hover:bg-zinc-900 w-full"
              onClick={() => handleAddToCart({ name: "Chicken" })}
            >
              <span className="text-xs">Add to cart</span>
            </button>
          </div>
        </div> */}
        </div>
      </div>
      {openModal && <ProductModal setOpen={setOpenModal} product={product} />}
    </>
  );
};

export default Product;
