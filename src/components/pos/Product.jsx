import React from "react";

import image from "../../assets/images/food.jpg";

const Product = () => {
  const handleAddToCart = (product) => {
    //dispatch(addItemToCart(product));
    console.log(product);
  };

  //Decrease product quantity
  const handleDecreaseCart = (product) => {
    console.log(product);
  };

  let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <div className=" flex flex-col bg-white shadow-md border rounded-lg justify-between cursor-pointer">
      <div className="flex w-full">
        <img
          src={image}
          className="w-full h-28 object-fit rounded-t-lg"
          alt={"product.name"}
        />
      </div>

      <div className="flex flex-col items-center p-3">
        <div className="flex flex-col items-center">
          <div className="text-md font-semibold w-full">
            <h3 className="text-clip ">{"Chicken"}</h3>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mb-2">
          <span className="self-end font-bold text-lg text-black">
            ₦ {dollarUSLocale.format(Math.round(100000))}
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
  );
};

export default Product;
