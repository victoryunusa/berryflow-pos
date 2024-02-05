import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getPurchaseOrders = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/purchase_order/list`, config);

  //console.log(response.data);

  return response.data.purchase_orders;
};

const addPurchaseOrder = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  await axios.post(`${BaseUrl}/purchase_order/store`, formData, config);

  //return response.data.products;
};

const purchaseOrderService = {
  getPurchaseOrders,
  addPurchaseOrder,
};

export default purchaseOrderService;
