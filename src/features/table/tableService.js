import axios from "axios";
//import { history } from "../../utils/helpers";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;
// const headers = {
//   "Content-Type": "application/json; charset=utf-8",
// };

// GET Countries
const getTables = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const response = await axios.get(`${BaseUrl}/tables/list`, config);
  localStorage.setItem("tables", JSON.stringify(response.data.tables));
  return response.data.tables;
};

const addTable = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/tables/store`, formData, config);

  //return response.data.products;
};

const tableService = {
  getTables,
  addTable,
};

export default tableService;
