import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get payment methods from api
const getSubscriptionPlans = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${BaseUrl}/admin/subscription_plans/list/`,
    config
  );

  //console.log(response.data);

  return response.data.subscription_plans;
};

const subscriptionPlanService = {
  getSubscriptionPlans,
};

export default subscriptionPlanService;
