import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

// GET Menus
const getMenus = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const response = await axios.get(`${BaseUrl}/menus/list`, config);

  return response.data;
};

const addMenu = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/menus/store`, formData, config);
};

const menuService = {
  getMenus,
  addMenu,
};

export default menuService;
