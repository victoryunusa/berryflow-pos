import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getBusinessRegisters = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const page = formData ? formData : "";

  const response = await axios.get(
    `${BaseUrl}/business_registers/list${page}`,
    config
  );

  //console.log(response.data);

  return response.data.business_registers;
};

const getBillingCounterStats = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${BaseUrl}/business_registers/get_billing_counter_stats`,
    config
  );

  //console.log(response.data);

  return response.data.bill_counters_data;
};

const businessRegisterService = {
  getBillingCounterStats,
  getBusinessRegisters,
};

export default businessRegisterService;
