import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as FaIcons from "react-icons/fa6";

const ProductModal = ({ setOpen, open, product }) => {
  const [loading, setLoading] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(null);
  const [addons, setAddons] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const temp = {
      name: product.name,
      slug: product.slug,
      item_id: product.id,
      quantity: 1,
      discount: 0,
      price: product.price,
      convert_price: 0,
      item_variations: {
        variations: {},
        names: {},
      },
      item_extras: {
        extras: [],
        names: [],
      },
      item_variation_total: 0,
      item_extra_total: 0,
      total_price: product.price,
      instruction: "",
    };

    if (product.variant_options.length > 0) {
      product.variant_options.forEach((option) => {
        if (
          product.variants[option.id] &&
          product.variants[option.id].length > 0 &&
          typeof product.variants[option.id][0] !== "undefined"
        ) {
          temp.item_variations.variations[
            product.variants[option.id][0].variant_option_id
          ] = product.variants[option.id][0].id;
          temp.item_variations.names[option.id] =
            product.variants[option.id][0].name;
          temp.item_variation_total += product.variants[option.id][0].price * 1;
        }
      });
    }

    setCurrentTemp(temp);
    totalPriceSetup(temp);
  }, [product]);

  const setVariant = (
    variantOptionId,
    variantId,
    variantName,
    variantPrice
  ) => {
    setCurrentTemp((prevTemp) => {
      const newTemp = { ...prevTemp };
      newTemp.item_variations.variations[variantOptionId] = variantId;
      newTemp.item_variations.names[variantOptionId] = variantName;
      totalPriceSetup(newTemp);
      return newTemp;
    });
  };

  const totalPriceSetup = (temp) => {
    let item_variation_total = 0;
    let item_extra_total = 0;
    let item_addon_total = 0;

    Object.entries(temp.item_variations.variations).forEach(
      ([attributeId, variationId]) => {
        const variations = product.variants[attributeId] || [];
        variations.forEach((itemVariation) => {
          if (variationId === itemVariation.id) {
            item_variation_total += itemVariation.price * 1;
          }
        });
      }
    );

    temp.item_extras.extras.forEach((extraId) => {
      product.extras.forEach((itemExtra) => {
        if (extraId === itemExtra.id) {
          item_extra_total += parseFloat(itemExtra.price / 2);
        }
      });
    });

    // Assuming addons is an array of objects with total_price and quantity properties
    Object.values(addons).forEach((addon) => {
      item_addon_total += addon.total_price * 1 * addon.quantity;
    });

    temp.item_variation_total = item_variation_total;
    temp.item_extra_total = item_extra_total;
    temp.total_price =
      (product.price * 1 + temp.item_variation_total + temp.item_extra_total) *
      temp.quantity;
    item_addon_total;

    setCurrentTemp(temp);
  };

  const changeExtra = (e, id, name) => {
    setCurrentTemp((prevTemp) => {
      const newTemp = { ...prevTemp };

      if (e.target.checked) {
        newTemp.item_extras.extras.push(id);
        newTemp.item_extras.names.push(name);
      } else {
        newTemp.item_extras.extras = newTemp.item_extras.extras.filter(
          (extraId) => extraId !== id
        );
        newTemp.item_extras.names = newTemp.item_extras.names.filter(
          (extraName) => extraName !== name
        );
      }

      totalPriceSetup(newTemp);
      console.log(newTemp);
      return newTemp;
    });
  };

  const quantityUp = (e) => {
    setCurrentTemp((prevTemp) => {
      const newTemp = { ...prevTemp };

      newTemp.quantity = e;
      // if (newTemp.quantity <= 0) {
      //   newTemp.quantity = 1;
      // }

      totalPriceSetup(newTemp);
      return newTemp;
    });
  };

  const quantityIncrement = () => {
    setCurrentTemp((prevTemp) => {
      const newTemp = { ...prevTemp };
      newTemp.quantity++;
      if (newTemp.quantity <= 0) {
        newTemp.quantity = 1;
      }
      totalPriceSetup(newTemp);
      return newTemp;
    });
  };

  const quantityDecrement = () => {
    setCurrentTemp((prevTemp) => {
      const newTemp = { ...prevTemp };
      newTemp.quantity--;
      if (newTemp.quantity <= 0) {
        newTemp.quantity = 1;
      }
      totalPriceSetup(newTemp);
      return newTemp;
    });
  };

  if (!currentTemp || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <>
      <div className="fixed inset-0 z-[999] overflow-y-auto">
        <div className="fixed inset-0 w-full h-full bg-black opacity-40"></div>
        <div className="flex mt-20 px-4 py-4">
          <div className="relative w-full max-w-xl p-4 md:p-5 mx-auto bg-white rounded-md shadow-lg">
            <div className="flex flex-col w-full gap-3">
              <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row gap-5">
                    <div>
                      <img
                        src={
                          "https://pub-c53156c3afbd424aa9f8f46985cf39b7.r2.dev/nelsa-app/" +
                          product.images[0].filename
                        }
                        className="w-20 h-20 object-fit rounded-lg"
                        alt={product.name}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-sm text-neutral-700 font-bold">
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-500">
                        {product.description}
                      </p>
                      <h3 className="text-sm text-neutral-700 font-bold">
                        {product.price}
                      </h3>
                    </div>
                  </div>
                  <div
                    onClick={() => setOpen(false)}
                    className="cursor-pointer"
                  >
                    <FaIcons.FaXmark size={20} className="text-red-600" />
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2">
                <h4 className="text-neutral-700 text-xs font-bold">
                  Quantity:
                </h4>
                <div className="flex items-center bg-neutral-100 p-1 rounded-md">
                  <button
                    className="inline-flex items-center justify-center p-1 text-sm font-medium h-[1.85rem] w-[1.85rem] text-neutral-500 bg-white border border-neutral-300 rounded-md focus:outline-none hover:bg-neutral-100"
                    type="button"
                    onClick={() => {
                      quantityDecrement();
                    }}
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <div>
                    <input
                      type="number"
                      value={currentTemp.quantity}
                      onChange={(e) => quantityUp(e.target.value)}
                      className="bg-neutral-100 w-14 text-center text-neutral-600 text-sm focus:outline-none block px-2.5 py-1"
                      placeholder="1"
                      required
                    />
                  </div>
                  <button
                    className="inline-flex items-center justify-center h-[1.85rem] w-[1.85rem] p-1 text-sm font-medium text-neutral-500 bg-white border border-neutral-300 rounded-md focus:outline-none hover:bg-neutral-100"
                    type="button"
                    onClick={() => {
                      quantityIncrement();
                    }}
                  >
                    <span className="sr-only">Quantity button</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* {product.variant_options.length > 1 && (
                <div className="flex flex-row gap-3">
                  {product.variant_options.map((option, index) => (
                    <div className="flex flex-col gap-1 w-1/2" key={index}>
                      <h4 className="text-neutral-700 text-xs font-bold">
                        {option.label}:
                      </h4>
                      <div className="flex flex-row gap-5">
                        <select
                          name="tax_type"
                          className="w-full px-4 py-3 mt-1 border text-neutral-500 text-sm rounded-md focus:outline-none focus:border-blue-950"
                          onChange={(e) => {
                            const selectedVariant = product.variants[
                              option.id
                            ].find((v) => v.id === e.target.value);
                            setVariant(
                              option.id,
                              selectedVariant.id,
                              selectedVariant.name,
                              selectedVariant.price
                            );
                          }}
                        >
                          {product.variants[option.id].map((variant, index) => (
                            <option value={variant.id} key={index}>
                              {variant.name} +{variant.price}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )} */}
              {product.variant_options.length >= 1 && (
                <div className="flex flex-col w-full">
                  {product.variant_options.map((option, index) => (
                    <div
                      className="flex flex-col gap-1 my-2 w-full"
                      key={index}
                    >
                      <h4 className="text-neutral-700 text-xs font-bold">
                        {option.label}:
                      </h4>
                      <div className="flex flex-row gap-3">
                        {product.variants[option.id] &&
                          product.variants[option.id].map((variant, index) => (
                            <button
                              className={`flex flex-row gap-3 p-2.5 border w-1/3 text-neutral-600 ${
                                currentTemp.item_variations.variations[
                                  option.id
                                ] === variant.id
                                  ? "border-green-400 bg-green-50"
                                  : ""
                              } hover:border-green-400 hover:bg-green-50 rounded-md`}
                              key={index}
                              onClick={() =>
                                setVariant(
                                  variant.variant_option_id,
                                  variant.id,
                                  variant.name,
                                  variant.price
                                )
                              }
                            >
                              <span className="flex flex-col">
                                <p className="w-full text-xs">{variant.name}</p>
                                <p className="w-full text-[0.75rem] font-bold">
                                  {variant.price}
                                </p>
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {product.extras.length >= 1 && (
                <div className="flex flex-row">
                  <div className="flex flex-col w-full">
                    <h4 className="text-neutral-700 text-xs font-bold">
                      Extras:
                    </h4>
                    <div className="flex flex-row gap-3 w-full items-center">
                      {product.extras.map((extra, index) => (
                        <label
                          key={index}
                          className="flex flex-row items-center w-1/3 gap-3 p-2.5 text-neutral-600 border hover:border-green-400 hover:bg-green-50 rounded-md hover:cursor-pointer"
                        >
                          <input
                            className="relative peer shrink-0
                            appearance-none w-4 h-4 border border-green-500 rounded bg-white
                            mt-1
                            checked:bg-green-600 checked:border-0"
                            type="checkbox"
                            onChange={(e) =>
                              changeExtra(e, extra.id, extra.name)
                            }
                          />
                          <svg
                            className="
      absolute 
      w-2 h-2 mt-1 ml-1
      hidden peer-checked:block text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                          <div className="">
                            <div className="w-full text-xs">{extra.name}</div>
                            <div className="w-full text-[0.75rem] font-bold">
                              {extra.price}
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <h4 className="text-neutral-700 text-xs font-bold">Addons</h4>
                  <div></div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <h4 className="text-neutral-700 text-xs font-bold">
                    Special Instructions
                  </h4>
                  <div></div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className={`w-full  ${
                    currentTemp.total_price === 0
                      ? "bg-neutral-200 text-neutral-500"
                      : "bg-nelsa_primary text-white"
                  } p-3 rounded-md `}
                  onClick={() => {
                    // Add to cart logic here
                    console.log(currentTemp);
                  }}
                  disabled={currentTemp.total_price === 0 ? true : false}
                >
                  Add to cart - {currentTemp.total_price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

export default ProductModal;
