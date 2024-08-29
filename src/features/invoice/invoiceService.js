import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

// GET Invoices
const getInvoices = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const page = formData ? formData : "";

  const response = await axios.get(`${BaseUrl}/invoices/list${page}`, config);
  //   localStorage.setItem("accounts", JSON.stringify(response.data.accounts));
  return response.data.invoices;
};

//Add Invoice
const addInvoice = async ({ token, formData }) => {
  console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/invoices/store`, formData, config);

  //return response.data.products;
};

const invoiceService = {
  getInvoices,
  addInvoice,
};

export default invoiceService;
