import axios from "axios";
//import { history } from "../../utils/helpers";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;
const headers = {
  "Content-Type": "application/json; charset=utf-8",
};

// GET Countries
const getStates = async () => {
  const response = await axios.get(`${BaseUrl}/countries/states`, headers);
  localStorage.setItem("states", JSON.stringify(response.data.states));
  return response.data.states;
};

const statesService = {
  getStates,
};

export default statesService;
