import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getVariantOptions = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const page = formData ? formData : "";

  const response = await axios.get(
    `${BaseUrl}/variant_options/list${page}`,
    config
  );

  //console.log(response.data);

  return response.data.variant_options;
};

const addVariantOption = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/variant_options/store`, formData, config);

  //return response.data.products;
};

const variantOptionService = {
  getVariantOptions,
  addVariantOption,
};

export default variantOptionService;
