import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getProfile = async ({ token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/user/profile`, config);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data.user;
};

const updateProfile = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(
    `${BaseUrl}/updateindividualclientaccountinfo`,
    formData,
    config
  );

  //return response.data.products;
};

const userService = {
  getProfile,
  updateProfile,
};

export default userService;
