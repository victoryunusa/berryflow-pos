import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getProducts } from "../../features/products/productSlice";

const Orders = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.products);

  const getNextProduct = (url) => {
    dispatch(getProducts(url));
  };

  const showProduct = (slug) => {
    navigate(`${slug}`);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <>
      <div className="flex flex-col space-y-5 font-br">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-neutral-700">POS Orders</h3>
            <p className="text-xs text-neutral-400">
              Select the plan that you want to subscribe to
            </p>
          </div>
          <div>
            <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-nelsa_primary text-white text-small font-semibold rounded-md"
            >
              Add New
            </button>
          </div>
        </div>
        <div className="bg-white border p-5 rounded-lg text-xs w-full">
          <div className="flex flex-col overflow-x-auto">
            <div className="">
              <div className="inline-block w-full py-2 sm:px-2 lg:px-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-neutral-500 rounded">
                    <thead className="text-md text-neutral-700 capitalize bg-neutral-100 border-b">
                      <tr>
                        <th className="px-2 py-3">Name</th>
                        <th className="px-2 py-3">Category</th>
                        <th className="px-2 py-3">Price</th>
                        <th className="px-2 py-3">Cost</th>
                        <th className="px-2 py-3">Costing Method</th>
                        <th className="px-2 py-3">Selling Method</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products?.data?.map((product, index) => (
                        <tr
                          className="bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50"
                          key={index}
                          onClick={() => showProduct(product.slug)}
                        >
                          <td className="px-2 py-3 font-semibold">
                            {product.name}
                          </td>
                          <td className="px-2 py-3">
                            {product?.category?.label}
                          </td>
                          <td className="px-2 py-3">
                            {product.price_excluding_tax}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {product.cost_excluding_tax}
                          </td>
                          <td className="px-2 py-3">
                            {product.costing_method}
                          </td>
                          <td className=" whitespace-nowrap px-2 py-3">
                            {product.selling_method}
                          </td>
                          <td className="">
                            <button className="underline px-2 py-1 text-xs text-cyan-500  rounded-md">
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="w-full "></tfoot>
                  </table>
                </div>

                <div className="flex flex-row gap-2 justify-between mt-5">
                  <div>
                    <p>{`Showing  ${products.from} to ${products.to} of ${products.total} entries`}</p>
                  </div>
                  <div className="flex flex-row gap-2 ">
                    {products?.links?.map((link, index) => (
                      <button
                        key={index}
                        onClick={() => getNextProduct(link.url.slice(-7))}
                        className={`${
                          link.active
                            ? "bg-nelsa_primary text-white"
                            : "border text-nelsa_primary"
                        } px-2 py-1 rounded-md`}
                        disabled={link.url == null ? true : false}
                      >
                        {link.label == "&laquo; Previous"
                          ? "<"
                          : link.label
                          ? link.label == "Next &raquo;"
                            ? ">"
                            : link.label
                          : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {visible && <AddProduct setOpen={setVisible} />}
    </>
  );
};

export default Orders;
