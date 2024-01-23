import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getSuppliers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/suppliers/list`, config);

  //console.log(response.data);

  return response.data.suppliers;
};

const addSupplier = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/suppliers/store`, formData, config);

  //return response.data.products;
};

const suppliersService = {
  getSuppliers,
  addSupplier,
};

export default suppliersService;
