import axios from "axios";
//import { history } from "../../utils/helpers";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;
const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

// GET Countries
const getCountries = async () => {
  const response = await axios.get(`${BaseUrl}/countries/list`, headers);
  localStorage.setItem("countries", JSON.stringify(response.data.countries));
  return response.data.countries;
};

const countriesService = {
  getCountries,
};

export default countriesService;
