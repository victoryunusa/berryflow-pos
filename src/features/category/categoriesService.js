import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getCategories = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const page = formData ? formData : "";

  const response = await axios.get(
    `${BaseUrl}/categories/list?page=${page}`,
    config
  );

  //console.log(response.data);

  return response.data.categories;
};

const addCategory = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/categories/store`, formData, config);

  //return response.data.products;
};

const updateCategory = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  //await axios.post(`${BaseUrl}/categories/store`, formData, config);

  //return response.data.products;
};

const categoriesService = {
  getCategories,
  addCategory,
  updateCategory,
};

export default categoriesService;
