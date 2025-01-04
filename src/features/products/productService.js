import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getProducts = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(formData);

  const query = new URLSearchParams({
    page: formData.page || 1,
    product_filter: formData.productFilter || "default_filter",
  }).toString();

  console.log(query);

  //const page = formData ? formData : "";

  const response = await axios.get(`${BaseUrl}/products/list?${query}`, config);

  return response.data.products;
};

const getSingleProduct = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //console.log({ token, formData });

  const response = await axios.get(`${BaseUrl}/products/${formData}`, config);

  return response.data.product;
};

const addProduct = async ({ token, formData }) => {
  console.log(formData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  await axios.post(`${BaseUrl}/products/save`, formData, config);

  //return response.data.products;
};

const addProductVariant = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/variants/store`, formData, config);

  //return response.data.products;
};

const addProductExtra = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/extras/store`, formData, config);

  //return response.data.products;
};

const productService = {
  addProduct,
  getProducts,
  getSingleProduct,
  addProductVariant,
  addProductExtra,
};

export default productService;
