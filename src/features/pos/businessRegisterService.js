import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getRegister = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${BaseUrl}/business_registers/active`,
    config
  );

  localStorage.setItem("activeRegister", JSON.stringify(response.data.slug));

  return response.data;
};

const openRegister = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const response = await axios.post(
    `${BaseUrl}/business_registers/open`,
    formData,
    config
  );
  //localStorage.setItem("activeRegister", JSON.stringify(response.data));
  return response.data;
};

const closeRegister = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const response = await axios.post(
    `${BaseUrl}/business_registers/close`,
    formData,
    config
  );

  return response.data;
};

const businessRegisterService = {
  openRegister,
  closeRegister,
  getRegister,
};

export default businessRegisterService;
