import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../../features/products/singleProductSlice";
import { useNavigate, useParams } from "react-router";
import AddVariation from "../../../components/modals/product/AddVariation";
import AddExtra from "../../../components/modals/product/AddExtra";

const SingleProduct = () => {
  const [openVariation, setOpenVariation] = useState(false);
  const [openExtra, setOpenExtra] = useState(false);
  const dispatch = useDispatch();
  const { slug } = useParams();
  const navigate = useNavigate();

  const { product } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(slug));
  }, []);
  return (
    <div className="flex flex-col space-y-10">
      {/* Top */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row items-center gap-3">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => window.history.back()}
          >
            <p className="text-sm text-blue-800">{"< Back"}</p>
          </div>
          <div>
            <h3 className="font-bold text-xl">{product.name}</h3>
          </div>

          <span className="flex items-center px-2 h-5 rounded-md bg-green-700 text-white text-xs font-bold">
            Active
          </span>
        </div>
        <div className="flex flex-row gap-3">
          <span className="flex items-center px-4 py-3 rounded-md bg-neutral-200 text-neutral-500 text-xs font-bold">
            Deactivate product
          </span>
          <span className="flex items-center px-4 py-3 rounded-md bg-blue-700 text-white text-xs font-bold">
            Edit product
          </span>
        </div>
      </div>
      {/* Product Info */}
      <div className="bg-white border p-5 rounded-lg text-xs w-full"></div>

      {/* Variations */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-3">
            <div>
              <h3 className="font-bold text-md">Variations</h3>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <button
              onClick={() => setOpenVariation(true)}
              className="flex items-center px-4 py-3 rounded-md bg-neutral-200 text-neutral-500 text-xs font-bold"
            >
              Add variation
            </button>
          </div>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs w-full">
          {product?.variants?.length != 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-neutral-500 ">
                <thead className="text-md text-neutral-700 capitalize bg-neutral-50 border-b">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-neutral-100 border-neutral-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="sr-only">checkbox</label>
                      </div>
                    </th>
                    <th className="px-2 py-4">Code</th>
                    <th className="px-2 py-4">Name</th>
                    <th className="px-2 py-4">Price</th>
                    <th className="px-2 py-4">Variant Otion</th>
                    <th className="px-2 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {product?.variants?.map((variation, index) => (
                    <tr
                      className="odd:bg-white even:bg-neutral-50 border-b font-medium text-sm cursor-pointer hover:bg-neutral-100"
                      key={index}
                      // onClick={() => showProduct(product.slug)}
                    >
                      <td className="w-4 p-4"></td>
                      <td className="px-2 py-4 font-bold">
                        {variation.variant_code}
                      </td>
                      <td className="px-2 py-4 font-bold">{variation.name}</td>
                      <td className="px-2 py-4 font-bold">{variation.price}</td>
                      <td className="px-2 py-4 font-bold">
                        {variation.variant_option_id}
                      </td>
                      <td className="px-2 py-4 font-bold">
                        <span className="px-2 py-1 text-xs bg-green-100 rounded text-green-600">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>

      {/* Extras */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-3">
            <div>
              <h3 className="font-bold text-md">Extras</h3>
            </div>
          </div>
          <button
            className="flex flex-row gap-3"
            onClick={() => setOpenExtra(true)}
          >
            <span className="flex items-center px-4 py-3 rounded-md bg-neutral-200 text-neutral-500 text-xs font-bold">
              Add exras
            </span>
          </button>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs w-full">
          {product?.extras?.length != 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-neutral-500 ">
                <thead className="text-md text-neutral-700 capitalize bg-neutral-50 border-b">
                  <tr>
                    <th scope="col" className="p-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-neutral-100 border-neutral-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label className="sr-only">checkbox</label>
                      </div>
                    </th>
                    <th className="px-2 py-4">Code</th>
                    <th className="px-2 py-4">Name</th>
                    <th className="px-2 py-4">Price</th>
                    <th className="px-2 py-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {product?.extras?.map((extra, index) => (
                    <tr
                      className="odd:bg-white even:bg-neutral-50 border-b font-medium text-sm cursor-pointer hover:bg-neutral-100"
                      key={index}
                      // onClick={() => showProduct(product.slug)}
                    >
                      <td className="w-4 p-4"></td>
                      <td className="px-2 py-4 font-bold">
                        {extra.extra_code}
                      </td>
                      <td className="px-2 py-4 font-bold">{extra.name}</td>
                      <td className="px-2 py-4 font-bold">{extra.price}</td>
                      <td className="px-2 py-4 font-bold">
                        <span className="px-2 py-1 text-xs bg-green-100 rounded text-green-600">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>

      {/* Addon */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-3">
            <div>
              <h3 className="font-bold text-md">Addon</h3>
            </div>
          </div>
          <button className="flex flex-row gap-3">
            <span className="flex items-center px-4 py-3 rounded-md bg-neutral-200 text-neutral-500 text-xs font-bold">
              Add add-on product
            </span>
          </button>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs w-full"></div>
      </div>

      {/* Ingredients */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center gap-3">
            <div>
              <h3 className="font-bold text-md">Ingredients</h3>
            </div>
          </div>
          <button className="flex flex-row gap-3">
            <span className="flex items-center px-4 py-3 rounded-md bg-neutral-200 text-neutral-500 text-xs font-bold">
              Add ingredient
            </span>
          </button>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs w-full"></div>
      </div>
      {openVariation && (
        <AddVariation product_slug={product.slug} setOpen={setOpenVariation} />
      )}
      {openExtra && (
        <AddExtra product_slug={product.slug} setOpen={setOpenExtra} />
      )}
    </div>
  );
};

export default SingleProduct;
