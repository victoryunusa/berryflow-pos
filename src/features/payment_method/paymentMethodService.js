import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get payment methods from api
const getPaymentMethods = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/payment-methods`, config);

  //console.log(response.data);

  return response.data.paymentmethods;
};

const updatePaymentMethod = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  console.log(formData.formValue);

  await axios.put(
    `${BaseUrl}/payment-methods/${formData.methodType}`,
    formData.formValue,
    config
  );

  //return response.data.products;
};

const paymentMethodService = {
  updatePaymentMethod,
  getPaymentMethods,
};

export default paymentMethodService;
