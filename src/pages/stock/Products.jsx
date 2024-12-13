import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "../../components/modals/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../features/products/productSlice";
import { textEllipsis } from "../../functions/functions";

const Products = () => {
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

  let dollarUSLocale = Intl.NumberFormat("en-US");

  return (
    <>
      <div className="flex flex-col space-y-5 font-br">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-gray-700">Products</h3>
            <p className="text-xs text-neutral-400">
              List of all menu product items
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

        <div className="grid grid-cols-2 md:grid-cols-6 gap-5 bg-zinc-100 ">
          {products?.data?.map((product, index) => (
            <div
              key={index}
              className="flex flex-col bg-white shadow-md border rounded-xl cursor-pointer h-64 p-2"
              onClick={() => showProduct(product.slug)}
            >
              <div className="flex w-full h-28 bg-contain">
                <img
                  src={
                    "https://pub-c53156c3afbd424aa9f8f46985cf39b7.r2.dev/nelsa-app/" +
                    product?.product_images[0]?.filename
                  }
                  className="w-full rounded-t-lg"
                  alt={product.name}
                />
              </div>
              <div className="flex flex-col gap-1.5 bg-neutral-100 p-2 rounded">
                <div className=" w-full">
                  <p className="text-sm md:text-md font-semibold text-neutral-700">
                    {textEllipsis(product.name, 20)}
                  </p>
                  <span>
                    <p className="text-xs">{product.category.label}</p>
                  </span>
                </div>
                <div className="flex flex-row">
                  <span className="self-end font-bold text-base md:text-md text-nelsa_primary">
                    ₦
                    {dollarUSLocale.format(
                      parseFloat(product.price_including_tax).toFixed(2)
                    )}
                  </span>
                </div>
                <div className="w-full flex flex-row gap-2">
                  <button className="p-2 flex items-center justify-center text-white rounded-md bg-black hover:bg-neutral-700 w-full">
                    <span className="text-sm font-semibold">View</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-2 justify-between mt-5 text-sm">
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
      {visible && <AddProduct setOpen={setVisible} />}
    </>
  );
};

export default Products;
