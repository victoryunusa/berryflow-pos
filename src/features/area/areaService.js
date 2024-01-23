import axios from "axios";
//import { history } from "../../utils/helpers";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;
// const headers = {
//   "Content-Type": "application/json; charset=utf-8",
// };

// GET Countries
const getAreas = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  const response = await axios.get(`${BaseUrl}/areas/list`, config);
  localStorage.setItem("areas", JSON.stringify(response.data.areas));
  return response.data.areas;
};

const addArea = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/areas/store`, formData, config);

  //return response.data.products;
};

const areaService = {
  getAreas,
  addArea,
};

export default areaService;
