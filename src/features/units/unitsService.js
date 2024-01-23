import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getMeasurementUnits = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/units/list`, config);

  //console.log(response.data);

  return response.data.measurement_units;
};

const addMeasurementUnit = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/units/store`, formData, config);

  //return response.data.products;
};

const unitsService = {
  addMeasurementUnit,
  getMeasurementUnits,
};

export default unitsService;
