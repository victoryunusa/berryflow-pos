import React from "react";

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
    <div className=" flex flex-col bg-white shadow-md border rounded-lg justify-between">
      {/* <div className="flex items-center justify-center">
        <img
          src={"http://localhost:8888/nelsa-api/storage/app/public/product/"}
          className="h-20 w-20 object-fit rounded-lg"
          alt={"product.name"}
        />
      </div> */}

      <div className="p-3">
        <div className="flex flex-col">
          <div className="text-xs font-semibold w-full">
            <h3 className="text-clip ">{"Chicken"}</h3>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center mb-2">
          <span className="self-end font-bold text-xs text-black">
            ₦ {dollarUSLocale.format(Math.round(100000))}
          </span>
        </div>
        <div className="w-full">
          <div className=" ">
            <button
              className="p-1 flex items-center justify-center text-white rounded-md bg-black hover:bg-zinc-900 w-full"
              onClick={() => handleAddToCart({ name: "Chicken" })}
            >
              <span className="text-xs">Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
