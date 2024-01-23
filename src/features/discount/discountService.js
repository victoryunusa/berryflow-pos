import axios from "axios";
//import { history } from "../../utils/helpers";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;
// const headers = {
//   "Content-Type": "application/json; charset=utf-8",
// };

// GET Countries
const getDiscountCodes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const response = await axios.get(`${BaseUrl}/discounts/list`, config);
  localStorage.setItem("discounts", JSON.stringify(response.data.codes));
  return response.data.codes;
};

const addDiscountCode = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/discounts/store`, formData, config);

  //return response.data.products;
};

const discountService = {
  getDiscountCodes,
  addDiscountCode,
};

export default discountService;
