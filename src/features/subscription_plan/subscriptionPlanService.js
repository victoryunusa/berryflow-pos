import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get payment methods from api
const getSubscriptionPlans = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { period, currency } = formData;

  const queryParams = [];

  if (currency) {
    queryParams.push(`currency=${encodeURIComponent(currency)}`);
  }

  if (period) {
    queryParams.push(`period=${encodeURIComponent(period)}`);
  }

  const queryString = queryParams.length ? `?${queryParams.join("&")}` : "";

  console.log(queryString);

  const response = await axios.get(`${BaseUrl}/packages${queryString}`, config);

  //console.log(response.data);

  return response.data.packages;
};

const subscriptionPlanService = {
  getSubscriptionPlans,
};

export default subscriptionPlanService;
