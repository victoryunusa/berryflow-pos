import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

// GET Accounts
const getAccounts = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const page = formData ? formData : "";

  const response = await axios.get(`${BaseUrl}/accounts/list${page}`, config);
  //   localStorage.setItem("accounts", JSON.stringify(response.data.accounts));
  return response.data.accounts;
};

//Add Account
const addAccount = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/accounts/store`, formData, config);

  //return response.data.products;
};

const accountService = {
  getAccounts,
  addAccount,
};

export default accountService;
