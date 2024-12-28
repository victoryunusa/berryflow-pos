import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

// GET Order
const getOrders = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const page = formData ? formData : "";

  const response = await axios.get(`${BaseUrl}/orders/list${page}`, config);
  //   localStorage.setItem("accounts", JSON.stringify(response.data.accounts));
  return response.data.orders;
};

//Add Order
const addOrder = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/orders/store`, formData, config);

  //return response.data.products;
};

const orderService = {
  getOrders,
  addOrder,
};

export default orderService;