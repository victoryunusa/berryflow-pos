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
    <div className="flex flex-col bg-white shadow-md border rounded-lg cursor-pointer h-52">
      <div className="flex w-full h-2/3">
        <img
          src={image}
          className="w-full  object-fill rounded-t-lg"
          alt={"product.name"}
        />
      </div>

      <div className="flex flex-col items-start justify-between m-1 md:m-2 h-1/3">
        <div className="flex flex-col items-center">
          <div className=" w-full">
            <p className="text-xs md:text-xs font-normal text-neutral-500">
              Chicken
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mb-2">
          <span className="self-end font-bold text-xs md:text-md text-neutral-700">
            ₦{dollarUSLocale.format(Math.round(100000))}
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
