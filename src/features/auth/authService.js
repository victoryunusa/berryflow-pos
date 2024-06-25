import axios from "axios";
//import { history } from "../../utils/helpers";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;
const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

// RESGITER USER
const register = async (userData) => {
  const response = await axios.post(
    `${BaseUrl}/auth/register`,
    userData,
    headers
  );
  return response.data;
};

// RESGITER BUSINESS
const registerBusiness = async (corporateData) => {
  const response = await axios.post(
    `${BaseUrl}/registernewcorporateclient`,
    corporateData
  );
  return response.data;
};

const selectBranch = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };
  //axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const response = await axios.post(
    `${BaseUrl}/user/update_profile_branch`,
    formData,
    config
  );

  console.log(formData);

  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};

//Login User
const login = async (userData) => {
  const response = await axios.post(`${BaseUrl}/auth/login`, userData, headers);
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data.token;
};

const verify = async (userData) => {
  const response = await axios.post(
    `${BaseUrl}/auth/verify`,
    userData,
    headers
  );
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data.token;
};

const accountActivate = async (userData) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
  };
  console.log({ userData, headers });
  const response = await axios.post(
    `${BaseUrl}/auth/activate`,
    userData,
    headers
  );
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data.token;
};

//Logout user
const logout = async ({ token }) => {
  console.log(token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  await axios.post(`${BaseUrl}/auth/logout`);

  localStorage.clear();
};

const authService = {
  register,
  registerBusiness,
  login,
  logout,
  verify,
  accountActivate,
  selectBranch,
};

export default authService;
