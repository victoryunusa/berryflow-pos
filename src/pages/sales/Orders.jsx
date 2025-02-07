import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getOrders } from "../../features/order/orderSlice";
import { Link } from "react-router-dom";
import { prettyDate, textEllipsis } from "../../functions/functions";

const Orders = () => {
  //const [visible, setVisible] = useState(false);

  const [productFilter, setProductFilter] = useState("billing_products");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders({ page, productFilter }));
  }, [dispatch, productFilter, page]);

  const handleFilterChange = (filter) => {
    setProductFilter(filter);
    setPage(1); // Reset to the first page on filter change
  };

  const getNextProduct = (page) => {
    setPage(page); // Update current page
  };

  const showProduct = (slug) => {
    navigate(`${slug}`);
  };

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-5 font-br">
        <div className="flex flex-row justify-between items-center">
          <div className="">
            <h3 className="text-lg font-bold text-neutral-700">Orders</h3>
            <p className="text-xs text-neutral-400">
              Select the plan that you want to subscribe to
            </p>
          </div>
          <div>
            <Link to="/pos">
              <button className="px-3 py-2 bg-tt_rich_black text-white text-small font-semibold rounded-md">
                Add New
              </button>
            </Link>
            {/* <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-tt_rich_black text-white text-small font-semibold rounded-md"
            >
              Add New
            </button> */}
          </div>
        </div>
        <div className="flex gap-5">
          <select
            className={`w-1/5 px-3 py-2.5 border border-neutral-300 text-neutral-600 text-small rounded-md focus:outline-none`}
            // onChange={(e) => handleFilterChange(e.target.value)}
            // value={productFilter}
          >
            <option value="default_filter">All</option>
            <option value="billing_products">Billing Products</option>
            <option value="addon_products">Add-on Products</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-zinc-100 ">
          {orders?.data?.map((order, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border rounded-lg cursor-pointer p-4 gap-2 hover:shadow"
              onClick={() => showProduct(order.slug)}
            >
              <div className="flex flex-col gap-1.5 rounded">
                <div className="flex flex-row justify-between items-center gap-3">
                  <div className="flex flex-row items-center gap-2">
                    <span className="w-12 h-12 bg-tt_uranian_blue-800 p-2 rounded-md flex items-center justify-center">
                      <p>T</p>
                    </span>
                    <span className="flex flex-col gap-1">
                      <p className="text-sm md:text-md font-semibold text-neutral-700">
                        {order.customer_name ? order.customer_name : "--"}
                      </p>
                      <p className="text-sm font-semibold text-neutral-700">
                        #{order.order_number}
                      </p>
                    </span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs bg-green-100 text-green-800 font-semibold p-1 rounded-md">
                      {order?.status_data.label}
                    </span>
                    <p className="text-xs font-semibold text-neutral-700">
                      Order is closed
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-between items-center mb-3">
                  <div className="flex flex-row items-center gap-1">
                    <p className="text-xs font-normal">
                      {prettyDate(order.created_at)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-sm font-semibold">{order?.order_type}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-row justify-between gap-1.5 border-t pt-2">
                <div className="">
                  <p className="text-sm md:text-lg font-bold">
                    {order.currency_code} {order.total_order_amount}
                  </p>
                </div>
                <div className="">
                  <p className="text-sm md:text-md font-semibold ">
                    {order.created_user.full_name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-row gap-2 justify-between mt-5">
          <div>
            <p>{`Showing  ${orders.from} to ${orders.to} of ${orders.total} entries`}</p>
          </div>
          <div className="flex flex-row gap-2 ">
            {orders?.links?.map((link, index) => (
              <button
                key={index}
                onClick={() => getNextProduct(link.url.split("=")[1])}
                className={`${
                  link.active
                    ? "bg-tt_rich_black text-white"
                    : "border text-tt_rich_black"
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
      {/* {visible && <AddProduct setOpen={setVisible} />} */}
    </>
  );
};

export default Orders;
