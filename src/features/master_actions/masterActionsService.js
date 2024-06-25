import axios from "axios";
//import { history } from "../../utils/helpers";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;
const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

// GET Countries
const getBillingTypes = async () => {
  const response = await axios.get(`${BaseUrl}/master/billing_types`, headers);
  localStorage.setItem(
    "billing_types",
    JSON.stringify(response.data.billing_types)
  );
  return response.data.billing_types;
};

const getInvoicePrintTypes = async () => {
  const response = await axios.get(
    `${BaseUrl}/master/invoice_print_types`,
    headers
  );
  localStorage.setItem(
    "invoice_print_types",
    JSON.stringify(response.data.invoice_print_types)
  );
  return response.data.invoice_print_types;
};

const getModules = async () => {
  const response = await axios.get(`${BaseUrl}/master/get_modules`, headers);
  localStorage.setItem("modules", JSON.stringify(response.data.modules));
  return response.data.modules;
};

const masterActionsService = {
  getBillingTypes,
  getInvoicePrintTypes,
  getModules,
};

export default masterActionsService;
