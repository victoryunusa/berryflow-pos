import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getBillCounters = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/bill_counters/list`, config);

  //console.log(response.data);

  return response.data.bill_counters;
};

const addBillCounter = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  console.log(formData);

  await axios.post(`${BaseUrl}/bill_counters/store`, formData, config);

  //return response.data.products;
};

const billCounterService = {
  addBillCounter,
  getBillCounters,
};

export default billCounterService;
