import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getCustomers = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const page = formData ? formData : "";

  const response = await axios.get(`${BaseUrl}/customers/list?${page}`, config);

  //console.log(response.data);

  return response.data.customers;
};

const addCustomer = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  console.log(formData);

  await axios.post(`${BaseUrl}/customers/store`, formData, config);

  //return response.data.products;
};

const customerService = {
  addCustomer,
  getCustomers,
};

export default customerService;
