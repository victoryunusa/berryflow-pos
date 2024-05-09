import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getIngredients = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/ingredients/list`, config);

  //console.log(response.data);

  return response.data.ingredients;
};

const addIngredient = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  console.log(formData);

  await axios.post(`${BaseUrl}/ingredients/store`, formData, config);

  //return response.data.products;
};

const ingredientsService = {
  addIngredient,
  getIngredients,
};

export default ingredientsService;
