import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getOrders } from "../../features/order/orderSlice";
import { Link } from "react-router-dom";

const Orders = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders } = useSelector((state) => state.orders);

  const getNextProduct = (url) => {
    dispatch(getOrders(url));
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
              <button className="px-3 py-2 bg-nelsa_primary text-white text-small font-semibold rounded-md">
                Add New
              </button>
            </Link>
            {/* <button
              onClick={() => setVisible(true)}
              className="px-3 py-2 bg-nelsa_primary text-white text-small font-semibold rounded-md"
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
        <div className="bg-white border p-5 rounded-lg text-xs w-full">
          <div className="flex flex-col overflow-x-auto">
            <div className="">
              <div className="inline-block w-full py-2 sm:px-2 lg:px-4">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-neutral-500 rounded">
                    <thead className="text-md text-neutral-700 capitalize bg-neutral-100 border-b">
                      <tr>
                        <th className="px-2 py-3">Order number</th>
                        <th className="px-2 py-3">Customer Name</th>
                        <th className="px-2 py-3">Email</th>
                        <th className="px-2 py-3">Amount</th>
                        <th className="px-2 py-3">Status</th>
                        <th className="px-2 py-3">Payment status</th>
                        <th className="px-2 py-3">Date</th>
                        <th className="px-2 py-3">Created by</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders?.data?.map((order, index) => (
                        <tr
                          className="bg-white border-b font-normal text-small text-neutral-700 cursor-pointer hover:bg-neutral-50"
                          key={index}
                          onClick={() => showProduct(order.slug)}
                        >
                          <td className="px-2 py-3 font-semibold">
                            {order.order_number}
                          </td>
                          <td className="px-2 py-3">{order?.customer_name}</td>
                          <td className="px-2 py-3">{order.customer_email}</td>
                          <td className="px-2 py-3">
                            {order.total_order_amount}
                          </td>
                          <td className="px-2 py-3">{order.status}</td>
                          <td className="px-2 py-3">{order.payment_status}</td>
                          <td className="px-2 py-3">{order.created_at}</td>
                          <td className="px-2 py-3">{order.created_by}</td>
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
                    <p>{`Showing  ${orders.from} to ${orders.to} of ${orders.total} entries`}</p>
                  </div>
                  <div className="flex flex-row gap-2 ">
                    {orders?.links?.map((link, index) => (
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
