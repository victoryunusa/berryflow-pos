import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getKyb = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/kyb/status`, config);

  //console.log(response.data);

  return response.data.ingredients;
};

const addKyb = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  await axios.post(`${BaseUrl}/kyb/store`, formData, config);

  //return response.data.products;
};

const kybService = {
  getKyb,
  addKyb,
};

export default kybService;
