import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_API_URL;

// GET Addon Groups
const getAddonGroups = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  const page = formData ? formData : "";

  const response = await axios.get(
    `${BaseUrl}/addon_groups/list${page}`,
    config
  );
  //   localStorage.setItem("accounts", JSON.stringify(response.data.accounts));
  return response.data;
};

//Add Addon Groups
const addAddonGroup = async ({ token, formData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json; charset=utf-8",
    },
  };

  console.log(token);

  const response = await axios.post(
    `${BaseUrl}/addon_groups/store`,
    formData,
    config
  );

  console.log(response.data);

  return response.data;
};

const addonGroupService = {
  getAddonGroups,
  addAddonGroup,
};

export default addonGroupService;
