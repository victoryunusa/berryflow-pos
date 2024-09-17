import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get payment methods from api
const getPaymentGateways = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/gateways/list`, config);

  //console.log(response.data);

  return response.data.gateways;
};

const paymentGatewayService = {
  getPaymentGateways,
};

export default paymentGatewayService;
