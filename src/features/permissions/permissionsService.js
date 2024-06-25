import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getPermissions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/role/permissions/list`, config);

  //console.log(response.data);

  return response.data.roles;
};

const addPermissions = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/role/store`, formData, config);

  //return response.data.products;
};

const permissionsService = {
  addPermissions,
  getPermissions,
};

export default permissionsService;
