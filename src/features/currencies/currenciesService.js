import axios from "axios";
//import { history } from "../../utils/helpers";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;
const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

// GET Countries
const getCurrencies = async () => {
  const response = await axios.get(`${BaseUrl}/currencies/list`, headers);
  localStorage.setItem("currencies", JSON.stringify(response.data.currencies));
  return response.data.currencies;
};

const CurrenciesService = {
  getCurrencies,
};

export default CurrenciesService;
