import axios from "axios";
//import { history } from "../../utils/helpers";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;
// const headers = {
//   "Content-Type": "application/json; charset=utf-8",
// };

// GET Countries
const getTaxes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const response = await axios.get(`${BaseUrl}/taxes/list`, config);
  localStorage.setItem("taxes", JSON.stringify(response.data.taxcodes));
  return response.data.taxcodes;
};

const addTax = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/taxes/store`, formData, config);

  //return response.data.products;
};

const taxService = {
  getTaxes,
  addTax,
};

export default taxService;
