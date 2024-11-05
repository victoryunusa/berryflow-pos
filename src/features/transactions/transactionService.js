import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

// GET Transactions
const getTransactions = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const page = formData ? formData : "";

  const response = await axios.get(
    `${BaseUrl}/transactions/list${page}`,
    config
  );
  //   localStorage.setItem("accounts", JSON.stringify(response.data.accounts));
  return response.data.transactions;
};

//Add Transaction
const addTransaction = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/transactions/store`, formData, config);

  //return response.data.products;
};

const editTransaction = async ({ token, formData }) => {
  console.log(formData);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  //await axios.post(`${BaseUrl}/transactions/store`, formData, config);

  //return response.data.products;
};

const transactionService = {
  getTransactions,
  addTransaction,
  editTransaction,
};

export default transactionService;
