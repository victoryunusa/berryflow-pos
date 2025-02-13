import React, { useState } from "react";

import ProductModal from "./modals/ProductModal";
import { play_beep, textEllipsis } from "../../functions/functions";
import PopUpModal from "./modals/PopUpModal";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../features/pos/cartSlice";

const Product = ({ product }) => {
  const { user } = useSelector((state) => state.user);

  const { branches } = useSelector((state) => state.branches);

  const activeBranch = branches?.find(
    (branch) => branch.id === user?.branch_id
  );

  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    var tax_type =
      product.tax_code != null ? product.tax_code.tax_type : "EXCLUSIVE";
    var product_sale_price =
      tax_type == "EXCLUSIVE"
        ? product.price_including_tax
        : product.price_excluding_tax;

    var tax_percentage =
      product.tax_code != null
        ? parseFloat(product.tax_code.total_tax_percentage)
        : 0;
    var discount_percentage =
      product.discount_code != null
        ? parseFloat(product.discount_code.discount_percentage)
        : 0;

    var product_data = {
      product_slug: product.slug,
      product_code: product.product_code,
      name: product.name,
      price: product_sale_price,
      tax_percentage: tax_percentage != null ? tax_percentage : 0.0,
      discount_percentage:
        discount_percentage != null ? discount_percentage : 0.0,

      customizable: product.customizable,
      price_including_tax: product.price_including_tax,
      tax_type: tax_type,
    };

    if (product?.variants?.length > 0) {
      setOpenModal(true);
      console.log(product_data);
    } else {
      dispatch(addItemToCart(product_data));
      play_beep();
    }
  };

  //Decrease product quantity

  let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <>
      <div
        onClick={() => handleAddToCart(product)}
        className="flex flex-col justify-between bg-white hover:shadow border rounded-lg cursor-pointer h-36 p-3"
      >
        <div>
          <div className="flex flex-row justify-between items-center w-full gap-2">
            <div>
              <div className=" w-full space-y-2">
                <p className="text-xs md:text-xs font-normal text-neutral-700">
                  Code: {textEllipsis(product.product_code, 20)}
                </p>
                <p className="text-xs md:text-sm font-bold text-tt_rich_black">
                  {textEllipsis(product.name, 25)}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full gap-3 mt-2">
            <div className=" w-full">
              {product?.discount_code && (
                <p className="text-sm md:text-xs text-green-500">
                  Discount: {product?.discount_code?.discount_percentage}%
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-row">
            <span className="self-end font-bold text-xs md:text-lg text-neutral-700">
              {activeBranch?.currency?.symbol}
              {dollarUSLocale.format(
                parseFloat(product.price_excluding_tax).toFixed(2)
              )}
            </span>
          </div>
          <img
            src={
              "https://pub-c53156c3afbd424aa9f8f46985cf39b7.r2.dev/nelsa-app/" +
              product?.images[0]?.filename
            }
            className="w-12 h-12 rounded"
            alt={product.name}
          />
          {/* <div className="">
            <button
              className="px-2 py-1 flex items-center justify-center text-white font-semibold rounded bg-tt_rich_black hover:bg-tt_rich_black/80 w-full"
              //onClick={() => handleAddToCart({ name: "Chicken" })}
            >
              <span className="text-xs">Add to cart</span>
            </button>
          </div> */}
        </div>
      </div>
      {openModal && <PopUpModal setOpen={setOpenModal} product={product} />}
    </>
  );
};

export default Product;
