import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

//Get products from api
const getBranches = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${BaseUrl}/branches/list`, config);

  //console.log(response.data);

  return response.data.branches;
};

const addBranch = async ({ token, formData }) => {
  //console.log(token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  await axios.post(`${BaseUrl}/branches/store`, formData, config);

  //return response.data.products;
};

const branchService = {
  getBranches,
  addBranch,
};

export default branchService;
