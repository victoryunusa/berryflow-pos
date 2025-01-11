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

const getOrder = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //console.log({ token, formData });

  const response = await axios.get(
    `${BaseUrl}/orders/show/${formData}`,
    config
  );

  return response.data.order;
};

//Add Order
const addOrder = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  };

  console.log(formData);

  const response = await axios.post(
    `${BaseUrl}/orders/store`,
    formData,
    config
  );

  console.log(response.data);

  return response.data;
};

const orderService = {
  getOrders,
  getOrder,
  addOrder,
};

export default orderService;
